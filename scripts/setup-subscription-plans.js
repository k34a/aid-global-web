const { createClient } = require('@supabase/supabase-js');
const Razorpay = require('razorpay');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function setupSubscriptionPlans() {
  try {
    console.log('Setting up subscription plans...');

    // Create Razorpay plan for 100 rupee monthly subscription
    const razorpayPlan = await razorpay.plans.create({
      period: "monthly",
      interval: 1,
      item: {
        name: "100 Rupee Monthly Plan",
        description: "Monthly subscription for ₹100",
        amount: 10000, // Amount in paise (₹100)
        currency: "INR",
      },
    });

    console.log('Created Razorpay plan:', razorpayPlan.id);

    // Check if plan already exists in database
    const { data: existingPlan } = await supabase
      .from("subscription_plans")
      .select("id")
      .eq("name", "100 Rupee Monthly Plan")
      .maybeSingle();

    if (existingPlan) {
      // Update existing plan with Razorpay plan ID
      const { error: updateError } = await supabase
        .from("subscription_plans")
        .update({
          razorpay_plan_id: razorpayPlan.id,
        })
        .eq("id", existingPlan.id);

      if (updateError) {
        console.error("Error updating subscription plan:", updateError);
        return;
      }

      console.log('Updated existing subscription plan:', existingPlan.id);
    } else {
      // Create new plan in database
      const { data: newPlan, error: createError } = await supabase
        .from("subscription_plans")
        .insert({
          name: "100 Rupee Monthly Plan",
          description: "Monthly subscription for ₹100",
          amount: 100,
          currency: "INR",
          interval: "monthly",
          razorpay_plan_id: razorpayPlan.id,
          total_count: 0, // 0 means unlimited
        })
        .select("id")
        .single();

      if (createError) {
        console.error("Error creating subscription plan:", createError);
        return;
      }

      console.log('Created new subscription plan:', newPlan.id);
    }

    console.log('Subscription plans setup completed successfully!');
  } catch (error) {
    console.error('Error setting up subscription plans:', error);
  }
}

// Run the setup
setupSubscriptionPlans(); 