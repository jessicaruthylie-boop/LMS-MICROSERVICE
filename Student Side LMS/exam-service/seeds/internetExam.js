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
        'Ujian Dasar Internet',
        'Internet',
        'Exam mengenai dasar internet dan jaringan global',
        30,
        5,
        70
      )

    `);

    const examResult = await pool.query(`

        SELECT id FROM exams

        WHERE category='Internet'

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

        'Apa pengertian internet?',

        'Jaringan komputer global',

        'Perangkat keras',

        'Bahasa pemrograman',

        'Software editing',

        'Jaringan komputer global'
      ),

      (
        ${examId},

        'Cikal bakal internet modern adalah?',

        'Linux',

        'ARPANET',

        'Bluetooth',

        'Windows',

        'ARPANET'
      ),

      (
        ${examId},

        'Fungsi DNS adalah?',

        'Menghapus data',

        'Menerjemahkan domain menjadi IP Address',

        'Mengganti RAM',

        'Mengatur monitor',

        'Menerjemahkan domain menjadi IP Address'
      ),

      (
        ${examId},

        'Perangkat lunak untuk membuka website disebut?',

        'Compiler',

        'Browser',

        'Database',

        'Driver',

        'Browser'
      ),

      (
        ${examId},

        'Protokol utama internet adalah?',

        'TCP/IP',

        'HTML',

        'SMTP',

        'CSS',

        'TCP/IP'
      )

    `);

    console.log("Exam Internet berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
