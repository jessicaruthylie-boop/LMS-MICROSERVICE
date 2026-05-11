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
      category: "Internet",
    });

    await Course.create({
      title: "Internet",

      category: "Internet",

      description:
        "Course lengkap mengenai sejarah internet, jaringan global, web technology, protokol internet, keamanan internet, cloud system, dan perkembangan internet modern.",

      instructor: "Felix Jonathan",

      level: "Beginner",

      duration: "38 jam",

      rating: 4.8,

      students: 14200,

      language: "Indonesia",

      certificate: true,

      image: "internet-course.jpg",

      materials: [
        {
          title: "Pengertian Internet",

          theory:
            "Internet adalah jaringan komputer global yang menghubungkan jutaan perangkat di seluruh dunia untuk saling bertukar informasi dan data menggunakan protokol komunikasi tertentu. Internet memungkinkan pengguna mengakses website, email, media sosial, cloud computing, video streaming, dan berbagai layanan digital modern.",
        },

        {
          title: "Sejarah Internet",

          theory:
            "Perkembangan internet dimulai dari proyek ARPANET milik Departemen Pertahanan Amerika Serikat pada tahun 1960-an. Awalnya internet digunakan untuk kebutuhan militer dan penelitian, kemudian berkembang menjadi jaringan global yang digunakan oleh masyarakat umum.",
        },

        {
          title: "ARPANET",

          theory:
            "ARPANET merupakan cikal bakal internet modern yang dikembangkan untuk menghubungkan beberapa komputer dalam jaringan komunikasi data. Teknologi ini menjadi dasar perkembangan jaringan internet global.",
        },

        {
          title: "World Wide Web",

          theory:
            "World Wide Web atau WWW adalah layanan internet yang memungkinkan pengguna mengakses halaman web menggunakan browser. WWW dikembangkan oleh Tim Berners-Lee dan menjadi salah satu teknologi paling penting dalam perkembangan internet.",
        },

        {
          title: "Website dan Web Browser",

          theory:
            "Website adalah kumpulan halaman digital yang dapat diakses melalui internet menggunakan browser seperti Google Chrome, Mozilla Firefox, dan Microsoft Edge.",
        },

        {
          title: "Protokol TCP/IP",

          theory:
            "TCP/IP adalah protokol utama internet yang digunakan untuk komunikasi data antar perangkat jaringan. Protokol ini memungkinkan komputer saling bertukar data secara stabil dan terstruktur.",
        },

        {
          title: "IP Address",

          theory:
            "IP Address adalah alamat unik yang digunakan untuk mengidentifikasi perangkat dalam jaringan internet. Setiap perangkat yang terhubung ke internet memiliki IP Address tersendiri.",
        },

        {
          title: "DNS atau Domain Name System",

          theory:
            "DNS digunakan untuk menerjemahkan nama domain seperti google.com menjadi alamat IP sehingga website dapat diakses lebih mudah oleh pengguna.",
        },

        {
          title: "Server dan Client",

          theory:
            "Dalam internet terdapat konsep server dan client. Server menyediakan layanan atau data sedangkan client digunakan pengguna untuk mengakses layanan tersebut.",
        },

        {
          title: "Cloud Computing",

          theory:
            "Cloud computing memungkinkan penyimpanan data dan aplikasi dilakukan melalui internet menggunakan server cloud sehingga data dapat diakses dari mana saja.",
        },

        {
          title: "Internet of Things",

          theory:
            "Internet of Things atau IoT memungkinkan perangkat elektronik saling terhubung dan bertukar data melalui internet secara otomatis.",
        },

        {
          title: "Media Sosial",

          theory:
            "Media sosial merupakan platform internet yang memungkinkan pengguna berkomunikasi, berbagi informasi, foto, video, dan melakukan interaksi sosial secara online.",
        },

        {
          title: "Search Engine",

          theory:
            "Search engine seperti Google digunakan untuk mencari informasi di internet dengan cepat menggunakan teknologi indexing dan crawling.",
        },

        {
          title: "Video Streaming",

          theory:
            "Teknologi internet modern memungkinkan layanan video streaming seperti YouTube dan Netflix berjalan dengan kualitas tinggi secara real-time.",
        },

        {
          title: "Keamanan Internet",

          theory:
            "Keamanan internet meliputi perlindungan data dan sistem dari ancaman seperti hacking, malware, phishing, ransomware, dan pencurian data digital.",
        },

        {
          title: "Firewall dan Network Security",

          theory:
            "Firewall digunakan untuk melindungi jaringan internet dari akses tidak sah dan serangan cyber.",
        },

        {
          title: "VPN atau Virtual Private Network",

          theory:
            "VPN digunakan untuk membuat koneksi internet lebih aman dan privat dengan cara mengenkripsi lalu lintas data pengguna.",
        },

        {
          title: "Internet dalam Pendidikan",

          theory:
            "Internet membantu perkembangan pendidikan modern melalui e-learning, video conference, digital library, dan platform pembelajaran online.",
        },

        {
          title: "Internet dalam Bisnis",

          theory:
            "Internet digunakan dalam bisnis untuk e-commerce, digital marketing, cloud system, komunikasi online, dan manajemen data perusahaan.",
        },

        {
          title: "Masa Depan Internet",

          theory:
            "Internet masa depan akan berkembang menuju Artificial Intelligence, smart city, autonomous system, 5G, metaverse, dan konektivitas global yang lebih cepat dan aman.",
        },
      ],
    });

    console.log("Database Internet berhasil diisi");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
