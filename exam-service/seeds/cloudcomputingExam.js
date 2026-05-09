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
        'Ujian Dasar Cloud Computing',
        'Cloud Computing',
        'Exam mengenai dasar cloud computing dan virtualisasi',
        35,
        5,
        70
      )

    `);

    const examResult = await pool.query(`

        SELECT id FROM exams

        WHERE category='Cloud Computing'

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

        'Apa pengertian Cloud Computing?',

        'Layanan komputasi melalui internet',

        'Perangkat jaringan',

        'Bahasa pemrograman',

        'Sistem operasi',

        'Layanan komputasi melalui internet'
      ),

      (
        ${examId},

        'Teknologi dasar Cloud Computing adalah?',

        'Virtualisasi',

        'Scanner',

        'Printer',

        'Bluetooth',

        'Virtualisasi'
      ),

      (
        ${examId},

        'AWS merupakan layanan cloud milik?',

        'Google',

        'Amazon',

        'Microsoft',

        'Apple',

        'Amazon'
      ),

      (
        ${examId},

        'Docker digunakan untuk?',

        'Container aplikasi',

        'Menghapus RAM',

        'Mengatur monitor',

        'Menghapus database',

        'Container aplikasi'
      ),

      (
        ${examId},

        'Kubernetes digunakan untuk?',

        'Mengelola container',

        'Menghapus internet',

        'Mencetak dokumen',

        'Mengatur CPU',

        'Mengelola container'
      )

    `);

    console.log("Exam Cloud Computing berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
