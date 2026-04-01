-- Activează Row Level Security pe toate tabelele publice

-- =====================
-- rezervari
-- =====================
ALTER TABLE rezervari ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Insert public" ON rezervari;
DROP POLICY IF EXISTS "Select authenticated only" ON rezervari;
DROP POLICY IF EXISTS "Update authenticated only" ON rezervari;
DROP POLICY IF EXISTS "Delete authenticated only" ON rezervari;

CREATE POLICY "Insert public"
  ON rezervari FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Select authenticated only"
  ON rezervari FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Update authenticated only"
  ON rezervari FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Delete authenticated only"
  ON rezervari FOR DELETE TO authenticated
  USING (true);

-- =====================
-- menu_items
-- =====================
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Select public menu" ON menu_items;
DROP POLICY IF EXISTS "Write authenticated only" ON menu_items;

CREATE POLICY "Select public menu"
  ON menu_items FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Insert authenticated only"
  ON menu_items FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Update authenticated only"
  ON menu_items FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Delete authenticated only"
  ON menu_items FOR DELETE TO authenticated
  USING (true);

-- =====================
-- newsletter_subscribers
-- =====================
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Insert public newsletter" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Select authenticated only newsletter" ON newsletter_subscribers;

CREATE POLICY "Insert public newsletter"
  ON newsletter_subscribers FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Select authenticated only newsletter"
  ON newsletter_subscribers FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Delete authenticated only newsletter"
  ON newsletter_subscribers FOR DELETE TO authenticated
  USING (true);

-- =====================
-- holiday_config
-- =====================
ALTER TABLE holiday_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Select public holiday" ON holiday_config;
DROP POLICY IF EXISTS "Write authenticated holiday" ON holiday_config;

CREATE POLICY "Select public holiday"
  ON holiday_config FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Insert authenticated holiday"
  ON holiday_config FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Update authenticated holiday"
  ON holiday_config FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Delete authenticated holiday"
  ON holiday_config FOR DELETE TO authenticated
  USING (true);

-- =====================
-- promo_config
-- =====================
ALTER TABLE promo_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Select public promo" ON promo_config;
DROP POLICY IF EXISTS "Write authenticated promo" ON promo_config;

CREATE POLICY "Select public promo"
  ON promo_config FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "Insert authenticated promo"
  ON promo_config FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Update authenticated promo"
  ON promo_config FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Delete authenticated promo"
  ON promo_config FOR DELETE TO authenticated
  USING (true);
