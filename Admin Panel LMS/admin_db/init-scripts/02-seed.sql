-- Seed roles
INSERT INTO roles (name, description) VALUES
  ('superadmin', 'Akses penuh ke seluruh sistem'),
  ('admin',      'Kelola kursus, soal, dan user'),
  ('instructor', 'Upload materi dan monitoring nilai'),
  ('student',    'Akses kursus dan ujian')
ON CONFLICT (name) DO NOTHING;

-- Seed permissions superadmin
INSERT INTO permissions (role_id, resource, action) VALUES
  (1, 'course',    'create'),
  (1, 'course',    'update'),
  (1, 'course',    'delete'),
  (1, 'exam',      'create'),
  (1, 'exam',      'update'),
  (1, 'exam',      'delete'),
  (1, 'user',      'manage'),
  (1, 'analytics', 'view'),
  (1, 'material',  'upload'),
  (1, 'grade',     'monitor'),
  (1, 'role',      'manage'),
-- Seed permissions admin
  (2, 'course',    'create'),
  (2, 'course',    'update'),
  (2, 'course',    'delete'),
  (2, 'exam',      'create'),
  (2, 'exam',      'update'),
  (2, 'user',      'manage'),
  (2, 'analytics', 'view'),
  (2, 'material',  'upload'),
  (2, 'grade',     'monitor'),
-- Seed permissions instructor
  (3, 'material',  'upload'),
  (3, 'grade',     'monitor'),
  (3, 'analytics', 'view')
ON CONFLICT (role_id, resource, action) DO NOTHING;

-- Seed users (password: Password123!)
INSERT INTO users (name, email, password, role_id) VALUES
  ('Super Admin',
   'superadmin@elearning.com',
   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh8y',
   1),
  ('Admin Utama',
   'admin@elearning.com',
   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh8y',
   2),
  ('Budi Instruktur',
   'budi@elearning.com',
   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh8y',
   3),
  ('Siti Student',
   'siti@elearning.com',
   '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lh8y',
   4)
ON CONFLICT (email) DO NOTHING;

-- Seed admins
INSERT INTO admins (user_id, level) VALUES
  (1, 'superadmin'),
  (2, 'admin')
ON CONFLICT (user_id) DO NOTHING;