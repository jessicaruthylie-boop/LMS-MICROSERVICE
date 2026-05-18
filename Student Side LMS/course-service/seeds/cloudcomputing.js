const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,

  category: String,

  description: String,

  instructor: String,

  language: String,

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
      category: "Cloud Computing",
    });

    await Course.create({
      title: "Cloud Computing",

      category: "Cloud Computing",

      description:
        "Course lengkap mengenai konsep cloud computing, virtualisasi, container, cloud platform, DevOps, distributed system, dan teknologi cloud modern.",

      instructor: "Amos Barimbing",

      image: "cloud-computing-course.jpg",

      materials: [
        {
          title: "Pengertian Cloud Computing",

          theory:
            "Cloud Computing adalah teknologi yang memungkinkan penyimpanan data, pengelolaan aplikasi, server, database, dan layanan komputasi lainnya diakses melalui internet tanpa harus bergantung pada perangkat lokal. Cloud computing membuat sistem menjadi lebih fleksibel, scalable, dan efisien.",
        },

        {
          title: "Sejarah Cloud Computing",

          theory:
            "Konsep cloud computing berkembang dari teknologi jaringan komputer dan virtualisasi server. Perkembangan internet berkecepatan tinggi membuat cloud computing menjadi solusi utama dalam infrastruktur digital modern.",
        },

        {
          title: "Cara Kerja Cloud Computing",

          theory:
            "Cloud computing bekerja menggunakan server-server virtual yang terhubung melalui internet. Pengguna dapat mengakses layanan cloud dari mana saja menggunakan perangkat yang terhubung ke jaringan internet.",
        },

        {
          title: "Virtualisasi",

          theory:
            "Virtualisasi adalah teknologi yang memungkinkan satu perangkat keras menjalankan beberapa sistem virtual secara bersamaan. Teknologi ini menjadi dasar utama dalam cloud computing.",
        },

        {
          title: "Jenis Cloud Computing",

          theory:
            "Cloud computing dibagi menjadi beberapa jenis seperti public cloud, private cloud, hybrid cloud, dan multi-cloud. Setiap jenis memiliki kelebihan dan penggunaan yang berbeda.",
        },

        {
          title: "Infrastructure as a Service",

          theory:
            "Infrastructure as a Service atau IaaS menyediakan layanan infrastruktur virtual seperti server, storage, dan networking melalui internet.",
        },

        {
          title: "Platform as a Service",

          theory:
            "Platform as a Service atau PaaS menyediakan platform untuk pengembangan aplikasi tanpa harus mengelola server secara langsung.",
        },

        {
          title: "Software as a Service",

          theory:
            "Software as a Service atau SaaS menyediakan aplikasi yang dapat digunakan langsung melalui internet tanpa perlu instalasi lokal.",
        },

        {
          title: "Amazon Web Services",

          theory:
            "Amazon Web Services atau AWS adalah platform cloud terbesar yang menyediakan berbagai layanan seperti virtual server, database, storage, networking, dan Artificial Intelligence.",
        },

        {
          title: "Google Cloud Platform",

          theory:
            "Google Cloud Platform menyediakan layanan cloud modern untuk pengembangan aplikasi, data analytics, machine learning, dan distributed computing.",
        },

        {
          title: "Microsoft Azure",

          theory:
            "Microsoft Azure adalah layanan cloud dari Microsoft yang digunakan untuk virtual machine, database, AI service, networking, dan enterprise computing.",
        },

        {
          title: "Container dan Docker",

          theory:
            "Docker adalah teknologi container yang memungkinkan aplikasi dijalankan secara ringan dan konsisten di berbagai lingkungan sistem.",
        },

        {
          title: "Kubernetes",

          theory:
            "Kubernetes digunakan untuk mengelola container secara otomatis dalam skala besar sehingga aplikasi cloud menjadi lebih stabil dan scalable.",
        },

        {
          title: "Distributed System",

          theory:
            "Cloud computing menggunakan konsep distributed system di mana data dan layanan tersebar di banyak server untuk meningkatkan performa dan keandalan sistem.",
        },

        {
          title: "Cloud Storage",

          theory:
            "Cloud storage memungkinkan pengguna menyimpan data di internet sehingga dapat diakses kapan saja dan dari perangkat mana saja.",
        },

        {
          title: "DevOps dan CI/CD",

          theory:
            "Cloud computing mendukung DevOps dan CI/CD pipeline untuk mempercepat proses pengembangan, testing, dan deployment aplikasi.",
        },

        {
          title: "Keamanan Cloud Computing",

          theory:
            "Keamanan cloud computing meliputi encryption, firewall, authentication, backup system, dan monitoring untuk melindungi data dan aplikasi cloud.",
        },

        {
          title: "Cloud dalam Bisnis",

          theory:
            "Cloud computing digunakan perusahaan untuk meningkatkan efisiensi operasional, fleksibilitas sistem, dan mengurangi biaya infrastruktur IT.",
        },

        {
          title: "Cloud dan Artificial Intelligence",

          theory:
            "Cloud computing mendukung Artificial Intelligence dengan menyediakan resource komputasi besar untuk machine learning, big data, dan AI training.",
        },

        {
          title: "Masa Depan Cloud Computing",

          theory:
            "Cloud computing akan terus berkembang menuju edge computing, serverless architecture, AI cloud service, quantum cloud, dan smart infrastructure modern.",
        },
      ],
    });

    console.log("Database Cloud Computing berhasil diisi");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
