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
      category: "Artificial Intelligence",
    });

    await Exam.create({
      course: "Artificial Intelligence",

      category: "Artificial Intelligence",

      title: "Ujian Dasar Artificial Intelligence",

      description:
        "Exam mengenai konsep dasar Artificial Intelligence, Machine Learning, dan perkembangan teknologi AI modern.",

      duration: 35,

      totalQuestions: 5,

      passingScore: 70,

      questions: [
        {
          question: "Apa pengertian Artificial Intelligence?",

          options: [
            "Teknologi kecerdasan buatan pada komputer",

            "Perangkat keras jaringan",

            "Sistem operasi komputer",

            "Bahasa pemrograman",
          ],

          correctAnswer: "Teknologi kecerdasan buatan pada komputer",
        },

        {
          question: "AI digunakan untuk?",

          options: [
            "Mengolah makanan",

            "Membuat listrik",

            "Analisis data dan pengambilan keputusan otomatis",

            "Menghapus hardware",
          ],

          correctAnswer: "Analisis data dan pengambilan keputusan otomatis",
        },

        {
          question: "Machine Learning adalah?",

          options: [
            "Teknologi jaringan internet",

            "Cabang AI yang memungkinkan sistem belajar dari data",

            "Perangkat keras komputer",

            "Software editing video",
          ],

          correctAnswer: "Cabang AI yang memungkinkan sistem belajar dari data",
        },

        {
          question: "Contoh penerapan AI adalah?",

          options: ["Chatbot", "Kabel LAN", "Flashdisk", "Monitor CRT"],

          correctAnswer: "Chatbot",
        },

        {
          question: "Teknologi AI modern yang digunakan ChatGPT disebut?",

          options: [
            "Blockchain",

            "Large Language Model",

            "Router",

            "Fiber Optic",
          ],

          correctAnswer: "Large Language Model",
        },
      ],
    });

    console.log("Exam Artificial Intelligence berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
