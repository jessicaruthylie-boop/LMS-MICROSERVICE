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
        'Ujian Dasar Operating System',
        'Operating System',
        'Exam mengenai dasar sistem operasi komputer',
        35,
        5,
        70
      )

    `);

    const examResult = await pool.query(`

        SELECT id FROM exams

        WHERE category='Operating System'

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

        'Apa fungsi utama sistem operasi?',

        'Mengatur seluruh aktivitas komputer',

        'Menghapus internet',

        'Mencetak uang',

        'Mengatur monitor',

        'Mengatur seluruh aktivitas komputer'
      ),

      (
        ${examId},

        'Bagian inti sistem operasi disebut?',

        'Kernel',

        'Browser',

        'Database',

        'Compiler',

        'Kernel'
      ),

      (
        ${examId},

        'Contoh sistem operasi open source adalah?',

        'Linux',

        'Microsoft Office',

        'Photoshop',

        'Google Chrome',

        'Linux'
      ),

      (
        ${examId},

        'Android berbasis pada?',

        'Linux',

        'DOS',

        'UNIX',

        'Fiber Optic',

        'Linux'
      ),

      (
        ${examId},

        'Manajemen memori digunakan untuk?',

        'Mengatur penggunaan RAM',

        'Menghapus CPU',

        'Mengatur printer',

        'Menghapus database',

        'Mengatur penggunaan RAM'
      )

    `);

    console.log("Exam Operating System berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
