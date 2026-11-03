-- =====================================================================
-- BloodBond Bangladesh: Supabase Scheduled Jobs (pg_cron)
-- Daily evaluation of donor cooldown intervals at 00:00 UTC
-- =====================================================================

-- Enable pg_cron extension if supported
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily midnight check to release donors who completed their 90-day cooldown
SELECT cron.schedule(
    'daily-donor-eligibility-evaluation',
    '0 0 * * *',
    $$
    UPDATE donors
    SET 
        is_available = TRUE,
        updated_at = NOW()
    WHERE 
        next_eligible_date <= CURRENT_DATE
        AND is_available = FALSE
        AND manual_unavailable = FALSE;
    $$
);

-- Schedule hourly check to expire outdated emergency requests
SELECT cron.schedule(
    'expire-blood-requests-job',
    '0 * * * *',
    $$
    UPDATE blood_requests
    SET 
        status = 'expired',
        updated_at = NOW()
    WHERE 
        expires_at < NOW()
        AND status IN ('pending', 'searching');
    $$
);

