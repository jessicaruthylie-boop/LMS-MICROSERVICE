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
        'Ujian Dasar Blockchain',
        'Blockchain',
        'Exam mengenai dasar blockchain dan cryptocurrency',
        35,
        5,
        70
      )

    `);

    const examResult = await pool.query(`

        SELECT id FROM exams

        WHERE category='Blockchain'

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

        'Apa pengertian Blockchain?',

        'Database terdistribusi',

        'Perangkat keras',

        'Bahasa pemrograman',

        'Sistem operasi',

        'Database terdistribusi'
      ),

      (
        ${examId},

        'Cryptocurrency pertama adalah?',

        'Ethereum',

        'Bitcoin',

        'Dogecoin',

        'Litecoin',

        'Bitcoin'
      ),

      (
        ${examId},

        'Smart Contract adalah?',

        'Kontrak digital otomatis',

        'Software antivirus',

        'Perangkat jaringan',

        'Sistem operasi',

        'Kontrak digital otomatis'
      ),

      (
        ${examId},

        'Keunggulan blockchain adalah?',

        'Transparansi data',

        'Menghapus internet',

        'Mengurangi RAM',

        'Menghapus CPU',

        'Transparansi data'
      ),

      (
        ${examId},

        'Blockchain bersifat?',

        'Terdesentralisasi',

        'Offline',

        'Manual',

        'Analog',

        'Terdesentralisasi'
      )

    `);

    console.log("Exam Blockchain berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
