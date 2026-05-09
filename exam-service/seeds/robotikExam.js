const pool = require("../config/postgres");

const run = async () => {
  try {
    console.log("PostgreSQL Connected");

    await pool.query(`

      INSERT INTO exams
      (
        title,
        category,
        description,
        duration,
        total_questions,
        passing_score
      )

      VALUES

      (
        'Ujian Dasar Robotics',
        'Robotics',
        'Exam mengenai dasar robotika dan teknologi robot modern',
        35,
        5,
        70
      )

    `);

    const examResult = await pool.query(`

        SELECT id FROM exams

        WHERE category='Robotics'

        ORDER BY id DESC

        LIMIT 1

      `);

    const examId = examResult.rows[0].id;

    await pool.query(`

      INSERT INTO questions
      (
        exam_id,
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer
      )

      VALUES

      (
        ${examId},

        'Apa pengertian robotika?',

        'Bidang teknologi yang mempelajari robot',

        'Bahasa pemrograman',

        'Perangkat jaringan',

        'Software desain',

        'Bidang teknologi yang mempelajari robot'
      ),

      (
        ${examId},

        'Komponen robot untuk mendeteksi lingkungan adalah?',

        'Sensor',

        'Monitor',

        'Printer',

        'Storage',

        'Sensor'
      ),

      (
        ${examId},

        'AI pada robot digunakan untuk?',

        'Pengambilan keputusan otomatis',

        'Menghapus internet',

        'Menghapus CPU',

        'Mengatur monitor',

        'Pengambilan keputusan otomatis'
      ),

      (
        ${examId},

        'Robot industri digunakan untuk?',

        'Otomatisasi produksi',

        'Menghapus data',

        'Mencetak dokumen',

        'Mengatur RAM',

        'Otomatisasi produksi'
      ),

      (
        ${examId},

        'Drone termasuk jenis?',

        'Robot terbang',

        'Sistem operasi',

        'Database',

        'Compiler',

        'Robot terbang'
      )

    `);

    console.log("Exam Robotics berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
