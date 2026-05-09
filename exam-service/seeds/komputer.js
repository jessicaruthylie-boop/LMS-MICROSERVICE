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
      category: "Komputer",
    });

    await Exam.create({
      course: "Komputer",

      category: "Komputer",

      title: "Ujian Dasar Komputer",

      description: "Exam mengenai dasar teknologi komputer.",

      duration: 30,

      totalQuestions: 5,

      passingScore: 70,

      questions: [
        {
          question: "Apa fungsi utama komputer?",

          options: [
            "Mengolah data",

            "Mencetak uang",

            "Menghapus internet",

            "Membuat listrik",
          ],

          correctAnswer: "Mengolah data",
        },

        {
          question: "CPU merupakan?",

          options: ["Storage", "Otak komputer", "Software", "Browser"],

          correctAnswer: "Otak komputer",
        },

        {
          question: "RAM digunakan untuk?",

          options: [
            "Menyimpan data sementara",

            "Menghubungkan internet",

            "Mencetak gambar",

            "Mematikan komputer",
          ],

          correctAnswer: "Menyimpan data sementara",
        },

        {
          question: "Yang termasuk hardware adalah?",

          options: [
            "Google Chrome",

            "Windows",

            "Motherboard",

            "Microsoft Word",
          ],

          correctAnswer: "Motherboard",
        },

        {
          question: "Software utama komputer disebut?",

          options: ["Sistem Operasi", "CPU", "RAM", "Monitor"],

          correctAnswer: "Sistem Operasi",
        },
      ],
    });

    console.log("Exam Komputer berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
