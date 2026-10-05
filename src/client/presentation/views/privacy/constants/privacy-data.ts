export interface PrivacySection {
  id: string;
  number: string;
  title: string;
  iconName: string;
  summary: string;
  points: {
    subtitle?: string;
    description: string;
    bulletList?: string[];
  }[];
  alertBox?: {
    type: "info" | "warning" | "success";
    text: string;
  };
}

export interface PrivacyDataContent {
  pageTitle: string;
  tagline: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  overviewHeading: string;
  overviewDescription: string;
  pillars: {
    title: string;
    desc: string;
    icon: string;
  }[];
  sections: PrivacySection[];
  deletionHeading: string;
  deletionDescription: string;
  contactHeading: string;
  contactDescription: string;
  contactEmail: string;
  contactDeveloper: string;
  closingNote: string;
}

export const PRIVACY_DATA: Record<"id" | "en" | "zh", PrivacyDataContent> = {
  id: {
    pageTitle: "Kebijakan Privasi Qur'an Ku",
    tagline: "Perlindungan Data Pribadi & Privasi Ibadah Anda Adalah Prioritas Kami",
    effectiveDate: "1 Januari 2026",
    lastUpdated: "5 Oktober 2026",
    version: "v2.0.0",
    overviewHeading: "Komitmen Privasi Excitech",
    overviewDescription:
      "Kami di Excitech berkomitmen penuh untuk melindungi privasi dan keamanan data pribadi Anda saat menggunakan aplikasi mobile dan website Qur'an Ku. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi Anda dengan mematuhi Undang-Undang Perlindungan Data Pribadi (UU No. 27/2022) serta standar privasi global.",
    pillars: [
      {
        title: "Tanpa Penjualan Data",
        desc: "Kami tidak pernah dan tidak akan pernah menjual atau menyewakan data Anda kepada pihak ketiga pengiklan mana pun.",
        icon: "ShieldBan",
      },
      {
        title: "Enkripsi Berlapis",
        desc: "Seluruh transmisi data dilindungi dengan enkripsi SSL/HTTPS dan penyimpanan cloud aman bersertifikasi.",
        icon: "Lock",
      },
      {
        title: "Google Families Safe",
        desc: "Dirancang ramah keluarga, bebas dari konten berbahaya, dan mematuhi kebijakan Google Play Families.",
        icon: "HeartHandshake",
      },
      {
        title: "Kontrol Penuh Pengguna",
        desc: "Anda memiliki hak mutlak untuk melihat, menyunting, mencadangkan, atau menghapus data akun Anda kapan saja.",
        icon: "UserCheck",
      },
    ],
    sections: [
      {
        id: "data-yang-dikumpulkan",
        number: "01",
        title: "Data yang Kami Kumpulkan",
        iconName: "Database",
        summary: "Rincian informasi yang dikumpulkan secara terbatas untuk menunjang fungsionalitas aplikasi.",
        points: [
          {
            subtitle: "1. Data Akun Pengguna (Opsional)",
            description:
              "Ketika Anda masuk menggunakan Google Sign-In, kami menerima informasi dasar berupa Nama Lengkap, Alamat Email, dan Foto Profil publik dari akun Google Anda untuk personalisasi akun dan sinkronisasi bookmark.",
          },
          {
            subtitle: "2. Data Aktivitas Ibadah & Preferensi",
            description:
              "Data ayat terakhir dibaca (last read), daftar surah/ayat favorit (bookmark), koleksi doa tersimpan, catatan pribadi, dan preferensi pengaturan (mode tema gelap/terang, ukuran font teks Arab).",
          },
          {
            subtitle: "3. Data Lokasi Perangkat (Hanya Lokal)",
            description:
              "Koordinat GPS atau lokasi kota hanya diakses secara real-time di perangkat untuk menghitung jadwal shalat yang akurat dan kompas arah kiblat. Data koordinat lokasi Anda TIDAK disimpan atau dilacak di server kami.",
          },
          {
            subtitle: "4. Data Teknis & Diagnostik",
            description:
              "Informasi tipe perangkat, versi sistem operasi (Android/iOS), dan laporan crash anonim (Firebase Crashlytics) untuk perbaikan bug dan peningkatan kestabilan aplikasi.",
          },
        ],
        alertBox: {
          type: "success",
          text: "Anda tetap dapat menggunakan aplikasi Qur'an Ku secara anonim untuk membaca Al-Quran dan mendengarkan murotal tanpa perlu melakukan login.",
        },
      },
      {
        id: "penggunaan-izin",
        number: "02",
        title: "Penggunaan Izin Perangkat (Device Permissions)",
        iconName: "Sliders",
        summary: "Penjelasan transparan mengenai alasan dan batasan izin sistem yang diminta oleh aplikasi.",
        points: [
          {
            subtitle: "Izin Notifikasi (POST_NOTIFICATIONS)",
            description:
              "Digunakan untuk mengirimkan pengingat jadwal shalat/azan tepat waktu, rekomendasi ayat pilihan harian, dan notifikasi pembaruan aplikasi. Izin ini dapat dinonaktifkan kapan saja.",
          },
          {
            subtitle: "Izin Penyimpanan & Galeri (Storage / Photos)",
            description:
              "Hanya digunakan saat Anda memilih untuk menyimpan kartu kutipan ayat atau ekspor doa favorit dalam bentuk gambar ke galeri perangkat Anda. Aplikasi TIDAK PERNAH membaca atau mengunggah foto pribadi yang ada di ponsel Anda.",
          },
          {
            subtitle: "Izin Akses Internet (INTERNET & ACCESS_NETWORK_STATE)",
            description:
              "Digunakan untuk streaming audio murotal dari qari dunia, mengunduh data tafsir/terjemahan resmi Kemenag RI, serta memeriksa status konektivitas jaringan.",
          },
          {
            subtitle: "Izin Lokasi (ACCESS_COARSE_LOCATION / ACCESS_FINE_LOCATION)",
            description:
              "Hanya digunakan untuk penentuan waktu shalat berbasis garis lintang/bujur dan perhitungan arah kiblat berbasis sensor kompas.",
          },
        ],
      },
      {
        id: "tujuan-pemrosesan",
        number: "03",
        title: "Tujuan Pemrosesan Data",
        iconName: "Layers",
        summary: "Bagaimana kami memanfaatkan informasi yang terkumpul semata-mata untuk pelayanan ibadah terbaik.",
        points: [
          {
            description: "Kami hanya memproses data Anda untuk tujuan-tujuan yang sah berikut:",
            bulletList: [
              "Menyediakan fitur tilawah Al-Quran, audio murotal, jadwal shalat, kiblat, dan doa harian yang lancar.",
              "Menyinkronkan penanda bacaan (bookmark) dan riwayat antar perangkat ketika Anda login.",
              "Mengirimkan pemberitahuan waktu ibadah dan pengingat tilawah sesuai pengaturan yang Anda pilih.",
              "Mendiagnosis kendala teknis dan meningkatkan performa serta kenyamanan antarmuka pengguna.",
              "Memastikan keamanan sistem dan mencegah penyalahgunaan layanan.",
            ],
          },
        ],
      },
      {
        id: "keamanan-penyimpanan",
        number: "04",
        title: "Keamanan & Penyimpanan Data",
        iconName: "Lock",
        summary: "Langkah-langkah teknis dan organisasional kami untuk melindungi kerahasiaan data Anda.",
        points: [
          {
            description:
              "Kami menerapkan standar keamanan industri modern guna melindungi data pribadi Anda dari akses tidak sah, kebocoran, atau perubahan tanpa izin.",
            bulletList: [
              "Protokol komunikasi terenkripsi SSL/TLS (HTTPS) untuk seluruh pertukaran data jaringan.",
              "Penyimpanan cloud aman berstandar ISO/IEC 27001 melalui infrastruktur Google Cloud & Firebase.",
              "Penyimpanan lokal dienkripsi pada memori perangkat pengguna (Secure Local Storage).",
              "Akses administratif ke database dibatasi secara ketat hanya untuk personel yang berwenang.",
            ],
          },
        ],
        alertBox: {
          type: "info",
          text: "Kami tidak pernah menyimpan informasi sensitif seperti password Google atau detail pembayaran perbankan di server kami.",
        },
      },
      {
        id: "pihak-ketiga",
        number: "05",
        title: "Penyedia Layanan Pihak Ketiga",
        iconName: "Share2",
        summary: "Layanan pihak ketiga tepercaya yang kami gunakan untuk mendukung operasional aplikasi.",
        points: [
          {
            description:
              "Untuk mengoptimalkan layanan, kami bekerja sama dengan penyedia teknologi global tepercaya yang memiliki standar privasi ketat:",
            bulletList: [
              "Google Firebase: Otentikasi aman (Google Sign-In), basis data Firestore, dan analisis crash (Crashlytics).",
              "Kementerian Agama RI & Al-Quran Cloud API: Sumber data mushaf teks Al-Quran dan jadwal shalat terverifikasi.",
              "Content Delivery Network (CDN): Distribusi audio murotal berkualitas tinggi dari arsip terbuka tepercaya.",
            ],
          },
        ],
      },
      {
        id: "privasi-anak",
        number: "06",
        title: "Privasi Anak & Kebijakan Keluarga Google Play",
        iconName: "HeartHandshake",
        summary: "Perlindungan khusus bagi pengguna di bawah umur dan lingkungan ramah anak.",
        points: [
          {
            description:
              "Qur'an Ku dirancang agar aman bagi pengguna dari segala usia, termasuk anak-anak dan keluarga. Kami sepenuhnya mematuhi Kebijakan Keluarga Google Play (Families Policy).",
            bulletList: [
              "Kami tidak mengumpulkan informasi pribadi anak-anak tanpa sepengetahuan orang tua/wali.",
              "Aplikasi ini bebas dari iklan yang menargetkan profil anak atau konten dewasa.",
              "Seluruh konten ayat, doa, dan audio bernilai edukatif dan spiritual yang positif.",
            ],
          },
        ],
        alertBox: {
          type: "warning",
          text: "Orang tua atau wali berhak memeriksa atau meminta penghapusan data anak mereka kapan saja dengan menghubungi tim kami.",
        },
      },
      {
        id: "hak-pengguna",
        number: "07",
        title: "Hak Pengguna atas Data Pribadi",
        iconName: "UserCheck",
        summary: "Ketahui hak Anda untuk mengakses, memperbarui, mencadangkan, atau menghapus data.",
        points: [
          {
            description:
              "Sesuai dengan regulasi perlindungan data pribadi, Anda memiliki hak-hak berikut:",
            bulletList: [
              "Hak Akses: Meminta salinan data pribadi yang kami simpan tentang Anda.",
              "Hak Koreksi: Memperbarui atau membetulkan data profil yang tidak akurat.",
              "Hak Penghapusan (Right to Erasure): Meminta penghapusan permanen akun dan seluruh data terkait.",
              "Hak Pembatasan: Menolak atau menonaktifkan notifikasi dan sinkronisasi cloud kapan saja.",
            ],
          },
        ],
      },
      {
        id: "penghapusan-akun",
        number: "08",
        title: "Penghapusan Akun & Data (Account Deletion)",
        iconName: "Trash2",
        summary: "Mekanisme mandiri dan mudah untuk menghapus akun Anda secara permanen.",
        points: [
          {
            description:
              "Jika Anda ingin menghapus akun Qur'an Ku beserta seluruh data bookmark dan preferensi cloud secara permanen, Anda dapat:",
            bulletList: [
              "Melalui Aplikasi: Buka menu Profil > Pengaturan Akun > Hapus Akun Saya.",
              "Melalui Email: Kirim permohonan ke support@excitech.id dengan subjek 'Permohonan Penghapusan Akun Qur'an Ku' dari alamat email yang terdaftar.",
            ],
          },
          {
            description:
              "Setelah permohonan diverifikasi, seluruh data pribadi Anda akan dihapus secara permanen dari server database kami dalam waktu maksimal 7 hari kerja.",
          },
        ],
      },
      {
        id: "perubahan-kebijakan",
        number: "09",
        title: "Perubahan Kebijakan Privasi",
        iconName: "Clock",
        summary: "Pemberitahuan transparan terkait revisi atau penyempurnaan kebijakan ini di masa mendatang.",
        points: [
          {
            description:
              "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk mencerminkan perubahan fitur aplikasi atau kepatuhan terhadap regulasi baru. Kami akan mencantumkan tanggal 'Pembaruan Terakhir' di bagian atas halaman ini.",
          },
        ],
      },
    ],
    deletionHeading: "Permohonan Penghapusan Data",
    deletionDescription:
      "Kami menghormati privasi Anda. Anda dapat meminta penghapusan akun dan data terkait kapan saja dengan proses cepat dan tanpa syarat rumit.",
    contactHeading: "Pertanyaan atau Laporan Privasi?",
    contactDescription:
      "Petugas Perlindungan Data Excitech siap melayani pertanyaan, masukan, atau permohonan terkait data pribadi Anda.",
    contactEmail: "support@excitech.id",
    contactDeveloper: "Excitech Software & Digital Solution",
    closingNote:
      "Dengan menggunakan aplikasi atau website Qur'an Ku, Anda menyetujui pengumpulan dan penggunaan data sesuai dengan Kebijakan Privasi ini.",
  },
  en: {
    pageTitle: "Qur'an Ku Privacy Policy",
    tagline: "Your Personal Data Protection & Spiritual Privacy Is Our Utmost Priority",
    effectiveDate: "January 1, 2026",
    lastUpdated: "October 5, 2026",
    version: "v2.0.0",
    overviewHeading: "Excitech Privacy Commitment",
    overviewDescription:
      "At Excitech, we are fully committed to safeguarding your privacy and personal data when you use the Qur'an Ku mobile app and website. This Privacy Policy details how we handle, store, and protect your information transparently in compliance with global data protection standards.",
    pillars: [
      {
        title: "No Data Selling",
        desc: "We never sell, rent, or trade your personal information to any third-party advertisers.",
        icon: "ShieldBan",
      },
      {
        title: "End-to-End Encryption",
        desc: "All network communication is protected with SSL/TLS encryption and certified cloud storage.",
        icon: "Lock",
      },
      {
        title: "Google Families Safe",
        desc: "Family-friendly by design, strictly adhering to Google Play Families policies.",
        icon: "HeartHandshake",
      },
      {
        title: "Full User Control",
        desc: "You retain full ownership to view, update, export, or permanently delete your account data.",
        icon: "UserCheck",
      },
    ],
    sections: [
      {
        id: "data-yang-dikumpulkan",
        number: "01",
        title: "Information We Collect",
        iconName: "Database",
        summary: "Minimal data collected solely to provide core spiritual features.",
        points: [
          {
            subtitle: "User Account Details (Optional)",
            description:
              "When signing in via Google Sign-In, we receive your basic profile name, email address, and avatar for bookmark synchronization.",
          },
          {
            subtitle: "App Activity & Preferences",
            description:
              "Last read verse, bookmarked surahs, saved duas, theme preferences, and Arabic font size settings.",
          },
          {
            subtitle: "Device Location (Processed Locally)",
            description:
              "Location coordinates are used strictly on-device in real-time to compute accurate prayer timings and Qibla direction. Location is not tracked or stored on our servers.",
          },
        ],
      },
      {
        id: "penggunaan-izin",
        number: "02",
        title: "Device Permissions Usage",
        iconName: "Sliders",
        summary: "Clear explanation of required device permissions.",
        points: [
          {
            subtitle: "Notifications",
            description: "Used for prayer times alerts (Azan) and daily verse inspirations.",
          },
          {
            subtitle: "Storage / Photos",
            description:
              "Only requested when saving generated verse quote images to your local device gallery.",
          },
        ],
      },
      {
        id: "keamanan-penyimpanan",
        number: "03",
        title: "Data Security & Storage",
        iconName: "Lock",
        summary: "Industry-standard protocols to protect your personal information.",
        points: [
          {
            description:
              "We implement HTTPS encryption and secure Google Firebase cloud infrastructure with strict access controls.",
          },
        ],
      },
      {
        id: "privasi-anak",
        number: "04",
        title: "Children's Privacy & Family Standards",
        iconName: "HeartHandshake",
        summary: "Compliant with Google Play Family and child safety standards.",
        points: [
          {
            description:
              "Qur'an Ku does not knowingly collect personal information from children without parental consent and contains no inappropriate ads.",
          },
        ],
      },
      {
        id: "penghapusan-akun",
        number: "05",
        title: "Account & Data Deletion",
        iconName: "Trash2",
        summary: "Effortless procedures to permanently erase your data.",
        points: [
          {
            description:
              "You can permanently delete your account directly inside app Settings or by contacting support@excitech.id.",
          },
        ],
      },
    ],
    deletionHeading: "Data Deletion Requests",
    deletionDescription:
      "You have the right to request full erasure of your account and related cloud data at any time.",
    contactHeading: "Privacy Inquiries & Support",
    contactDescription: "Our dedicated Data Protection team is here to assist with any questions.",
    contactEmail: "support@excitech.id",
    contactDeveloper: "Excitech Software & Digital Solution",
    closingNote: "By using Qur'an Ku, you consent to this Privacy Policy.",
  },
  zh: {
    pageTitle: "Qur'an Ku 隐私政策",
    tagline: "保护您的个人数据与诵读隐私是我们的首要任务",
    effectiveDate: "2026年1月1日",
    lastUpdated: "2026年10月5日",
    version: "v2.0.0",
    overviewHeading: "Excitech 隐私承诺",
    overviewDescription:
      "Excitech 团队高度重视并全力保护您在手机与网页端使用 Qur'an Ku 时的个人隐私与数据安全。本隐私政策详细阐明了我们如何透明、合规地收集、处理与保护您的信息。",
    pillars: [
      {
        title: "绝不出售数据",
        desc: "我们绝不向任何第三方广告商出售或出租您的个人数据。",
        icon: "ShieldBan",
      },
      {
        title: "高等级加密传输",
        desc: "所有网络传输均采用 SSL/TLS 高强度加密协议与安全云存储。",
        icon: "Lock",
      },
      {
        title: "Google Play 家庭安全",
        desc: "符合家庭计划政策，内容纯净，无不良广告追踪。",
        icon: "HeartHandshake",
      },
      {
        title: "完全自主控制",
        desc: "您拥有查看、修改、导出或永久删除个人账户数据的全部权利。",
        icon: "UserCheck",
      },
    ],
    sections: [
      {
        id: "data-yang-dikumpulkan",
        number: "01",
        title: "我们收集的信息",
        iconName: "Database",
        summary: "仅收集保障应用核心功课功能所需的必要信息。",
        points: [
          {
            subtitle: "账户信息（可选）",
            description: "通过 Google 账号登录时，获取基础昵称、邮箱与头像以同步经文书签。",
          },
          {
            subtitle: "诵读进度与偏好",
            description: "记录最后阅读章节、收藏经文、日常杜阿以及主题字号偏好。",
          },
          {
            subtitle: "地理位置（仅本地计算）",
            description: "实时地理坐标仅在设备本地用于计算礼拜时刻与朝向，不上传存储于服务器。",
          },
        ],
      },
      {
        id: "penggunaan-izin",
        number: "02",
        title: "系统权限使用说明",
        iconName: "Sliders",
        summary: "透明说明应用所请求的系统权限及用途。",
        points: [
          {
            subtitle: "通知权限",
            description: "用于礼拜唤礼提醒及每日精选经文通知。",
          },
          {
            subtitle: "相册存储权限",
            description: "仅在用户主动保存经文卡片图片至相册时使用，绝不扫描私人照片。",
          },
        ],
      },
      {
        id: "keamanan-penyimpanan",
        number: "03",
        title: "数据安全与存储",
        iconName: "Lock",
        summary: "采用业界严苛标准保护用户个人隐私。",
        points: [
          {
            description: "采用 HTTPS 加密传输与经过认证的云端数据库，严格限制访问权限。",
          },
        ],
      },
      {
        id: "privasi-anak",
        number: "04",
        title: "儿童隐私与家庭计划",
        iconName: "HeartHandshake",
        summary: "严格遵循儿童网络保护标准与 Google Play 家庭计划政策。",
        points: [
          {
            description: "本应用适合全年龄段使用，不包含有害广告，不违规采集未成年人信息。",
          },
        ],
      },
      {
        id: "penghapusan-akun",
        number: "05",
        title: "账户与数据注销",
        iconName: "Trash2",
        summary: "提供快捷透明的账户永久注销途径。",
        points: [
          {
            description: "可在应用设置中一键申请注销，或通过邮件联系 support@excitech.id 处理。",
          },
        ],
      },
    ],
    deletionHeading: "数据注销与删除",
    deletionDescription: "您可随时申请彻底清除您的账户及云端同步的所有数据。",
    contactHeading: "隐私问题联系与支持",
    contactDescription: "如果您对隐私保护有任何疑问或建议，欢迎随时与我们联系。",
    contactEmail: "support@excitech.id",
    contactDeveloper: "Excitech Software & Digital Solution",
    closingNote: "使用 Qur'an Ku 即代表您同意本隐私政策的各项条款。",
  },
};
