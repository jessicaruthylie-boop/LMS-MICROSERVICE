const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,

  category: String,

  description: String,

  instructor: String,

  level: String,

  duration: String,

  rating: Number,

  students: Number,

  language: String,

  certificate: Boolean,

  image: String,

  materials: [
    {
      title: String,
      theory: String,
    },
  ],
});

const Course = mongoose.model("Course", courseSchema);

const run = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27018/lms_course_db");

    console.log("MongoDB Connected");

    await Course.deleteMany({
      category: "Komputer",
    });

    await Course.create({
      title: "Komputer",

      category: "Komputer",

      description: "Course lengkap mengenai teknologi komputer modern.",

      instructor: "Jessica Ruth",

      level: "Beginner",

      duration: "40 jam",

      rating: 4.9,

      students: 12500,

      language: "Indonesia",

      certificate: true,

      image: "computer-course.jpg",

      materials: [
        {
          title: "Pengertian Komputer",

          theory:
            "Komputer adalah perangkat elektronik yang digunakan untuk menerima input, memproses data, menyimpan data, dan menghasilkan informasi.",
        },

        {
          title: "Sejarah Komputer",

          theory:
            "Perkembangan komputer dimulai dari alat hitung sederhana hingga komputer digital modern.",
        },

        {
          title: "Hardware Komputer",

          theory:
            "Hardware adalah seluruh komponen fisik komputer seperti CPU, RAM, motherboard, storage, dan monitor.",
        },

        {
          title: "Software Komputer",

          theory:
            "Software adalah program yang digunakan untuk menjalankan sistem komputer.",
        },

        {
          title: "Sistem Operasi",

          theory:
            "Sistem operasi adalah software utama yang mengatur seluruh aktivitas komputer.",
        },

        {
          title: "Jaringan Komputer",

          theory:
            "Jaringan komputer memungkinkan perangkat saling terhubung untuk berbagi data.",
        },

        {
          title: "Internet dan Komputer",

          theory:
            "Internet memungkinkan komputer saling berkomunikasi secara global.",
        },

        {
          title: "Artificial Intelligence",

          theory:
            "AI memungkinkan komputer melakukan analisis data dan pengambilan keputusan otomatis.",
        },

        {
          title: "Cloud Computing",

          theory:
            "Cloud computing memungkinkan data dan aplikasi diakses melalui internet.",
        },

        {
          title: "Masa Depan Teknologi Komputer",

          theory:
            "Komputer masa depan akan berkembang menuju AI, cloud computing, dan quantum computing.",
        },
      ],
    });

    console.log("Database komputer berhasil diisi");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
