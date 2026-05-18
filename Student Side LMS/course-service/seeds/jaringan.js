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
      category: "Networking",
    });

    await Course.create({
      title: "Networking",

      category: "Networking",

      description:
        "Course lengkap mengenai jaringan komputer, routing, switching, protokol jaringan, internet, wireless network, keamanan jaringan, dan teknologi networking modern.",

      instructor: "Septian Fernando",

      level: "Beginner",

      duration: "48 jam",

      rating: 4.9,

      students: 16500,

      language: "Indonesia",

      certificate: true,

      image: "networking-course.jpg",

      materials: [
        {
          title: "Pengertian Jaringan Komputer",

          theory:
            "Jaringan komputer adalah sistem yang menghubungkan beberapa perangkat komputer agar dapat saling berkomunikasi, berbagi data, berbagi sumber daya, dan bertukar informasi menggunakan media kabel maupun wireless.",
        },

        {
          title: "Sejarah Jaringan Komputer",

          theory:
            "Perkembangan jaringan komputer dimulai dari kebutuhan komunikasi data antar komputer hingga berkembang menjadi internet global yang menghubungkan miliaran perangkat di seluruh dunia.",
        },

        {
          title: "Jenis Jaringan Komputer",

          theory:
            "Jaringan komputer dibagi menjadi beberapa jenis seperti LAN, MAN, WAN, PAN, dan internet berdasarkan cakupan area dan penggunaannya.",
        },

        {
          title: "Local Area Network",

          theory:
            "LAN atau Local Area Network adalah jaringan komputer dalam area kecil seperti sekolah, rumah, kantor, dan laboratorium komputer.",
        },

        {
          title: "Wide Area Network",

          theory:
            "WAN atau Wide Area Network adalah jaringan yang mencakup wilayah luas dan menghubungkan beberapa jaringan LAN di lokasi berbeda.",
        },

        {
          title: "Internet",

          theory:
            "Internet adalah jaringan global yang menghubungkan berbagai perangkat di seluruh dunia menggunakan protokol TCP/IP.",
        },

        {
          title: "Topologi Jaringan",

          theory:
            "Topologi jaringan adalah bentuk atau struktur hubungan antar perangkat jaringan seperti topologi star, bus, ring, mesh, dan tree.",
        },

        {
          title: "Perangkat Jaringan",

          theory:
            "Perangkat jaringan meliputi router, switch, hub, access point, modem, firewall, dan server yang digunakan untuk membangun komunikasi data.",
        },

        {
          title: "Router",

          theory:
            "Router digunakan untuk menghubungkan beberapa jaringan dan menentukan jalur terbaik dalam pengiriman data.",
        },

        {
          title: "Switch",

          theory:
            "Switch digunakan untuk menghubungkan perangkat dalam satu jaringan LAN dan mengatur lalu lintas data secara efisien.",
        },

        {
          title: "IP Address",

          theory:
            "IP Address adalah alamat unik yang digunakan untuk mengidentifikasi perangkat dalam jaringan komputer.",
        },

        {
          title: "Subnetting",

          theory:
            "Subnetting digunakan untuk membagi jaringan menjadi beberapa subnet agar penggunaan IP Address menjadi lebih efisien.",
        },

        {
          title: "Protokol TCP/IP",

          theory:
            "TCP/IP adalah protokol utama yang digunakan dalam komunikasi jaringan internet modern.",
        },

        {
          title: "OSI Layer",

          theory:
            "Model OSI terdiri dari tujuh layer yang menjelaskan proses komunikasi data dalam jaringan komputer.",
        },

        {
          title: "DNS atau Domain Name System",

          theory:
            "DNS digunakan untuk menerjemahkan nama domain menjadi IP Address sehingga website dapat diakses dengan mudah.",
        },

        {
          title: "Wireless Network",

          theory:
            "Wireless network memungkinkan perangkat terhubung tanpa kabel menggunakan teknologi WiFi dan radio frequency.",
        },

        {
          title: "Fiber Optic",

          theory:
            "Fiber optic adalah media transmisi data menggunakan cahaya yang memiliki kecepatan tinggi dan stabil.",
        },

        {
          title: "Keamanan Jaringan",

          theory:
            "Keamanan jaringan meliputi perlindungan sistem dan data dari serangan cyber seperti hacking, malware, sniffing, dan unauthorized access.",
        },

        {
          title: "Firewall",

          theory:
            "Firewall digunakan untuk mengontrol lalu lintas jaringan dan melindungi sistem dari akses tidak sah.",
        },

        {
          title: "VPN atau Virtual Private Network",

          theory:
            "VPN digunakan untuk membuat koneksi jaringan lebih aman dengan mengenkripsi data komunikasi.",
        },

        {
          title: "Cloud Networking",

          theory:
            "Cloud networking memungkinkan layanan jaringan dijalankan melalui cloud computing sehingga lebih fleksibel dan scalable.",
        },

        {
          title: "MPLS Technology",

          theory:
            "MPLS atau Multi Protocol Label Switching digunakan untuk meningkatkan efisiensi routing dan kualitas layanan jaringan.",
        },

        {
          title: "Software Defined Network",

          theory:
            "SDN memungkinkan pengelolaan jaringan dilakukan secara terpusat menggunakan software controller.",
        },

        {
          title: "Internet of Things",

          theory:
            "IoT memungkinkan berbagai perangkat elektronik saling terhubung dan bertukar data melalui jaringan internet.",
        },

        {
          title: "Masa Depan Teknologi Jaringan",

          theory:
            "Teknologi jaringan masa depan akan berkembang menuju 5G, AI networking, edge computing, smart city, cloud infrastructure, dan autonomous network.",
        },
      ],
    });

    console.log("Database Networking berhasil diisi");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
