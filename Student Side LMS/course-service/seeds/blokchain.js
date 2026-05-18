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

    await Course.create({
      title: "Blockchain",

      category: "Blockchain",

      description:
        "Course lengkap mengenai teknologi Blockchain, Cryptocurrency, Smart Contract, Web3, NFT, dan masa depan teknologi blockchain modern.",

      instructor: "Okto Sinaga",

      level: "Beginner",

      duration: "42 jam",

      rating: 4.8,

      students: 11200,

      language: "Indonesia",

      certificate: true,

      image: "blockchain-course.jpg",

      materials: [
        {
          title: "Pengertian Blockchain",

          theory:
            "Blockchain adalah teknologi penyimpanan data digital yang disusun dalam bentuk blok-blok yang saling terhubung menggunakan kriptografi. Setiap blok berisi data transaksi yang aman dan tidak mudah diubah. Blockchain bersifat decentralized atau terdistribusi sehingga data tidak disimpan di satu server pusat melainkan tersebar di banyak komputer dalam jaringan.",
        },

        {
          title: "Sejarah Blockchain",

          theory:
            "Teknologi Blockchain mulai dikenal luas sejak kemunculan Bitcoin pada tahun 2009 yang dikembangkan oleh Satoshi Nakamoto. Awalnya blockchain digunakan untuk sistem cryptocurrency, namun saat ini teknologi blockchain berkembang ke berbagai bidang seperti keuangan, supply chain, kesehatan, dan smart contract.",
        },

        {
          title: "Cara Kerja Blockchain",

          theory:
            "Blockchain bekerja dengan mencatat transaksi ke dalam blok data. Setiap blok memiliki hash unik dan terhubung dengan blok sebelumnya sehingga membentuk rantai data yang aman. Ketika ada transaksi baru, seluruh jaringan akan melakukan verifikasi sebelum data ditambahkan ke blockchain.",
        },

        {
          title: "Desentralisasi",

          theory:
            "Salah satu keunggulan blockchain adalah desentralisasi, yaitu data tidak dikendalikan oleh satu pihak saja. Semua node dalam jaringan memiliki salinan data yang sama sehingga sistem menjadi lebih aman dan transparan.",
        },

        {
          title: "Cryptography dalam Blockchain",

          theory:
            "Blockchain menggunakan teknologi cryptography untuk menjaga keamanan data. Hash function dan digital signature digunakan agar data transaksi tidak mudah dimanipulasi dan identitas pengguna tetap aman.",
        },

        {
          title: "Bitcoin dan Cryptocurrency",

          theory:
            "Bitcoin merupakan cryptocurrency pertama yang menggunakan teknologi blockchain. Cryptocurrency adalah mata uang digital yang digunakan untuk transaksi online tanpa melibatkan bank atau pihak ketiga.",
        },

        {
          title: "Ethereum",

          theory:
            "Ethereum adalah platform blockchain yang mendukung smart contract dan decentralized application atau DApps. Ethereum menjadi salah satu blockchain paling populer setelah Bitcoin.",
        },

        {
          title: "Smart Contract",

          theory:
            "Smart contract adalah program otomatis yang berjalan di dalam blockchain. Smart contract memungkinkan transaksi dilakukan secara otomatis sesuai aturan yang telah ditentukan tanpa memerlukan perantara.",
        },

        {
          title: "NFT atau Non-Fungible Token",

          theory:
            "NFT adalah aset digital unik yang disimpan di blockchain. NFT digunakan untuk kepemilikan karya digital seperti gambar, musik, video, dan item game.",
        },

        {
          title: "Web3",

          theory:
            "Web3 merupakan konsep internet masa depan yang dibangun menggunakan teknologi blockchain. Web3 memungkinkan pengguna memiliki kontrol lebih besar terhadap data dan aset digital mereka.",
        },

        {
          title: "Mining Cryptocurrency",

          theory:
            "Mining adalah proses validasi transaksi blockchain menggunakan kemampuan komputasi komputer. Miner mendapatkan reward berupa cryptocurrency setelah berhasil memvalidasi transaksi.",
        },

        {
          title: "Consensus Mechanism",

          theory:
            "Consensus mechanism digunakan untuk memastikan seluruh node dalam jaringan blockchain menyetujui transaksi yang valid. Contoh mekanisme konsensus adalah Proof of Work dan Proof of Stake.",
        },

        {
          title: "Keamanan Blockchain",

          theory:
            "Blockchain dikenal memiliki tingkat keamanan tinggi karena menggunakan cryptography dan sistem distributed ledger. Data yang sudah masuk ke blockchain sangat sulit diubah atau dihapus.",
        },

        {
          title: "Blockchain dalam Keuangan",

          theory:
            "Blockchain digunakan dalam sektor keuangan untuk transaksi digital, pembayaran internasional, decentralized finance, dan sistem perbankan modern.",
        },

        {
          title: "Decentralized Finance",

          theory:
            "Decentralized Finance atau DeFi adalah layanan keuangan berbasis blockchain yang memungkinkan pengguna melakukan transaksi tanpa bank atau lembaga keuangan tradisional.",
        },

        {
          title: "Blockchain dalam Supply Chain",

          theory:
            "Blockchain digunakan dalam supply chain management untuk melacak distribusi barang secara transparan dan aman sehingga meningkatkan efisiensi dan kepercayaan.",
        },

        {
          title: "Blockchain dan Cyber Security",

          theory:
            "Teknologi blockchain membantu meningkatkan keamanan digital karena data transaksi terenkripsi dan sulit dimanipulasi oleh pihak tidak bertanggung jawab.",
        },

        {
          title: "Kelebihan Blockchain",

          theory:
            "Kelebihan blockchain meliputi transparansi, keamanan tinggi, desentralisasi, efisiensi transaksi, dan mengurangi kebutuhan pihak ketiga dalam proses transaksi digital.",
        },

        {
          title: "Kekurangan Blockchain",

          theory:
            "Blockchain memiliki beberapa kekurangan seperti konsumsi energi tinggi, skalabilitas terbatas, biaya transaksi tertentu, dan regulasi yang masih berkembang.",
        },

        {
          title: "Masa Depan Blockchain",

          theory:
            "Teknologi blockchain diperkirakan akan terus berkembang di bidang keuangan, pendidikan, kesehatan, pemerintahan, smart city, Internet of Things, dan berbagai layanan digital modern lainnya.",
        },
      ],
    });

    console.log("Database Blockchain berhasil diisi");

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

run();
