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
      category: "Robotics",
    });

    await Exam.create({
      course: "Robotics",

      category: "Robotics",

      title: "Ujian Dasar Robotics",

      description:
        "Exam mengenai konsep dasar robotika, Artificial Intelligence pada robot, sensor, aktuator, dan teknologi robot modern.",

      duration: 35,

      totalQuestions: 5,

      passingScore: 70,

      questions: [
        {
          question: "Apa pengertian robotika?",

          options: [
            "Bidang teknologi yang mempelajari robot",

            "Bahasa pemrograman",

            "Perangkat jaringan",

            "Software desain",
          ],

          correctAnswer: "Bidang teknologi yang mempelajari robot",
        },

        {
          question:
            "Komponen robot yang digunakan untuk mendeteksi lingkungan adalah?",

          options: ["Sensor", "Monitor", "Printer", "Storage"],

          correctAnswer: "Sensor",
        },

        {
          question: "Artificial Intelligence pada robot digunakan untuk?",

          options: [
            "Membuat robot dapat berpikir dan mengambil keputusan",

            "Menghapus data",

            "Mengganti hardware",

            "Meningkatkan ukuran monitor",
          ],

          correctAnswer: "Membuat robot dapat berpikir dan mengambil keputusan",
        },

        {
          question: "Robot industri digunakan untuk?",

          options: [
            "Otomatisasi proses produksi",

            "Menghapus internet",

            "Mencetak dokumen",

            "Mengatur RAM",
          ],

          correctAnswer: "Otomatisasi proses produksi",
        },

        {
          question: "Drone termasuk jenis?",

          options: ["Robot terbang", "Sistem operasi", "Database", "Compiler"],

          correctAnswer: "Robot terbang",
        },
      ],
    });

    console.log("Exam Robotics berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
