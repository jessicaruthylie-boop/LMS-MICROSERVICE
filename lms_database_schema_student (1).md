# LMS Database Schema — Student Side

Skema database untuk **Student Side LMS** dengan Role-Based Access Control (RBAC).  
Mencakup: `course-service` · `exam-service` · `notification-service` · `auth-service` · `discussion-service` · `analytics-service` · `content-service`

---

## Daftar Service & Database

| Service                       | Database        | Port         | Keterangan                                  |
| ----------------------------- | --------------- | ------------ | ------------------------------------------- |
| `course-service`              | MongoDB         | 27017        | Data kursus, modul, dan materi pembelajaran |
| `exam-service`                | PostgreSQL      | 5433         | Data ujian, percobaan, dan sertifikat       |
| `notification-service`        | MongoDB         | 27017        | Notifikasi progress dan kelulusan siswa     |
| `auth-service` _(baru)_       | PostgreSQL      | 5432         | Autentikasi, user, roles & permissions      |
| `discussion-service` _(baru)_ | MongoDB         | 27017        | Komentar dan diskusi per pelajaran          |
| `analytics-service` _(baru)_  | MongoDB         | 27017        | Statistik dan laporan aktivitas belajar     |
| `content-service` _(baru)_    | MongoDB + MinIO | 27017 / 9000 | Manajemen file video, PDF, dan gambar       |

---

## Daftar Tabel / Collection

1. [courses](#1-courses)
2. [modules](#2-modules)
3. [announcements](#9-announcements) _(baru)_

### exam-service (PostgreSQL)

12. [quizzes](#12-quizzes)
13. [quiz_questions](#13-quiz_questions) _(baru)_
14. [quiz_attempts](#14-quiz_attempts)

### notification-service (MongoDB)

17. [notifications](#17-notifications)

### 1. courses

Menyimpan data kursus yang tersedia di platform.

| Field           | Tipe          | Keterangan                                 |
| --------------- | ------------- | ------------------------------------------ |
| `_id`           | ObjectId      | Primary key                                |
| `title`         | String        | Judul kursus                               |
| `description`   | String        | Deskripsi kursus                           |
| `instructor_id` | String (UUID) | Referensi ke `users.id` (auth-service)     |
| `category`      | String        | Kategori kursus                            |
| `thumbnail_url` | String        | URL gambar thumbnail                       |
| `status`        | String        | `draft` \| `published` \| `archived`       |
| `level`         | String        | `beginner` \| `intermediate` \| `advanced` |
| `published_at`  | Date          | Waktu dipublikasikan (nullable)            |
| `created_at`    | Date          | Waktu dibuat                               |
| `updated_at`    | Date          | Waktu diperbarui                           |

---

### 2. modules

Pengelompokan pelajaran di dalam sebuah kursus.

| Field         | Tipe     | Keterangan                 |
| ------------- | -------- | -------------------------- |
| `_id`         | ObjectId | Primary key                |
| `course_id`   | ObjectId | Referensi ke `courses._id` |
| `title`       | String   | Judul modul                |
| `description` | String   | Deskripsi singkat modul    |
| `order_index` | Number   | Urutan modul dalam kursus  |
| `created_at`  | Date     | Waktu dibuat               |
| `updated_at`  | Date     | Waktu diperbarui           |

---

---

---

### 9. announcements _(baru)_

Pengumuman dari instruktur kepada semua siswa terdaftar di kursus.

| Field           | Tipe          | Keterangan                                    |
| --------------- | ------------- | --------------------------------------------- |
| `_id`           | ObjectId      | Primary key                                   |
| `course_id`     | ObjectId      | Referensi ke `courses._id`                    |
| `instructor_id` | String (UUID) | Referensi ke `users.id`                       |
| `title`         | String        | Judul pengumuman                              |
| `content`       | String        | Isi pengumuman                                |
| `pinned`        | Boolean       | Apakah pengumuman disematkan (default: false) |
| `created_at`    | Date          | Waktu dibuat                                  |
| `updated_at`    | Date          | Waktu diperbarui                              |

**Contoh dokumen:**

```json
{
  "_id": "ObjectId('...')",
  "course_id": "ObjectId('...')",
  "instructor_id": "uuid-instructor-001",
  "title": "Jadwal Ujian Tengah Semester",
  "content": "Ujian dilaksanakan pada 20 Maret 2026.",
  "pinned": true,
  "created_at": "2026-03-12T08:00:00Z",
  "updated_at": "2026-03-12T08:00:00Z"
}
```

---

## exam-service

> **PostgreSQL** — integritas data ujian, soal, penilaian, dan sertifikat.

---

### 12. quizzes

Kuis yang terikat pada sebuah pelajaran.

| Kolom            | Tipe         | Keterangan                           |
| ---------------- | ------------ | ------------------------------------ |
| `id`             | UUID         | Primary key                          |
| `lesson_id`      | VARCHAR(24)  | Referensi ke `lessons._id` (MongoDB) |
| `course_id`      | VARCHAR(24)  | Referensi ke `courses._id` (MongoDB) |
| `title`          | VARCHAR(200) | Judul kuis                           |
| `passing_score`  | INT          | Skor minimum untuk lulus (0–100)     |
| `max_attempts`   | INT          | Maksimum percobaan yang diizinkan    |
| `time_limit_sec` | INT          | Batas waktu pengerjaan (nullable)    |
| `created_at`     | TIMESTAMP    | Waktu dibuat                         |

```sql
CREATE TABLE quizzes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id      VARCHAR(24)  NOT NULL,
  course_id      VARCHAR(24)  NOT NULL,
  title          VARCHAR(200) NOT NULL,
  passing_score  INT          NOT NULL DEFAULT 70,
  max_attempts   INT          NOT NULL DEFAULT 3,
  time_limit_sec INT,
  created_at     TIMESTAMP    NOT NULL DEFAULT NOW()
);
```

---

### 13. quiz_questions _(baru)_

Soal-soal dalam sebuah kuis beserta pilihan jawaban.

| Kolom            | Tipe        | Keterangan                                   |
| ---------------- | ----------- | -------------------------------------------- |
| `id`             | UUID        | Primary key                                  |
| `quiz_id`        | UUID        | Foreign key → `quizzes.id`                   |
| `question_text`  | TEXT        | Isi pertanyaan                               |
| `question_type`  | VARCHAR(20) | `multiple_choice` \| `true_false` \| `essay` |
| `options`        | JSONB       | Pilihan jawaban (multiple choice)            |
| `correct_answer` | TEXT        | Kunci jawaban                                |
| `points`         | INT         | Nilai per soal (default: 10)                 |
| `order_index`    | INT         | Urutan soal dalam kuis                       |

```sql
CREATE TABLE quiz_questions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id        UUID        NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text  TEXT        NOT NULL,
  question_type  VARCHAR(20) NOT NULL DEFAULT 'multiple_choice',
  options        JSONB,
  correct_answer TEXT        NOT NULL,
  points         INT         NOT NULL DEFAULT 10,
  order_index    INT         NOT NULL DEFAULT 1
);
```

**Contoh options (JSONB):**

```json
[
  { "key": "A", "text": "Node.js" },
  { "key": "B", "text": "Django" },
  { "key": "C", "text": "Laravel" },
  { "key": "D", "text": "Spring Boot" }
]
```

---

### 14. quiz_attempts

Setiap percobaan siswa mengerjakan kuis.

| Kolom            | Tipe        | Keterangan                               |
| ---------------- | ----------- | ---------------------------------------- |
| `id`             | UUID        | Primary key                              |
| `quiz_id`        | UUID        | Foreign key → `quizzes.id`               |
| `enrollment_id`  | VARCHAR(24) | Referensi ke `enrollments._id` (MongoDB) |
| `user_id`        | VARCHAR(36) | Referensi ke `users.id` (auth-service)   |
| `score`          | INT         | Skor yang diperoleh (0–100)              |
| `attempt_number` | INT         | Urutan percobaan ke-n                    |
| `passed`         | BOOLEAN     | Apakah percobaan ini lulus               |
| `answers`        | JSONB       | Jawaban siswa                            |
| `started_at`     | TIMESTAMP   | Waktu ujian dimulai                      |
| `submitted_at`   | TIMESTAMP   | Waktu jawaban dikumpulkan (nullable)     |

```sql
CREATE TABLE quiz_attempts (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id        UUID        NOT NULL REFERENCES quizzes(id),
  enrollment_id  VARCHAR(24) NOT NULL,
  user_id        VARCHAR(36) NOT NULL,
  score          INT         NOT NULL DEFAULT 0,
  attempt_number INT         NOT NULL DEFAULT 1,
  passed         BOOLEAN     NOT NULL DEFAULT false,
  answers        JSONB,
  started_at     TIMESTAMP   NOT NULL DEFAULT NOW(),
  submitted_at   TIMESTAMP
);
```

---

## notification-service

> **MongoDB** — notifikasi berbasis event dari RabbitMQ.

---

### 17. notifications

Semua notifikasi yang dikirimkan kepada pengguna.

| Field        | Tipe          | Keterangan                                                                                                |
| ------------ | ------------- | --------------------------------------------------------------------------------------------------------- |
| `_id`        | ObjectId      | Primary key                                                                                               |
| `user_id`    | String (UUID) | Referensi ke `users.id`                                                                                   |
| `type`       | String        | `enrolled` \| `exam_passed` \| `exam_failed` \| `course_update` \| `certificate_issued` \| `announcement` |
| `title`      | String        | Judul notifikasi                                                                                          |
| `message`    | String        | Isi pesan notifikasi                                                                                      |
| `read`       | Boolean       | Status baca (default: false)                                                                              |
| `metadata`   | Object        | Data tambahan (course_id, quiz_id, cert_id)                                                               |
| `created_at` | Date          | Waktu dibuat                                                                                              |

---
