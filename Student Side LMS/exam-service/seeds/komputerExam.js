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
        'Ujian Dasar Komputer',
        'Komputer',
        'Exam mengenai dasar komputer',
        30,
        5,
        70
      )

      RETURNING id
    `);

    const examResult = await pool.query(`
        SELECT id FROM exams
        WHERE category='Komputer'
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

        'Apa fungsi utama komputer?',

        'Mengolah data',

        'Mencetak uang',

        'Menghapus internet',

        'Membuat listrik',

        'Mengolah data'
      ),

      (
        ${examId},

        'CPU merupakan?',

        'Storage',

        'Otak komputer',

        'Software',

        'Browser',

        'Otak komputer'
      ),

      (
        ${examId},

        'RAM digunakan untuk?',

        'Menyimpan data sementara',

        'Menghapus CPU',

        'Mengatur monitor',

        'Mencetak gambar',

        'Menyimpan data sementara'
      ),

      (
        ${examId},

        'Software utama komputer disebut?',

        'Sistem Operasi',

        'Motherboard',

        'CPU',

        'Router',

        'Sistem Operasi'
      ),

      (
        ${examId},

        'Yang termasuk hardware adalah?',

        'Motherboard',

        'Google Chrome',

        'Windows',

        'Microsoft Word',

        'Motherboard'
      )

    `);

    console.log("Exam Komputer berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
