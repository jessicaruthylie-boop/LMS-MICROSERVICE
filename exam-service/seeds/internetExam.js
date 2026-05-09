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
      category: "Internet",
    });

    await Exam.create({
      course: "Internet",

      category: "Internet",

      title: "Ujian Dasar Internet",

      description:
        "Exam mengenai dasar teknologi internet dan jaringan global.",

      duration: 30,

      totalQuestions: 5,

      passingScore: 70,

      questions: [
        {
          question: "Apa pengertian internet?",

          options: [
            "Jaringan komputer global",

            "Perangkat keras komputer",

            "Aplikasi editing",

            "Bahasa pemrograman",
          ],

          correctAnswer: "Jaringan komputer global",
        },

        {
          question: "Cikal bakal internet modern adalah?",

          options: ["Bluetooth", "ARPANET", "Windows", "Linux"],

          correctAnswer: "ARPANET",
        },

        {
          question: "Fungsi DNS adalah?",

          options: [
            "Menghapus data",

            "Menerjemahkan domain menjadi IP Address",

            "Membuat website",

            "Mengatur RAM",
          ],

          correctAnswer: "Menerjemahkan domain menjadi IP Address",
        },

        {
          question: "Perangkat lunak untuk membuka website disebut?",

          options: ["Compiler", "Browser", "Driver", "Database"],

          correctAnswer: "Browser",
        },

        {
          question: "Protokol utama internet adalah?",

          options: ["TCP/IP", "HTTP Only", "SMTP", "FTP"],

          correctAnswer: "TCP/IP",
        },
      ],
    });

    console.log("Exam Internet berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
