# LMS Database Schema

Skema database untuk menyimpan progress belajar aplikasi Learning Management System (LMS) dengan Role-Based Access Control (RBAC).

---

## Daftar Tabel

## z

## Struktur Tabel

### 1. USERS

Menyimpan semua pengguna sistem.

| Kolom        | Tipe      | Keterangan            |
| ------------ | --------- | --------------------- |
| `id`         | UUID      | Primary key           |
| `name`       | STRING    | Nama lengkap pengguna |
| `email`      | STRING    | Email unik pengguna   |
| `created_at` | TIMESTAMP | Waktu registrasi      |

---

### 2. ROLES

Mendefinisikan peran yang tersedia dalam sistem (misalnya `admin`, `student`, `instructor`).

| Kolom         | Tipe   | Keterangan        |
| ------------- | ------ | ----------------- |
| `id`          | UUID   | Primary key       |
| `name`        | STRING | Nama peran (unik) |
| `description` | STRING | Penjelasan peran  |

**Contoh data:**

| name         | description                          |
| ------------ | ------------------------------------ |
| `admin`      | Akses penuh ke seluruh sistem        |
| `instructor` | Dapat membuat dan mengelola kursus   |
| `student`    | Dapat mendaftar dan mengikuti kursus |

---

### 3. PERMISSIONS

Mendefinisikan izin granular berdasarkan resource dan action.

| Kolom      | Tipe   | Keterangan                                        |
| ---------- | ------ | ------------------------------------------------- |
| `id`       | UUID   | Primary key                                       |
| `name`     | STRING | Nama izin unik, format `resource.action`          |
| `resource` | STRING | Entitas yang diatur (misalnya `course`, `user`)   |
| `action`   | STRING | Aksi yang diizinkan (misalnya `create`, `delete`) |

**Contoh data:**

| name                | resource      | action    |
| ------------------- | ------------- | --------- |
| `course.create`     | `course`      | `create`  |
| `course.publish`    | `course`      | `publish` |
| `user.manage`       | `user`        | `manage`  |
| `quiz.grade`        | `quiz`        | `grade`   |
| `certificate.issue` | `certificate` | `issue`   |

---

### 4. USER_ROLES

Join table yang menghubungkan pengguna dengan peran mereka. Satu pengguna dapat memiliki lebih dari satu peran.

| Kolom         | Tipe      | Keterangan               |
| ------------- | --------- | ------------------------ |
| `id`          | UUID      | Primary key              |
| `user_id`     | UUID      | Foreign key → `USERS.id` |
| `role_id`     | UUID      | Foreign key → `ROLES.id` |
| `assigned_at` | TIMESTAMP | Waktu peran diberikan    |

---

### 5. ROLE_PERMISSIONS

Join table yang menghubungkan peran dengan izin yang dimilikinya.

| Kolom           | Tipe | Keterangan                     |
| --------------- | ---- | ------------------------------ |
| `id`            | UUID | Primary key                    |
| `role_id`       | UUID | Foreign key → `ROLES.id`       |
| `permission_id` | UUID | Foreign key → `PERMISSIONS.id` |

---

### 6. COURSES

Menyimpan data kursus yang tersedia di platform.

| Kolom           | Tipe      | Keterangan                                      |
| --------------- | --------- | ----------------------------------------------- |
| `id`            | UUID      | Primary key                                     |
| `title`         | STRING    | Judul kursus                                    |
| `description`   | STRING    | Deskripsi kursus                                |
| `instructor_id` | UUID      | Foreign key → `USERS.id`                        |
| `status`        | STRING    | Status kursus: `draft`, `published`, `archived` |
| `published_at`  | TIMESTAMP | Waktu kursus dipublikasikan                     |

---

### 7. ENROLLMENTS

Mencatat pendaftaran siswa ke sebuah kursus. Semua data progress diikat ke tabel ini.

| Kolom         | Tipe      | Keterangan                                                    |
| ------------- | --------- | ------------------------------------------------------------- |
| `id`          | UUID      | Primary key                                                   |
| `user_id`     | UUID      | Foreign key → `USERS.id`                                      |
| `course_id`   | UUID      | Foreign key → `COURSES.id`                                    |
| `enrolled_at` | TIMESTAMP | Waktu pendaftaran                                             |
| `status`      | STRING    | Status enrollment: `active`, `paused`, `completed`, `expired` |

---

### 8. MODULES

Modul adalah pengelompokan pelajaran di dalam sebuah kursus.

| Kolom         | Tipe   | Keterangan                 |
| ------------- | ------ | -------------------------- |
| `id`          | UUID   | Primary key                |
| `course_id`   | UUID   | Foreign key → `COURSES.id` |
| `title`       | STRING | Judul modul                |
| `order_index` | INT    | Urutan modul dalam kursus  |

---

### 9. LESSONS

Pelajaran adalah unit konten terkecil dalam sebuah modul.

| Kolom              | Tipe   | Keterangan                                             |
| ------------------ | ------ | ------------------------------------------------------ |
| `id`               | UUID   | Primary key                                            |
| `module_id`        | UUID   | Foreign key → `MODULES.id`                             |
| `title`            | STRING | Judul pelajaran                                        |
| `content_type`     | STRING | Jenis konten: `video`, `article`, `pdf`, `interactive` |
| `duration_seconds` | INT    | Durasi konten dalam detik                              |
| `order_index`      | INT    | Urutan pelajaran dalam modul                           |

---

### 10. COURSE_PROGRESS

Melacak progress keseluruhan seorang siswa dalam satu kursus. Satu record per enrollment.

| Kolom                | Tipe      | Keterangan                                            |
| -------------------- | --------- | ----------------------------------------------------- |
| `id`                 | UUID      | Primary key                                           |
| `enrollment_id`      | UUID      | Foreign key → `ENROLLMENTS.id`                        |
| `completion_percent` | FLOAT     | Persentase kursus yang telah diselesaikan (0.0–100.0) |
| `last_accessed_at`   | TIMESTAMP | Waktu terakhir siswa mengakses kursus                 |
| `completed_at`       | TIMESTAMP | Waktu kursus dinyatakan selesai (nullable)            |

---

### 11. LESSON_PROGRESS

Melacak progress siswa per pelajaran secara granular.

| Kolom            | Tipe      | Keterangan                                        |
| ---------------- | --------- | ------------------------------------------------- |
| `id`             | UUID      | Primary key                                       |
| `enrollment_id`  | UUID      | Foreign key → `ENROLLMENTS.id`                    |
| `lesson_id`      | UUID      | Foreign key → `LESSONS.id`                        |
| `status`         | STRING    | Status: `not_started`, `in_progress`, `completed` |
| `time_spent_sec` | INT       | Total waktu yang dihabiskan di pelajaran ini      |
| `watch_percent`  | INT       | Persentase video yang telah ditonton (0–100)      |
| `completed_at`   | TIMESTAMP | Waktu pelajaran diselesaikan (nullable)           |

---

### 12. QUIZZES

Kuis yang terikat pada sebuah pelajaran.

| Kolom           | Tipe   | Keterangan                        |
| --------------- | ------ | --------------------------------- |
| `id`            | UUID   | Primary key                       |
| `lesson_id`     | UUID   | Foreign key → `LESSONS.id`        |
| `title`         | STRING | Judul kuis                        |
| `passing_score` | INT    | Skor minimum untuk lulus          |
| `max_attempts`  | INT    | Maksimum percobaan yang diizinkan |

---

### 13. QUIZ_ATTEMPTS

Menyimpan setiap percobaan siswa mengerjakan kuis.

| Kolom            | Tipe      | Keterangan                     |
| ---------------- | --------- | ------------------------------ |
| `id`             | UUID      | Primary key                    |
| `quiz_id`        | UUID      | Foreign key → `QUIZZES.id`     |
| `enrollment_id`  | UUID      | Foreign key → `ENROLLMENTS.id` |
| `score`          | INT       | Skor yang diperoleh            |
| `attempt_number` | INT       | Urutan percobaan ke-n          |
| `passed`         | BOOLEAN   | Apakah percobaan ini lulus     |
| `taken_at`       | TIMESTAMP | Waktu kuis dikerjakan          |

---

### 14. CERTIFICATES

Sertifikat yang dikeluarkan otomatis saat siswa menyelesaikan kursus.

| Kolom            | Tipe      | Keterangan                     |
| ---------------- | --------- | ------------------------------ |
| `id`             | UUID      | Primary key                    |
| `enrollment_id`  | UUID      | Foreign key → `ENROLLMENTS.id` |
| `certificate_no` | STRING    | Nomor sertifikat unik          |
| `issued_at`      | TIMESTAMP | Waktu sertifikat diterbitkan   |

---

## Relasi Antar Tabel

```
USERS ──< USER_ROLES >── ROLES ──< ROLE_PERMISSIONS >── PERMISSIONS

USERS ──< ENROLLMENTS >── COURSES ──< MODULES ──< LESSONS
                │                                     │
                │                              LESSON_PROGRESS
                │                                     │
          COURSE_PROGRESS                          QUIZZES
                                                      │
                                              QUIZ_ATTEMPTS
                │
          CERTIFICATES
```

---

## Catatan Desain

- Semua primary key menggunakan **UUID** untuk mendukung sistem terdistribusi dan menghindari prediktabilitas ID.
- **Progress diikat ke `enrollment_id`**, bukan `user_id` langsung — lebih fleksibel untuk skenario re-enrollment dan audit log.
- **RBAC** diimplementasikan via tiga tabel (`ROLES`, `PERMISSIONS`, `USER_ROLES`, `ROLE_PERMISSIONS`). Untuk mengecek izin seorang user: `USERS → USER_ROLES → ROLE_PERMISSIONS → PERMISSIONS`.
- Field `status` pada `ENROLLMENTS` mendukung siklus hidup enrollment: `active → completed` atau `active → paused → expired`.
- `CERTIFICATES` dibuat otomatis ketika `COURSE_PROGRESS.completion_percent = 100` dan semua kuis yang diperlukan telah lulus.

---

## Contoh Query

**Cek apakah user memiliki izin tertentu:**

```sql
SELECT p.name
FROM users u
JOIN user_roles ur ON ur.user_id = u.id
JOIN role_permissions rp ON rp.role_id = ur.role_id
JOIN permissions p ON p.id = rp.permission_id
WHERE u.id = '<user_id>'
  AND p.name = 'course.publish';
```

**Ambil progress kursus seorang siswa:**

```sql
SELECT
  c.title AS course_title,
  cp.completion_percent,
  cp.last_accessed_at,
  cp.completed_at
FROM enrollments e
JOIN courses c ON c.id = e.course_id
JOIN course_progress cp ON cp.enrollment_id = e.id
WHERE e.user_id = '<user_id>';
```

**Ambil detail progress per pelajaran:**

```sql
SELECT
  l.title AS lesson_title,
  lp.status,
  lp.watch_percent,
  lp.time_spent_sec
FROM lesson_progress lp
JOIN lessons l ON l.id = lp.lesson_id
WHERE lp.enrollment_id = '<enrollment_id>'
ORDER BY l.order_index;
```

tambahin dua table ini nanti di postgress ya

## ENROLLMENTS

Mencatat pendaftaran siswa ke sebuah kursus. Semua data progress diikat ke tabel ini.

| Kolom       | Tipe      | Keterangan                                            |
| ----------- | --------- | ----------------------------------------------------- |
| id          | UUID      | Primary key                                           |
| user_id     | UUID      | Foreign key → USERS.id                                |
| course_id   | UUID      | Foreign key → COURSES.id                              |
| enrolled_at | TIMESTAMP | Waktu pendaftaran                                     |
| status      | STRING    | Status enrollment: active, paused, completed, expired |

---

##COURSE_PROGRESS

Melacak progress keseluruhan seorang siswa dalam satu kursus. Satu record per enrollment.

| Kolom              | Tipe      | Keterangan                                            |
| ------------------ | --------- | ----------------------------------------------------- |
| id                 | UUID      | Primary key                                           |
| enrollment_id      | UUID      | Foreign key → ENROLLMENTS.id                          |
| completion_percent | FLOAT     | Persentase kursus yang telah diselesaikan (0.0–100.0) |
| last_accessed_at   | TIMESTAMP | Waktu terakhir siswa mengakses kursus                 |
| completed_at       | TIMESTAMP | Waktu kursus dinyatakan selesai (nullable)            |

---

jadi nanti coba diskusikan ini sama kawan kawan

md

---

## Struktur Tabel

### 1. USERS

Menyimpan semua pengguna sistem.

| Kolom        | Tipe      | Keterangan            |
| ------------ | --------- | --------------------- |
| `id`         | UUID      | Primary key           |
| `name`       | STRING    | Nama lengkap pengguna |
| `email`      | STRING    | Email unik pengguna   |
| `created_at` | TIMESTAMP | Waktu registrasi      |

---

### 2. ROLES

Mendefinisikan peran yang tersedia dalam sistem (misalnya `admin`, `student`, `instructor`).

| Kolom         | Tipe   | Keterangan        |
| ------------- | ------ | ----------------- |
| `id`          | UUID   | Primary key       |
| `name`        | STRING | Nama peran (unik) |
| `description` | STRING | Penjelasan peran  |

**Contoh data:**

| name         | description                          |
| ------------ | ------------------------------------ |
| `admin`      | Akses penuh ke seluruh sistem        |
| `instructor` | Dapat membuat dan mengelola kursus   |
| `student`    | Dapat mendaftar dan mengikuti kursus |

---

### 3. PERMISSIONS

Mendefinisikan izin granular berdasarkan resource dan action.

| Kolom      | Tipe   | Keterangan                                        |
| ---------- | ------ | ------------------------------------------------- |
| `id`       | UUID   | Primary key                                       |
| `name`     | STRING | Nama izin unik, format `resource.action`          |
| `resource` | STRING | Entitas yang diatur (misalnya `course`, `user`)   |
| `action`   | STRING | Aksi yang diizinkan (misalnya `create`, `delete`) |

**Contoh data:**

| name                | resource      | action    |
| ------------------- | ------------- | --------- |
| `course.create`     | `course`      | `create`  |
| `course.publish`    | `course`      | `publish` |
| `user.manage`       | `user`        | `manage`  |
| `quiz.grade`        | `quiz`        | `grade`   |
| `certificate.issue` | `certificate` | `issue`   |

---

### 4. USER_ROLES

Join table yang menghubungkan pengguna dengan peran mereka. Satu pengguna dapat memiliki lebih dari satu peran.

| Kolom         | Tipe      | Keterangan               |
| ------------- | --------- | ------------------------ |
| `id`          | UUID      | Primary key              |
| `user_id`     | UUID      | Foreign key → `USERS.id` |
| `role_id`     | UUID      | Foreign key → `ROLES.id` |
| `assigned_at` | TIMESTAMP | Waktu peran diberikan    |

---

### 5. ROLE_PERMISSIONS

Join table yang menghubungkan peran dengan izin yang dimilikinya.

| Kolom           | Tipe | Keterangan                     |
| --------------- | ---- | ------------------------------ |
| `id`            | UUID | Primary key                    |
| `role_id`       | UUID | Foreign key → `ROLES.id`       |
| `permission_id` | UUID | Foreign key → `PERMISSIONS.id` |

-—
