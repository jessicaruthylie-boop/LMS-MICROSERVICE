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
      category: "Robotics",
    });

    await Course.create({
      title: "Robotics",

      category: "Robotics",

      description:
        "Course lengkap mengenai robotika, sistem robot modern, Artificial Intelligence pada robot, sensor, otomasi industri, drone, dan masa depan teknologi robotik.",

      instructor: "Felix Jonathan",

      level: "Beginner",

      duration: "50 jam",

      rating: 4.9,

      students: 15200,

      language: "Indonesia",

      certificate: true,

      image: "robotics-course.jpg",

      materials: [
        {
          title: "Pengertian Robotika",

          theory:
            "Robotika adalah bidang teknologi yang mempelajari desain, pengembangan, pemrograman, dan pengoperasian robot untuk membantu atau menggantikan pekerjaan manusia secara otomatis.",
        },

        {
          title: "Sejarah Robotika",

          theory:
            "Perkembangan robotika dimulai dari mesin mekanik sederhana hingga robot modern berbasis Artificial Intelligence yang mampu bekerja secara otomatis dan cerdas.",
        },

        {
          title: "Konsep Dasar Robot",

          theory:
            "Robot adalah sistem otomatis yang dapat menerima input, memproses data, dan menghasilkan aksi tertentu berdasarkan program dan sensor yang digunakan.",
        },

        {
          title: "Komponen Robot",

          theory:
            "Robot terdiri dari beberapa komponen utama seperti sensor, aktuator, controller, power supply, motor, dan sistem pemrograman.",
        },

        {
          title: "Sensor pada Robot",

          theory:
            "Sensor digunakan robot untuk mendeteksi lingkungan sekitar seperti cahaya, suhu, jarak, suara, gerakan, dan objek tertentu.",
        },

        {
          title: "Aktuator dan Motor",

          theory:
            "Aktuator dan motor digunakan untuk menghasilkan gerakan pada robot sehingga robot dapat bergerak dan melakukan tugas tertentu.",
        },

        {
          title: "Controller Robot",

          theory:
            "Controller berfungsi sebagai otak robot yang mengatur seluruh proses pengambilan keputusan dan pengendalian sistem robot.",
        },

        {
          title: "Artificial Intelligence pada Robot",

          theory:
            "AI memungkinkan robot belajar dari data, mengenali pola, mengambil keputusan otomatis, dan berinteraksi secara lebih cerdas dengan manusia.",
        },

        {
          title: "Machine Learning untuk Robot",

          theory:
            "Machine Learning memungkinkan robot meningkatkan kemampuan berdasarkan pengalaman dan data yang dipelajari.",
        },

        {
          title: "Computer Vision",

          theory:
            "Computer Vision memungkinkan robot mengenali gambar, objek, wajah, dan lingkungan sekitar menggunakan kamera dan AI.",
        },

        {
          title: "Robot Industri",

          theory:
            "Robot industri digunakan di pabrik dan industri manufaktur untuk meningkatkan efisiensi produksi dan otomatisasi pekerjaan.",
        },

        {
          title: "Autonomous Robot",

          theory:
            "Autonomous robot dapat bekerja secara mandiri tanpa dikendalikan manusia secara langsung.",
        },

        {
          title: "Drone Technology",

          theory:
            "Drone adalah robot terbang yang digunakan dalam pemetaan, pengawasan, pengiriman barang, fotografi, dan kebutuhan militer.",
        },

        {
          title: "Humanoid Robot",

          theory:
            "Humanoid robot dirancang menyerupai manusia baik dari bentuk maupun cara bergerak dan berinteraksi.",
        },

        {
          title: "Medical Robotics",

          theory:
            "Robotika digunakan dalam bidang kesehatan untuk operasi medis, rehabilitasi pasien, dan sistem monitoring kesehatan modern.",
        },

        {
          title: "Robot dalam Pendidikan",

          theory:
            "Robotika digunakan dalam pendidikan untuk pembelajaran pemrograman, elektronika, AI, dan pengembangan kreativitas teknologi.",
        },

        {
          title: "Internet of Things dan Robot",

          theory:
            "Robot modern dapat terhubung ke internet menggunakan teknologi IoT untuk komunikasi data dan pengendalian jarak jauh.",
        },

        {
          title: "Robot dan Otomasi Industri",

          theory:
            "Robot membantu otomatisasi industri dengan meningkatkan efisiensi, akurasi, dan produktivitas kerja.",
        },

        {
          title: "Keamanan Robotika",

          theory:
            "Keamanan robotika meliputi perlindungan sistem robot dari kesalahan program, gangguan jaringan, dan ancaman cyber security.",
        },

        {
          title: "Masa Depan Robotika",

          theory:
            "Masa depan robotika akan berkembang menuju autonomous system, smart robot, AI robotics, humanoid assistant, dan integrasi robot dalam kehidupan sehari-hari.",
        },
      ],
    });

    console.log("Database Robotics berhasil diisi");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
