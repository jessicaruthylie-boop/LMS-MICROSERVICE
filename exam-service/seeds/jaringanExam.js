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
      category: "Networking",
    });

    await Exam.create({
      course: "Networking",

      category: "Networking",

      title: "Ujian Dasar Networking",

      description:
        "Exam mengenai konsep dasar jaringan komputer, perangkat jaringan, protokol internet, dan keamanan jaringan.",

      duration: 35,

      totalQuestions: 5,

      passingScore: 70,

      questions: [
        {
          question: "Apa pengertian jaringan komputer?",

          options: [
            "Sistem yang menghubungkan beberapa perangkat untuk berbagi data",

            "Perangkat untuk mencetak dokumen",

            "Bahasa pemrograman",

            "Software editing",
          ],

          correctAnswer:
            "Sistem yang menghubungkan beberapa perangkat untuk berbagi data",
        },

        {
          question:
            "Perangkat yang digunakan untuk menghubungkan beberapa jaringan adalah?",

          options: ["Router", "Keyboard", "Scanner", "Printer"],

          correctAnswer: "Router",
        },

        {
          question: "Protokol utama internet adalah?",

          options: ["TCP/IP", "HTML", "CSS", "SMTP"],

          correctAnswer: "TCP/IP",
        },

        {
          question: "Fungsi switch dalam jaringan adalah?",

          options: [
            "Menghubungkan perangkat dalam satu LAN",

            "Menghapus data",

            "Mencetak gambar",

            "Membuat website",
          ],

          correctAnswer: "Menghubungkan perangkat dalam satu LAN",
        },

        {
          question: "Firewall digunakan untuk?",

          options: [
            "Melindungi jaringan dari akses tidak sah",

            "Mengatur monitor",

            "Menghapus RAM",

            "Meningkatkan kapasitas storage",
          ],

          correctAnswer: "Melindungi jaringan dari akses tidak sah",
        },
      ],
    });

    console.log("Exam Networking berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
