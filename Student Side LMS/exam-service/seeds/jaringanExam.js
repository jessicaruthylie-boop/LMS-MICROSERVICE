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
        'Ujian Dasar Networking',
        'Networking',
        'Exam mengenai dasar jaringan komputer',
        35,
        5,
        70
      )

    `);

    const examResult = await pool.query(`

        SELECT id FROM exams

        WHERE category='Networking'

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

        'Apa pengertian jaringan komputer?',

        'Sistem yang menghubungkan perangkat untuk berbagi data',

        'Perangkat keras',

        'Bahasa pemrograman',

        'Software editing',

        'Sistem yang menghubungkan perangkat untuk berbagi data'
      ),

      (
        ${examId},

        'Perangkat untuk menghubungkan jaringan disebut?',

        'Router',

        'Keyboard',

        'Scanner',

        'Printer',

        'Router'
      ),

      (
        ${examId},

        'Protokol utama internet adalah?',

        'TCP/IP',

        'HTML',

        'CSS',

        'SMTP',

        'TCP/IP'
      ),

      (
        ${examId},

        'Fungsi switch dalam jaringan adalah?',

        'Menghubungkan perangkat dalam LAN',

        'Menghapus data',

        'Mencetak gambar',

        'Menghapus RAM',

        'Menghubungkan perangkat dalam LAN'
      ),

      (
        ${examId},

        'Firewall digunakan untuk?',

        'Melindungi jaringan dari akses tidak sah',

        'Menghapus CPU',

        'Mengatur monitor',

        'Menghapus internet',

        'Melindungi jaringan dari akses tidak sah'
      )

    `);

    console.log("Exam Networking berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
