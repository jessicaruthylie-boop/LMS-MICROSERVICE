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
        'Ujian Dasar Artificial Intelligence',
        'Artificial Intelligence',
        'Exam mengenai dasar AI dan Machine Learning',
        35,
        5,
        70
      )

    `);

    const examResult = await pool.query(`

        SELECT id FROM exams

        WHERE category='Artificial Intelligence'

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

        'Apa pengertian Artificial Intelligence?',

        'Teknologi kecerdasan buatan',

        'Perangkat jaringan',

        'Sistem operasi',

        'Bahasa pemrograman',

        'Teknologi kecerdasan buatan'
      ),

      (
        ${examId},

        'Machine Learning adalah?',

        'Cabang AI yang belajar dari data',

        'Hardware komputer',

        'Database system',

        'Software desain',

        'Cabang AI yang belajar dari data'
      ),

      (
        ${examId},

        'Contoh AI modern adalah?',

        'ChatGPT',

        'Printer',

        'RAM',

        'Switch',

        'ChatGPT'
      ),

      (
        ${examId},

        'AI digunakan untuk?',

        'Analisis data otomatis',

        'Menghapus internet',

        'Mengganti monitor',

        'Mencetak uang',

        'Analisis data otomatis'
      ),

      (
        ${examId},

        'Teknologi utama ChatGPT adalah?',

        'Large Language Model',

        'Fiber Optic',

        'CPU Only',

        'Blockchain',

        'Large Language Model'
      )

    `);

    console.log("Exam AI berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
