-- Aliniază schema live a statusurilor de rezervare cu aplicația curentă.
-- 1. Normalizează valorile existente din engleză în română.
-- 2. Repară default-ul coloanei status.
-- 3. Înlocuiește check constraint-ul cu valorile folosite de UI/admin.

UPDATE rezervari
SET status = CASE status
  WHEN 'pending' THEN 'în așteptare'
  WHEN 'confirmed' THEN 'confirmat'
  WHEN 'cancelled' THEN 'respins'
  ELSE status
END;

ALTER TABLE rezervari
ALTER COLUMN status SET DEFAULT 'în așteptare';

ALTER TABLE rezervari
DROP CONSTRAINT IF EXISTS rezervari_status_check;

ALTER TABLE rezervari
ADD CONSTRAINT rezervari_status_check
CHECK (status IN ('în așteptare', 'confirmat', 'respins'));
