## Postgres functions

### Record the intent of Donation by the user

```
create or replace function record_donation_intent(
  donation_data json,
  products json
)
returns uuid
language plpgsql
as $$
declare
  new_backer_id uuid;
  prod_key text;
  prod_qty integer;
begin
  insert into backers (
    campaign_id,
    amount,
    email,
    contact_number,
    name,
    is_anon,
    auto_allocate,
    notes,
    unallocated_amount,
    status
  )
  values (
    (donation_data->>'campaign_id')::uuid,
    (donation_data->>'amount')::numeric,
    donation_data->>'email',
    donation_data->>'contact_number',
    donation_data->>'name',
    (donation_data->>'is_anon')::boolean,
    (donation_data->>'auto_allocate')::boolean,
    donation_data->>'notes',
    (donation_data->>'unallocated_amount')::numeric,
    donation_data->>'status'
  )
  returning id into new_backer_id;

  if json_typeof(products) = 'object' then
    for prod_key in select * from json_object_keys(products)
    loop
      prod_qty := (products->>prod_key)::integer;

      insert into donated_products (
        backer_id,
        product_id,
        quantity
      ) values (
        new_backer_id,
        prod_key::uuid,
        prod_qty
      );
    end loop;
  end if;

  return new_backer_id;
end;
$$;
```

### Mark the donation as completed and update campaign collection details

```
create or replace function collect_donation_payment(
  p_backer_id uuid,
  p_order_id text,
  p_payment_id text
)
returns boolean
language plpgsql
as $$
declare
  r_backer record;
  r_product record;
begin
  -- Update backer with order and payment info
  update backers
  set
    order_id = p_order_id,
    payment_id = p_payment_id,
    status = 'Completed'
  where id = p_backer_id;

  -- Ensure backer exists
  select * into r_backer from backers where id = p_backer_id;
  if not found then
    return false;
  end if;

  -- Update campaign stats
  update campaigns
  set
    collection = collection + r_backer.amount,
    backers = backers + 1,
    unallocated_amount = unallocated_amount + r_backer.unallocated_amount
  where id = r_backer.campaign_id;

  -- Update units_collected for each product
  for r_product in
    select product_id, quantity from donated_products where backer_id = p_backer_id
  loop
    update campaign_products
    set units_collected = units_collected + r_product.quantity
    where product_id = r_product.product_id
      and campaign_id = r_backer.campaign_id;
  end loop;

  return true;
exception
  when others then
    return false;
end;
$$;
```

## Get the number of rows in a table

```
CREATE OR REPLACE FUNCTION get_table_row_count(
    arg_schema_name TEXT,
    arg_table_name TEXT
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    row_count BIGINT;
    query_text TEXT;
BEGIN
    -- Build the dynamic query with proper quoting
    query_text := format('SELECT COUNT(*) FROM %I.%I', arg_schema_name, arg_table_name);

    -- Execute the query and get the result
    EXECUTE query_text INTO row_count;

    RETURN row_count;
END;
$$;
```


## Create a new Campaign with Products
```create or replace function create_campaign_with_products(
  campaign_slug text,
  title text,
  description text,
  goal_amount numeric,
  image_url text,
  ended_at timestamptz,
  products jsonb
)
returns uuid
language plpgsql
as $$
declare
  new_campaign_id uuid;
  product jsonb;
begin
  insert into campaigns (
    slug,
    title,
    description,
    amount,
    banner_image,
    ended_at,
    collection,
    backers,
    unallocated_amount
  )
  values (
    campaign_slug,
    title,
    description,
    goal_amount,
    image_url,
    ended_at,
    0,
    0,
    0
  )
  returning id into new_campaign_id;

  for product in select * from jsonb_array_elements(products)
  loop
    insert into campaign_products (
      campaign_id,
      title,
      description,
      price_per_unit,
      units_required,
      units_collected,
      image
    )
    values (
      new_campaign_id,
      product->>'title',
      product->>'description',
      (product->>'price_per_unit')::numeric,
      (product->>'units_required')::int,
      0,
      product->>'image'
    );
  end loop;

  return new_campaign_id;

exception
  when others then
    raise exception 'Campaign creation failed: %', sqlerrm;
end;
$$;
```


## Update an Existing Campaign and Upsert its Products
```
create or replace function update_campaign_with_products(
  p_slug text,
  p_title text,
  p_description text,
  p_amount numeric,
  p_ended_at timestamptz,
  p_banner_image text,
  p_products jsonb
)
returns void
language plpgsql
as $$
declare
  v_campaign_id uuid;
  v_product jsonb;
  incoming_ids uuid[];
  existing_ids uuid[];
begin
  -- Fetch campaign ID using slug
  select id into v_campaign_id from campaigns where slug = p_slug;
  if v_campaign_id is null then
    raise exception 'Campaign with slug % not found', p_slug;
  end if;

  -- Update basic campaign information
  update campaigns
  set
    title = p_title,
    description = p_description,
    amount = p_amount,
    ended_at = p_ended_at,
    banner_image = p_banner_image
  where id = v_campaign_id;

  -- Get all existing product IDs
  select array_agg(id) into existing_ids
  from campaign_products
  where campaign_id = v_campaign_id;

  -- Extract product IDs from incoming list
  select array_agg((p->>'id')::uuid) into incoming_ids
  from jsonb_array_elements(p_products) p
  where p ? 'id';

  -- Delete products that exist in DB but not in incoming list
  if existing_ids is not null then
    delete from campaign_products
    where campaign_id = v_campaign_id
      and id = any(existing_ids)
      and (incoming_ids is null or not id = any(incoming_ids));
  end if;

  -- Insert or update each incoming product
  for v_product in select * from jsonb_array_elements(p_products)
  loop
    insert into campaign_products (
      id,
      campaign_id,
      title,
      description,
      price_per_unit,
      units_required,
      image
    )
    values (
      coalesce((v_product->>'id')::uuid, gen_random_uuid()),
      v_campaign_id,
      v_product->>'title',
      v_product->>'description',
      (v_product->>'price_per_unit')::numeric,
      (v_product->>'units_required')::int,
      v_product->>'image'
    )
    on conflict (id) do update set
      title = excluded.title,
      description = excluded.description,
      price_per_unit = excluded.price_per_unit,
      units_required = excluded.units_required,
      image = excluded.image;
  end loop;
end;
$$;
```
