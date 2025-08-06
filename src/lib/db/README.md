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
    status,
    pan_number,
    address
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
    donation_data->>'status',
    nullif(donation_data->>'pan_number', ''),
    nullif(donation_data->>'address', '')
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
