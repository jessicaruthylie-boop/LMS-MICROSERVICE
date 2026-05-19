-- Tabel roles (dibuat PERTAMA karena yang lain bergantung padanya)
CREATE TABLE IF NOT EXISTS roles (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel permissions
CREATE TABLE IF NOT EXISTS permissions (
  id          SERIAL PRIMARY KEY,
  role_id     INTEGER NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  resource    VARCHAR(100) NOT NULL,
  action      VARCHAR(50) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(role_id, resource, action)
);

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) UNIQUE NOT NULL,
  password    VARCHAR(255) NOT NULL,
  role_id     INTEGER NOT NULL REFERENCES roles(id) DEFAULT 4,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email   ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role_id ON users(role_id);

-- Tabel admins
CREATE TABLE IF NOT EXISTS admins (
  id                   SERIAL PRIMARY KEY,
  user_id              INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level                VARCHAR(20) DEFAULT 'admin'
                         CHECK (level IN ('superadmin','admin','moderator')),
  permissions_override TEXT,
  last_login           TIMESTAMP,
  created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- View: dashboard admin
CREATE OR REPLACE VIEW v_admin_dashboard AS
SELECT
  a.id       AS admin_id,
  u.name,
  u.email,
  r.name     AS role,
  a.level,
  u.is_active,
  a.last_login,
  u.created_at
FROM admins a
JOIN users u ON u.id = a.user_id
JOIN roles r ON r.id = u.role_id
WHERE u.is_active = true;

-- View: permission per role
CREATE OR REPLACE VIEW v_role_permissions AS
SELECT
  r.name     AS role,
  p.resource,
  p.action
FROM permissions p
JOIN roles r ON r.id = p.role_id
ORDER BY r.id, p.resource, p.action;

-- Fungsi: update last login
CREATE OR REPLACE FUNCTION update_admin_last_login(p_user_id INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE admins SET last_login = CURRENT_TIMESTAMP
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger: auto update updated_at di tabel users
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();