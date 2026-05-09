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
      category: "Operating System",
    });

    await Exam.create({
      course: "Operating System",

      category: "Operating System",

      title: "Ujian Dasar Operating System",

      description:
        "Exam mengenai konsep dasar sistem operasi, kernel, manajemen proses, dan operating system modern.",

      duration: 35,

      totalQuestions: 5,

      passingScore: 70,

      questions: [
        {
          question: "Apa fungsi utama sistem operasi?",

          options: [
            "Mengatur seluruh aktivitas komputer",

            "Mencetak dokumen",

            "Menghapus hardware",

            "Membuat jaringan internet",
          ],

          correctAnswer: "Mengatur seluruh aktivitas komputer",
        },

        {
          question: "Bagian inti dari sistem operasi disebut?",

          options: ["Browser", "Kernel", "Database", "Compiler"],

          correctAnswer: "Kernel",
        },

        {
          question: "Contoh sistem operasi open source adalah?",

          options: [
            "Linux",

            "Windows XP",

            "Microsoft Office",

            "Adobe Photoshop",
          ],

          correctAnswer: "Linux",
        },

        {
          question: "Fungsi manajemen memori pada sistem operasi adalah?",

          options: [
            "Mengatur penggunaan RAM",

            "Menghapus CPU",

            "Mengatur printer",

            "Mengganti monitor",
          ],

          correctAnswer: "Mengatur penggunaan RAM",
        },

        {
          question: "Android merupakan sistem operasi berbasis?",

          options: ["Linux", "UNIX", "DOS", "RouterOS"],

          correctAnswer: "Linux",
        },
      ],
    });

    console.log("Exam Operating System berhasil dibuat");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
