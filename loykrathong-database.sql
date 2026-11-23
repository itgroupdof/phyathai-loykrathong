-- SQLite template for local analysis; the production website writes to Google Sheets.
CREATE TABLE IF NOT EXISTS wishes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recorded_at TEXT NOT NULL,
  contributor_name TEXT NOT NULL,
  wish TEXT NOT NULL,
  location_code TEXT,
  location_name TEXT,
  krathong_type TEXT,
  real_krathong_baseline TEXT,
  avoided_waste_kg REAL,
  avoided_co2e_kg REAL,
  year TEXT,
  source TEXT
);
