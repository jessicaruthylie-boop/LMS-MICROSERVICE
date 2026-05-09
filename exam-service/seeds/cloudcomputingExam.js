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
      category: "Cloud Computing",
    });

    await Exam.create({
      course: "Cloud Computing",

      category: "Cloud Computing",

      title: "Ujian Dasar Cloud Computing",

      description:
        "Exam mengenai konsep dasar cloud computing, virtualisasi, container, dan layanan cloud modern.",

      duration: 35,

      totalQuestions: 5,

      passingScore: 70,

      questions: [
        {
          question: "Apa pengertian Cloud Computing?",

          options: [
            "Teknologi penyimpanan dan layanan melalui internet",

            "Perangkat keras jaringan",

            "Bahasa pemrograman",

            "Sistem operasi komputer",
          ],

          correctAnswer: "Teknologi penyimpanan dan layanan melalui internet",
        },

        {
          question: "Teknologi dasar yang mendukung cloud computing adalah?",

          options: ["Virtualisasi", "Printer", "Monitor", "Scanner"],

          correctAnswer: "Virtualisasi",
        },

        {
          question: "AWS adalah layanan cloud milik?",

          options: ["Google", "Amazon", "Microsoft", "Apple"],

          correctAnswer: "Amazon",
        },

        {
          question: "Docker digunakan untuk?",

          options: [
            "Container aplikasi",

            "Menghapus database",

            "Mengganti RAM",

            "Mengedit gambar",
          ],

          correctAnswer: "Container aplikasi",
        },

        {
          question: "Kubernetes digunakan untuk?",

          options: [
            "Mengelola container dalam skala besar",

            "Menghapus server",

            "Membuat browser",

            "Mengatur monitor",
          ],

          correctAnswer: "Mengelola container dalam skala besar",
        },
      ],
    });

    console.log("Exam Cloud Computing berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
