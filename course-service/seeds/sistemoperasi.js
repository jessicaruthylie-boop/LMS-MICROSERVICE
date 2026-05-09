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
      category: "Operating System",
    });

    await Course.create({
      title: "Operating System",

      category: "Operating System",

      description:
        "Course lengkap mengenai konsep sistem operasi, manajemen proses, kernel, file system, Linux, Windows, virtualisasi, dan perkembangan operating system modern.",

      instructor: "Christina Aurelia",

      level: "Beginner",

      duration: "46 jam",

      rating: 4.9,

      students: 14800,

      language: "Indonesia",

      certificate: true,

      image: "operating-system-course.jpg",

      materials: [
        {
          title: "Pengertian Sistem Operasi",

          theory:
            "Sistem operasi atau Operating System adalah software utama yang mengatur seluruh aktivitas komputer dan menjadi penghubung antara hardware dengan pengguna. Sistem operasi bertugas mengelola proses, memori, file system, perangkat input-output, dan keamanan sistem komputer.",
        },

        {
          title: "Sejarah Sistem Operasi",

          theory:
            "Perkembangan sistem operasi dimulai dari sistem sederhana berbasis command line hingga sistem modern berbasis graphical user interface atau GUI. Sistem operasi berkembang seiring perkembangan hardware komputer.",
        },

        {
          title: "Fungsi Sistem Operasi",

          theory:
            "Sistem operasi memiliki fungsi utama seperti manajemen proses, manajemen memori, pengelolaan file, pengendalian perangkat keras, keamanan sistem, dan menyediakan antarmuka pengguna.",
        },

        {
          title: "Kernel Sistem Operasi",

          theory:
            "Kernel adalah inti utama sistem operasi yang bertugas mengatur komunikasi antara software dan hardware komputer.",
        },

        {
          title: "Manajemen Proses",

          theory:
            "Sistem operasi mengatur proses yang berjalan di komputer termasuk multitasking, scheduling, dan pengelolaan CPU.",
        },

        {
          title: "Manajemen Memori",

          theory:
            "Manajemen memori memungkinkan sistem operasi mengatur penggunaan RAM secara efisien agar aplikasi dapat berjalan dengan stabil.",
        },

        {
          title: "File System",

          theory:
            "File system digunakan untuk mengatur penyimpanan data di storage seperti harddisk dan SSD sehingga data dapat diakses dengan mudah.",
        },

        {
          title: "Input dan Output System",

          theory:
            "Sistem operasi mengatur komunikasi antara komputer dengan perangkat input-output seperti keyboard, mouse, printer, dan monitor.",
        },

        {
          title: "Sistem Operasi Windows",

          theory:
            "Windows adalah sistem operasi populer yang dikembangkan oleh Microsoft dan banyak digunakan pada komputer desktop maupun laptop.",
        },

        {
          title: "Sistem Operasi Linux",

          theory:
            "Linux adalah sistem operasi open source yang banyak digunakan pada server, networking, cloud computing, dan cyber security.",
        },

        {
          title: "Sistem Operasi macOS",

          theory:
            "macOS adalah sistem operasi yang dikembangkan Apple untuk perangkat Macintosh dengan fokus pada performa dan desain modern.",
        },

        {
          title: "Android Operating System",

          theory:
            "Android adalah sistem operasi mobile berbasis Linux yang digunakan pada smartphone dan tablet modern.",
        },

        {
          title: "iOS Operating System",

          theory:
            "iOS adalah sistem operasi mobile milik Apple yang digunakan pada iPhone dan iPad.",
        },

        {
          title: "Command Line Interface",

          theory:
            "CLI atau Command Line Interface memungkinkan pengguna mengontrol sistem komputer menggunakan perintah teks.",
        },

        {
          title: "Graphical User Interface",

          theory:
            "GUI atau Graphical User Interface memungkinkan pengguna berinteraksi dengan sistem operasi menggunakan tampilan grafis.",
        },

        {
          title: "Multitasking",

          theory:
            "Sistem operasi modern mendukung multitasking sehingga beberapa aplikasi dapat berjalan secara bersamaan.",
        },

        {
          title: "Virtualisasi Sistem Operasi",

          theory:
            "Virtualisasi memungkinkan beberapa sistem operasi berjalan dalam satu perangkat fisik menggunakan virtual machine.",
        },

        {
          title: "Keamanan Sistem Operasi",

          theory:
            "Keamanan sistem operasi meliputi authentication, authorization, firewall, antivirus, dan proteksi data pengguna.",
        },

        {
          title: "Open Source Operating System",

          theory:
            "Sistem operasi open source memungkinkan source code dapat dipelajari, dimodifikasi, dan dikembangkan oleh komunitas global.",
        },

        {
          title: "Masa Depan Sistem Operasi",

          theory:
            "Sistem operasi masa depan akan berkembang menuju cloud native system, AI integration, edge computing, automation, dan smart operating environment.",
        },
      ],
    });

    console.log("Database Operating System berhasil diisi");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
