const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  course: String,

  category: String,

  title: String,

  description: String,

  duration: Number,

  totalQuestions: Number,

  passingScore: Number,

  questions: [
    {
      question: String,

      options: [String],

      correctAnswer: String,
    },
  ],
});

const Exam = mongoose.model("Exam", examSchema);

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27018/lms_exam_db");

    console.log("MongoDB Connected");

    await Exam.deleteMany({
      category: "Blockchain",
    });

    await Exam.create({
      course: "Blockchain",

      category: "Blockchain",

      title: "Ujian Dasar Blockchain",

      description:
        "Exam mengenai konsep dasar blockchain, cryptocurrency, smart contract, dan teknologi decentralized system.",

      duration: 35,

      totalQuestions: 5,

      passingScore: 70,

      questions: [
        {
          question: "Apa pengertian Blockchain?",

          options: [
            "Teknologi database terdistribusi",

            "Perangkat keras komputer",

            "Sistem operasi",

            "Bahasa pemrograman",
          ],

          correctAnswer: "Teknologi database terdistribusi",
        },

        {
          question: "Blockchain digunakan untuk?",

          options: [
            "Menyimpan data secara terdesentralisasi",

            "Menghapus internet",

            "Mengganti RAM",

            "Mencetak dokumen",
          ],

          correctAnswer: "Menyimpan data secara terdesentralisasi",
        },

        {
          question: "Cryptocurrency pertama berbasis blockchain adalah?",

          options: ["Ethereum", "Bitcoin", "Dogecoin", "Litecoin"],

          correctAnswer: "Bitcoin",
        },

        {
          question: "Smart Contract adalah?",

          options: [
            "Kontrak digital otomatis pada blockchain",

            "Perangkat jaringan",

            "Software antivirus",

            "Sistem operasi mobile",
          ],

          correctAnswer: "Kontrak digital otomatis pada blockchain",
        },

        {
          question: "Keunggulan utama blockchain adalah?",

          options: [
            "Transparansi dan keamanan data",

            "Mengurangi RAM",

            "Menghapus CPU",

            "Mengurangi internet",
          ],

          correctAnswer: "Transparansi dan keamanan data",
        },
      ],
    });

    console.log("Exam Blockchain berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
