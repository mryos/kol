-- Enable RLS on all tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_submissions ENABLE ROW LEVEL SECURITY;

-- 1. COMPANIES: Users only see their own company
CREATE POLICY company_isolation ON companies
    FOR ALL
    USING (id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- 2. USERS: Only see colleagues
CREATE POLICY user_isolation ON users
    FOR SELECT
    USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- 3. CAMPAIGNS: Tenant isolation
CREATE POLICY campaign_isolation ON campaigns
    FOR ALL
    USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- 4. INFLUENCERS: Tenant isolation
CREATE POLICY influencer_isolation ON influencers
    FOR ALL
    USING (company_id IN (SELECT company_id FROM users WHERE id = auth.uid()));

-- 5. CAMPAIGN_INFLUENCERS: Tenant isolation
CREATE POLICY campaign_influencer_isolation ON campaign_influencers
    FOR ALL
    USING (campaign_id IN (SELECT id FROM campaigns)); -- campaigns already has tenant isolation

-- 6. CONVERSIONS: Tenant isolation
CREATE POLICY conversion_isolation ON conversions
    FOR ALL
    USING (campaign_id IN (SELECT id FROM campaigns));

-- 7. APPROVALS: Tenant isolation
CREATE POLICY approval_isolation ON approvals
    FOR ALL
    USING (campaign_id IN (SELECT id FROM campaigns));

-- 8. CONTENT_SUBMISSIONS: Tenant isolation
CREATE POLICY content_submission_isolation ON content_submissions
    FOR ALL
    USING (campaign_id IN (SELECT id FROM campaigns));

-- ROLE-BASED ACCESS (Simple implementation)
-- Viewers: Read-only
CREATE POLICY viewer_readonly ON campaigns
    FOR INSERT OR UPDATE OR DELETE
    USING (FALSE)
    WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role != 'VIEWER'));

-- Finance: Budget/Payment access
-- (Further refined policies can be added based on specific logic)

-- Super Admin: Bypass all (Supabase default roles usually handle this if configured)
