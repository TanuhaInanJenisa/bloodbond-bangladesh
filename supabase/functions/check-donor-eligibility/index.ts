// BloodBond Bangladesh: Supabase Edge Function
// Automated 90-Day Donor Eligibility & Availability Cooldown Engine

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const todayStr = new Date().toISOString().split("T")[0];

    // Find donors whose next_eligible_date has arrived and are currently marked unavailable due to cooldown
    const { data: eligibleDonors, error: fetchError } = await supabaseClient
      .from("donors")
      .select("id, profile_id, next_eligible_date")
      .lte("next_eligible_date", todayStr)
      .eq("is_available", false)
      .eq("manual_unavailable", false);

    if (fetchError) throw fetchError;

    let updatedCount = 0;
    if (eligibleDonors && eligibleDonors.length > 0) {
      for (const donor of eligibleDonors) {
        // Automatically set available
        await supabaseClient
          .from("donors")
          .update({ is_available: true, updated_at: new Date().toISOString() })
          .eq("id", donor.id);

        // Send eligibility reminder notification
        await supabaseClient.from("notifications").insert({
          profile_id: donor.profile_id,
          title: "রক্তদানের জন্য প্রস্তুত (Ready to Donate)",
          message:
            "আপনার পূর্ববর্তী রক্তদানের ৯০ দিনের স্বাস্থ্য বিরতি সম্পন্ন হয়েছে। আপনি এখন পুনরায় যেকোনো জরুরি রোগীর জীবন বাঁচাতে প্রস্তুত।",
          type: "eligibility",
          link: "/dashboard",
        });

        updatedCount++;
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        eligibleDonorsProcessed: updatedCount,
        checkedAt: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

