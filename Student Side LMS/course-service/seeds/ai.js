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
      category: "AI",
    });

    await Course.create({
      title: "Artificial Intelligence",

      category: "AI",

      description:
        "Course lengkap mengenai Artificial Intelligence, Machine Learning, Deep Learning, Neural Network, Computer Vision, hingga perkembangan AI modern.",

      instructor: "Septian Hutasoit",

      language: "Indonesia",

      image: "ai-course.jpg",

      materials: [
        {
          title: "Pengertian Artificial Intelligence",

          theory:
            "Artificial Intelligence atau AI adalah teknologi yang memungkinkan komputer dan mesin meniru kemampuan manusia seperti belajar, berpikir, memahami data, mengenali pola, mengambil keputusan, dan menyelesaikan masalah secara otomatis. AI menjadi salah satu teknologi paling berkembang di era modern dan digunakan di berbagai bidang seperti kesehatan, pendidikan, industri, bisnis, keamanan, dan hiburan.",
        },

        {
          title: "Sejarah Artificial Intelligence",

          theory:
            "Perkembangan Artificial Intelligence dimulai pada tahun 1950-an ketika ilmuwan mulai mencoba membuat mesin yang dapat berpikir seperti manusia. Istilah Artificial Intelligence pertama kali diperkenalkan oleh John McCarthy pada tahun 1956. Sejak saat itu AI terus berkembang mulai dari sistem sederhana hingga teknologi modern seperti machine learning dan generative AI.",
        },

        {
          title: "Konsep Dasar AI",

          theory:
            "AI bekerja menggunakan data, algoritma, dan model matematika untuk mempelajari pola dan membuat prediksi. Semakin banyak data yang dipelajari maka semakin baik kemampuan AI dalam menghasilkan keputusan yang akurat.",
        },

        {
          title: "Machine Learning",

          theory:
            "Machine Learning adalah cabang AI yang memungkinkan komputer belajar dari data tanpa diprogram secara langsung. Machine Learning digunakan untuk prediksi, rekomendasi, analisis data, dan otomatisasi sistem modern.",
        },

        {
          title: "Deep Learning",

          theory:
            "Deep Learning merupakan bagian dari Machine Learning yang menggunakan Neural Network dengan banyak layer untuk memproses data kompleks. Teknologi ini digunakan dalam pengenalan wajah, speech recognition, chatbot, dan autonomous vehicle.",
        },

        {
          title: "Neural Network",

          theory:
            "Neural Network adalah model komputasi yang terinspirasi dari cara kerja otak manusia. Neural Network terdiri dari neuron-neuron buatan yang saling terhubung untuk memproses informasi dan mempelajari pola data.",
        },

        {
          title: "Computer Vision",

          theory:
            "Computer Vision memungkinkan komputer memahami dan menganalisis gambar atau video secara otomatis. Teknologi ini digunakan dalam facial recognition, medical imaging, autonomous vehicle, dan keamanan digital.",
        },

        {
          title: "Natural Language Processing",

          theory:
            "Natural Language Processing atau NLP memungkinkan komputer memahami dan memproses bahasa manusia. NLP digunakan dalam chatbot, translation system, voice assistant, dan sentiment analysis.",
        },

        {
          title: "Robotics AI",

          theory:
            "AI dalam robotika memungkinkan robot melakukan tugas otomatis secara cerdas. Teknologi ini digunakan pada robot industri, drone, autonomous robot, dan smart manufacturing.",
        },

        {
          title: "Generative AI",

          theory:
            "Generative AI adalah teknologi AI yang mampu menghasilkan teks, gambar, audio, video, dan kode program secara otomatis berdasarkan data yang dipelajari sebelumnya.",
        },

        {
          title: "ChatGPT dan Large Language Model",

          theory:
            "Large Language Model atau LLM adalah model AI besar yang dilatih menggunakan miliaran data teks untuk memahami dan menghasilkan bahasa manusia. ChatGPT merupakan salah satu contoh teknologi LLM modern.",
        },

        {
          title: "AI dalam Pendidikan",

          theory:
            "Artificial Intelligence digunakan dalam pendidikan untuk personalisasi pembelajaran, analisis performa siswa, chatbot edukasi, dan sistem e-learning modern.",
        },

        {
          title: "AI dalam Kesehatan",

          theory:
            "AI digunakan dalam bidang kesehatan untuk diagnosis penyakit, analisis data medis, robot bedah, pengembangan obat, dan monitoring pasien.",
        },

        {
          title: "AI dalam Industri",

          theory:
            "Di bidang industri, AI digunakan untuk otomatisasi pabrik, predictive maintenance, quality control, supply chain management, dan analisis produksi.",
        },

        {
          title: "AI dalam Cyber Security",

          theory:
            "AI digunakan dalam cyber security untuk mendeteksi ancaman digital, analisis malware, deteksi anomali jaringan, dan perlindungan sistem keamanan modern.",
        },

        {
          title: "Big Data dan AI",

          theory:
            "Big Data menyediakan data dalam jumlah besar yang digunakan AI untuk melakukan pembelajaran dan analisis. Semakin besar data yang dipelajari maka semakin baik kemampuan AI.",
        },

        {
          title: "Cloud AI",

          theory:
            "Cloud AI memungkinkan teknologi Artificial Intelligence dijalankan melalui cloud computing sehingga lebih fleksibel, scalable, dan mudah diakses.",
        },

        {
          title: "AI dan Otomatisasi",

          theory:
            "Artificial Intelligence mendorong otomatisasi di berbagai bidang sehingga banyak pekerjaan dapat dilakukan secara otomatis dengan bantuan sistem cerdas.",
        },

        {
          title: "Etika Artificial Intelligence",

          theory:
            "Pengembangan AI harus memperhatikan etika seperti privasi data, keamanan, bias algoritma, transparansi sistem, dan dampak sosial terhadap manusia.",
        },

        {
          title: "Masa Depan Artificial Intelligence",

          theory:
            "Masa depan Artificial Intelligence diperkirakan akan terus berkembang dalam bidang autonomous system, smart city, robotics, healthcare, education, dan teknologi digital lainnya. AI akan menjadi bagian penting dalam kehidupan manusia modern.",
        },
      ],
    });

    console.log("Database AI berhasil diisi");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
