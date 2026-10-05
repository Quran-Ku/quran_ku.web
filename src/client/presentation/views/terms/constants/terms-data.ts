export interface TermsSection {
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

export interface TermsDataContent {
  appTitle: string;
  tagline: string;
  effectiveDate: string;
  lastUpdated: string;
  version: string;
  overviewHeading: string;
  overviewDescription: string;
  overviewFeatures: {
    title: string;
    desc: string;
    icon: string;
  }[];
  sections: TermsSection[];
  contactHeading: string;
  contactDescription: string;
  contactEmail: string;
  contactDeveloper: string;
  closingNote: string;
}

export const TERMS_DATA: Record<"id" | "en" | "zh", TermsDataContent> = {
  id: {
    appTitle: "Syarat & Ketentuan Penggunaan Qur'an Ku",
    tagline: "Panduan Spiritual Terpercaya dalam Genggaman Anda",
    effectiveDate: "1 Januari 2026",
    lastUpdated: "5 Oktober 2026",
    version: "v2.0.0",
    overviewHeading: "Tentang Aplikasi Qur'an Ku",
    overviewDescription:
      "Aplikasi Qur'an Ku adalah sebuah panduan spiritual yang terpercaya dalam genggamanmu. Dengan fitur-fitur canggih seperti membaca Al-Quran 30 Juz, share ayat, simpan bookmark, arah kiblat presisi, doa harian shahih, dan murotal Quran merdu, aplikasi ini memberikan pengalaman yang sangat mudah dan praktis bagi penggunanya untuk mendalami pesan-pesan suci Al-Quran. Setiap saat, di mana pun Anda berada, Anda dapat membaca dan memahami ayat-ayat Al-Quran dengan mudah dan nyaman. Dengan kecanggihan teknologi yang ada pada aplikasi ini, mendekatkan diri pada Tuhan semakin mudah dan menyenangkan!",
    overviewFeatures: [
      {
        title: "114 Surah & Terjemahan",
        desc: "Teks Arab terverifikasi standar Kemenag RI beserta transliterasi latin dan arti bahasa Indonesia.",
        icon: "BookOpen",
      },
      {
        title: "Murotal Qari Dunia",
        desc: "Lantunan ayat suci merdu dari berbagai qari terkemuka dengan pemutar audio jernih per ayat.",
        icon: "Volume2",
      },
      {
        title: "Doa & Dzikir Harian",
        desc: "Ratusan doa shahih dari Al-Quran & Sunnah untuk membimbing setiap rutinitas ibadah.",
        icon: "Heart",
      },
      {
        title: "Bookmark & Bagikan Ayat",
        desc: "Simpan riwayat baca terakhir dan bagikan kartu kutipan ayat indah ke media sosial.",
        icon: "BookmarkCheck",
      },
    ],
    sections: [
      {
        id: "notifikasi",
        number: "01",
        title: "Notifikasi & Pengingat Ibadah",
        iconName: "Bell",
        summary: "Izin pengiriman notifikasi pengingat waktu shalat, ayat pilihan, dan pembaruan aplikasi.",
        points: [
          {
            description:
              "Pengguna aplikasi dapat memberikan izin kepada aplikasi Qur'an Ku untuk mengirimkan notifikasi pengingat waktu shalat, rekomendasi ayat harian, inspirasi islami, serta pengumuman pembaruan fitur terbaru.",
          },
          {
            subtitle: "Kontrol Penuh Pengguna",
            description:
              "Pengguna memiliki hak penuh untuk mengaktifkan atau menonaktifkan notifikasi kapan saja melalui menu Pengaturan di dalam aplikasi atau melalui pengaturan sistem operasi perangkat ponsel.",
          },
        ],
        alertBox: {
          type: "info",
          text: "Notifikasi waktu shalat memerlukan izin pengingat latar belakang agar pengingat azan dapat berbunyi tepat waktu sesuai koordinat lokasi Anda.",
        },
      },
      {
        id: "akses-internet",
        number: "02",
        title: "Akses Jaringan Internet & Layanan Online",
        iconName: "Wifi",
        summary: "Kebutuhan konektivitas untuk memuat konten Quran, audio streaming, dan sinkronisasi.",
        points: [
          {
            description:
              "Aplikasi Qur'an Ku memerlukan akses jaringan internet untuk mengunduh konten Al-Quran secara online, streaming audio murotal, sinkronisasi jadwal shalat berbasis lokasi, serta mendapatkan konten doa terbaru.",
          },
          {
            subtitle: "Kestabilan Koneksi",
            description:
              "Pengguna disarankan untuk menggunakan koneksi internet yang stabil guna memastikan kelancaran pemutaran audio murotal dan menghindari kendala pemuatan data tafsir.",
          },
          {
            subtitle: "Tanggung Jawab Kuota Data",
            description:
              "Segala biaya penggunaan kuota data internet sepenuhnya merupakan tanggung jawab pengguna dan penyedia layanan seluler masing-masing.",
          },
        ],
      },
      {
        id: "akses-galeri",
        number: "03",
        title: "Akses Foto & Penyimpanan Galeri",
        iconName: "Image",
        summary: "Penyimpanan kartu gambar ayat favorit dan ekspor catatan pribadi dengan perlindungan privasi ketat.",
        points: [
          {
            description:
              "Pengguna dapat mengizinkan aplikasi untuk mengakses penyimpanan atau galeri perangkat semata-mata untuk menyimpan gambar kartu ayat favorit, ekspor kutipan Al-Quran, atau menyimpan catatan pribadi terkait pembelajaran Al-Quran.",
          },
          {
            subtitle: "Jaminan Perlindungan Privasi",
            description:
              "Aplikasi Qur'an Ku menjamin tidak akan pernah mengakses, membaca, memindai, menyalin, atau membagikan foto pribadi pengguna di galeri kepada pihak mana pun tanpa persetujuan eksplisit.",
          },
        ],
        alertBox: {
          type: "success",
          text: "Izin penyimpanan hanya digunakan saat Anda menekan tombol 'Simpan Gambar Ayat' ke galeri perangkat Anda.",
        },
      },
      {
        id: "edit-profil",
        number: "04",
        title: "Pengelolaan Akun & Edit Profil",
        iconName: "UserCheck",
        summary: "Ketentuan pengisian dan pembaruan identitas akun pengguna secara akurat dan etis.",
        points: [
          {
            description:
              "Pengguna yang terdaftar berhak mengedit data profil pribadi (seperti nama tampilan, foto avatar, dan preferensi bacaan) pada aplikasi Qur'an Ku.",
          },
          {
            subtitle: "Kewajiban Data Akurat & Santun",
            description:
              "Pengguna diharapkan memberikan informasi yang akurat, tidak menggunakan identitas palsu yang merugikan pihak lain, serta tidak menggunakan foto profil atau nama yang mengandung unsur SARA, ujaran kebencian, atau pelanggaran norma kesusilaan.",
          },
        ],
      },
      {
        id: "login-gmail",
        number: "05",
        title: "Autentikasi Akun Google / Gmail",
        iconName: "ShieldCheck",
        summary: "Keamanan proses login OAuth Google dan perlindungan data kredensial pengguna.",
        points: [
          {
            description:
              "Pengguna dapat menggunakan akun Gmail melalui sistem otentikasi aman Google Sign-In untuk masuk ke aplikasi Qur'an Ku, mencadangkan riwayat bookmark, dan menyelaraskan bacaan antar perangkat.",
          },
          {
            subtitle: "Tanggung Jawab Keamanan Akun",
            description:
              "Pengguna bertanggung jawab penuh atas kerahasiaan dan keamanan akun Google masing-masing. Jangan pernah membagikan kode verifikasi OTP atau kata sandi akun Anda kepada pihak mana pun.",
          },
        ],
      },
      {
        id: "akses-speaker",
        number: "06",
        title: "Akses Speaker & Pemutaran Murotal",
        iconName: "Volume2",
        summary: "Panduan pemutaran audio ayat suci dan etika mendengarkan di ruang publik.",
        points: [
          {
            description:
              "Aplikasi Qur'an Ku memerlukan izin sistem media dan akses speaker perangkat untuk memperdengarkan lantunan merdu murotal Al-Quran, lafal doa, dan suara azan.",
          },
          {
            subtitle: "Etika Pemutaran Audio",
            description:
              "Pengguna disarankan untuk mengatur volume audio secara bijak atau menggunakan earphone/headphone saat berada di tempat umum atau tempat ibadah agar tercipta suasana yang kondusif dan tidak mengganggu orang lain di sekitar.",
          },
        ],
      },
      {
        id: "kebijakan-keluarga",
        number: "07",
        title: "Kepatuhan Kebijakan Keluarga Google (Google Play Families Policy)",
        iconName: "HeartHandshake",
        summary: "Standar ramah keluarga, keamanan anak, dan kepatuhan hukum yang ketat.",
        points: [
          {
            description:
              "Aplikasi Qur'an Ku berkomitmen penuh untuk mematuhi Kebijakan Keluarga Google Play (Google Play Families Policy & Developer Program Policies). Konten di dalam aplikasi dirancang aman dan bermanfaat untuk semua kelompok umur, termasuk anak-anak dan keluarga.",
          },
          {
            subtitle: "Larangan Penyalahgunaan",
            description:
              "Dilarang keras menyalahgunakan aplikasi Qur'an Ku untuk kegiatan yang bertentangan dengan hukum yang berlaku, membajak data, atau menyebarkan konten yang melanggar ketentuan perundang-undangan.",
          },
          {
            subtitle: "Sanksi Pelanggaran",
            description:
              "Pengguna yang terbukti melanggar ketentuan penggunaan dapat dikenakan sanksi berupa penangguhan akun hingga pemblokiran akses sesuai dengan regulasi Google Play dan kebijakan hukum di Indonesia.",
          },
        ],
        alertBox: {
          type: "warning",
          text: "Aplikasi ini 100% bebas dari konten berbahaya, konten dewasa, dan bebas dari iklan yang tidak ramah keluarga.",
        },
      },
      {
        id: "keamanan-data",
        number: "08",
        title: "Keamanan Data, Enkripsi, & Kerahasiaan Privasi",
        iconName: "Lock",
        summary: "Komitmen perlindungan data pribadi dan mekanisme pelaporan keamanan.",
        points: [
          {
            description:
              "Qur'an Ku menerapkan standar keamanan tinggi dengan enkripsi data (HTTPS/SSL & Secure Storage) untuk menjaga kerahasiaan data pengguna. Kami TIDAK AKAN PERNAH menjual, menyewakan, atau membagikan data pribadi pengguna kepada pihak ketiga tanpa izin sah pengguna.",
          },
          {
            subtitle: "Kewaspadaan Pengguna",
            description:
              "Pengguna diharapkan turut menjaga keamanan perangkat, menggunakan kata sandi yang kuat, dan tidak memberikan akses perangkat yang tidak diawasi kepada pihak yang tidak berwenang.",
          },
          {
            subtitle: "Pelaporan Keamanan & Pelanggaran",
            description:
              "Jika Anda menemukan indikasi celah keamanan, kecurangan, atau potensi pelanggaran privasi, mohon segera laporkan kepada tim pengembang kami untuk segera ditindaklanjuti.",
          },
        ],
      },
      {
        id: "hak-cipta",
        number: "09",
        title: "Hak Kekayaan Intelektual & Lisensi Konten",
        iconName: "FileCheck",
        summary: "Rujukan mushaf standar Kementerian Agama RI dan hak cipta pengembangan aplikasi.",
        points: [
          {
            description:
              "Teks mushaf Al-Quran, terjemahan resmi bahasa Indonesia, dan data doa mengacu pada sumber data terpercaya yang diverifikasi oleh Kementerian Agama Republik Indonesia (Kemenag RI) dan sumber riwayat hadits shahih.",
          },
          {
            subtitle: "Aset Desain & Merek",
            description:
              "Seluruh desain antarmuka, logo 'Qur'an Ku', kode program, dan ikon aplikasi merupakan hak kekayaan intelektual milik tim pengembang Excitech. Penggandaan, modifikasi tanpa izin, atau penggunaan komersial tanpa lisensi resmi dilarang keras.",
          },
        ],
      },
      {
        id: "ketentuan-penutup",
        number: "10",
        title: "Perubahan Syarat Ketentuan & Kontak Dukungan",
        iconName: "HelpCircle",
        summary: "Hak pembaruan syarat penggunaan dan saluran komunikasi bantuan resmi.",
        points: [
          {
            description:
              "Kami berhak memperbarui dan menyempurnakan Syarat dan Ketentuan ini sewaktu-waktu guna menyesuaikan dengan pembaruan fitur aplikasi maupun regulasi hukum terbaru. Perubahan akan berlaku efektif segera setelah diumumkan di halaman ini.",
          },
          {
            subtitle: "Pusat Bantuan & Masukan",
            description:
              "Jika Anda memiliki pertanyaan, saran perbaikan, atau memerlukan bantuan teknis terkait aplikasi Qur'an Ku, tim kami siap membantu melalui saluran kontak resmi pengembang.",
          },
        ],
      },
    ],
    contactHeading: "Pertanyaan seputar Syarat & Ketentuan?",
    contactDescription:
      "Tim pengembang Qur'an Ku berkomitmen untuk selalu mendengarkan masukan dan menjaga transparansi demi kenyamanan ibadah Anda.",
    contactEmail: "support@excitech.id",
    contactDeveloper: "Excitech Software & Digital Solution",
    closingNote:
      "Dengan mengunduh, memasang, atau menggunakan aplikasi Qur'an Ku, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh Syarat & Ketentuan di atas.",
  },
  en: {
    appTitle: "Qur'an Ku Terms and Conditions",
    tagline: "Your Trusted Pocket Spiritual Guide",
    effectiveDate: "January 1, 2026",
    lastUpdated: "October 5, 2026",
    version: "v2.0.0",
    overviewHeading: "About Qur'an Ku Application",
    overviewDescription:
      "The Qur'an Ku application is a trusted spiritual companion in your palm. Packed with modern features like verse sharing, bookmarking, precise Qibla direction, authentic daily duas, and soothing audio murottal recitations, this app provides an intuitive and peaceful experience to reflect upon the Holy Quran anywhere and anytime.",
    overviewFeatures: [
      {
        title: "114 Surahs & Translations",
        desc: "Verified Arabic scripture with transliteration and comprehensive translations.",
        icon: "BookOpen",
      },
      {
        title: "World Renowned Reciters",
        desc: "Crystal-clear verse-by-verse murattal recitations from 6 esteemed Qaris.",
        icon: "Volume2",
      },
      {
        title: "Daily Duas & Dhikr",
        desc: "Authentic supplications from Quran and Sunnah with complete references.",
        icon: "Heart",
      },
      {
        title: "Bookmarks & Verse Sharing",
        desc: "Save your recitation progress and generate beautiful quote cards for social media.",
        icon: "BookmarkCheck",
      },
    ],
    sections: [
      {
        id: "notifikasi",
        number: "01",
        title: "Notifications & Prayer Reminders",
        iconName: "Bell",
        summary: "Permission for timely prayer reminders, daily verse picks, and app updates.",
        points: [
          {
            description:
              "Users can grant permission to receive timely prayer alerts (Azan), daily verse reflections, and important feature updates from Qur'an Ku.",
          },
          {
            subtitle: "User Control",
            description:
              "You can manage or disable notification preferences at any time directly through the app settings or your device OS settings.",
          },
        ],
      },
      {
        id: "akses-internet",
        number: "02",
        title: "Internet Connectivity & Online Features",
        iconName: "Wifi",
        summary: "Network requirements for audio streaming and online scripture data.",
        points: [
          {
            description:
              "Internet connectivity is required for audio streaming, verse commentary lookup, and cloud backup synchronization.",
          },
          {
            subtitle: "Data Costs",
            description:
              "Cellular data charges are the sole responsibility of the user according to their mobile carrier plan.",
          },
        ],
      },
      {
        id: "akses-galeri",
        number: "03",
        title: "Storage & Photo Gallery Access",
        iconName: "Image",
        summary: "Strictly limited to saving generated verse cards without accessing personal media.",
        points: [
          {
            description:
              "Device storage permission is only requested when you choose to save verse quote cards or bookmarks to your local gallery.",
          },
          {
            subtitle: "Privacy Guarantee",
            description:
              "Qur'an Ku does not inspect, read, or upload any personal photos or private documents from your device.",
          },
        ],
      },
      {
        id: "edit-profil",
        number: "04",
        title: "Account Management & Profile Editing",
        iconName: "UserCheck",
        summary: "Guidelines on personal data accuracy and appropriate avatar usage.",
        points: [
          {
            description:
              "Registered users may update their display name, avatar, and reading preferences accurately and respectfully.",
          },
        ],
      },
      {
        id: "login-gmail",
        number: "05",
        title: "Google Authentication & Account Security",
        iconName: "ShieldCheck",
        summary: "Secure Google Sign-In protocol and user credential responsibility.",
        points: [
          {
            description:
              "Sign in securely with Google to sync bookmarks and preferences across multiple devices. Users are responsible for safeguarding their Google credentials.",
          },
        ],
      },
      {
        id: "akses-speaker",
        number: "06",
        title: "Audio Recitations & Speaker Usage",
        iconName: "Volume2",
        summary: "Guidelines on respectful listening and audio controls.",
        points: [
          {
            description:
              "The app uses device media speakers for playing sacred recitations and prayer calls. Please adjust volume mindfully in public spaces.",
          },
        ],
      },
      {
        id: "kebijakan-keluarga",
        number: "07",
        title: "Google Play Families & Policy Compliance",
        iconName: "HeartHandshake",
        summary: "Strict family-friendly content standards and zero tolerance for abuse.",
        points: [
          {
            description:
              "Qur'an Ku is family-friendly, ad-free from inappropriate content, and complies strictly with Google Play Family and Developer policies.",
          },
        ],
      },
      {
        id: "keamanan-data",
        number: "08",
        title: "Data Security, Encryption, & Privacy",
        iconName: "Lock",
        summary: "High-grade encryption and zero third-party data selling commitment.",
        points: [
          {
            description:
              "Your data is protected with modern HTTPS encryption. We never sell or share your personal information with unauthorized third parties.",
          },
        ],
      },
      {
        id: "hak-cipta",
        number: "09",
        title: "Intellectual Property & Content Verification",
        iconName: "FileCheck",
        summary: "Standard scripture citations and app branding copyright.",
        points: [
          {
            description:
              "Scriptural texts and Indonesian translations are certified from recognized Islamic authorities. App design and code remain intellectual property of Excitech.",
          },
        ],
      },
      {
        id: "ketentuan-penutup",
        number: "10",
        title: "Terms Updates & Contact Support",
        iconName: "HelpCircle",
        summary: "Official contact details and policy revision terms.",
        points: [
          {
            description:
              "These terms may be updated periodically. Continued use of the app signifies acceptance of revised terms.",
          },
        ],
      },
    ],
    contactHeading: "Questions regarding our Terms?",
    contactDescription:
      "Our support team is dedicated to addressing your inquiries promptly.",
    contactEmail: "support@excitech.id",
    contactDeveloper: "Excitech Software & Digital Solution",
    closingNote:
      "By using Qur'an Ku, you acknowledge and agree to these Terms and Conditions.",
  },
  zh: {
    appTitle: "Qur'an Ku 使用条款与服务协议",
    tagline: "您随身信赖的伊斯兰精神向导",
    effectiveDate: "2026年1月1日",
    lastUpdated: "2026年10月5日",
    version: "v2.0.0",
    overviewHeading: "关于 Qur'an Ku 应用",
    overviewDescription:
      "Qur'an Ku 是一款致力于为您提供宁静诵读与学习体验的古兰经应用。包含30卷经文、经文分享、书签收藏、精准朝向、日常杜阿以及世界著名诵读家音频，帮助您在任何时间地点感受信仰的力量。",
    overviewFeatures: [
      {
        title: "114 章节与权威翻译",
        desc: "经过验证的阿拉伯语经文，配备清晰注音与详尽翻译。",
        icon: "BookOpen",
      },
      {
        title: "名家清澈音频诵读",
        desc: "支持逐节聆听世界著名诵读家的高清诵读声音。",
        icon: "Volume2",
      },
      {
        title: "日常祈祷与杜阿",
        desc: "精选可靠古兰经与圣训杜阿，指引每日功课。",
        icon: "Heart",
      },
      {
        title: "书签与经文卡片分享",
        desc: "记录诵读历史并生成优雅的经文卡片分享给亲友。",
        icon: "BookmarkCheck",
      },
    ],
    sections: [
      {
        id: "notifikasi",
        number: "01",
        title: "通知与礼拜提醒",
        iconName: "Bell",
        summary: "精准礼拜时间提醒与每日精选经文通知权限。",
        points: [
          {
            description:
              "用户可授权应用发送准确的礼拜唤礼提醒、每日精选经文及最新功能更新通知。用户可随时在设置中开启或关闭通知。",
          },
        ],
      },
      {
        id: "akses-internet",
        number: "02",
        title: "网络连接与在线服务",
        iconName: "Wifi",
        summary: "经文加载与音频流媒体网络连接需求及资费说明。",
        points: [
          {
            description:
              "应用需要网络访问以在线播放音频诵读、更新礼拜时刻表以及同步用户书签。流量费用由用户自行承担。",
          },
        ],
      },
      {
        id: "akses-galeri",
        number: "03",
        title: "相册与存储权限",
        iconName: "Image",
        summary: "仅用于保存经文卡片，严格保护个人隐私。",
        points: [
          {
            description:
              "存储权限仅用于将用户选定的经文卡片保存至本地相册。应用绝不会读取或上传用户的任何私人照片与文件。",
          },
        ],
      },
      {
        id: "edit-profil",
        number: "04",
        title: "账户管理与个人信息",
        iconName: "UserCheck",
        summary: "规范个人资料修改与真实性承诺。",
        points: [
          {
            description: "用户可自主更新个人昵称与头像，并应保证信息的真实文明与守法合规。",
          },
        ],
      },
      {
        id: "login-gmail",
        number: "05",
        title: "谷歌账号安全登录",
        iconName: "ShieldCheck",
        summary: "使用官方安全登录机制与凭据保管义务。",
        points: [
          {
            description: "通过 Google 账号登录可同步书签和阅读进度，用户需妥善保管账号安全。",
          },
        ],
      },
      {
        id: "akses-speaker",
        number: "06",
        title: "音频播放与扬声器使用",
        iconName: "Volume2",
        summary: "诵读音频播放与公共场合礼仪建议。",
        points: [
          {
            description: "应用使用扬声器播放经文诵读。在公共场合建议佩戴耳机以保持适宜环境。",
          },
        ],
      },
      {
        id: "kebijakan-keluarga",
        number: "07",
        title: "Google Play 家庭政策与合规",
        iconName: "HeartHandshake",
        summary: "全年龄安全标准与杜绝违法违规行为。",
        points: [
          {
            description: "本应用严格遵循 Google Play 家庭计划政策，内容纯净健康，适合全年龄段使用。",
          },
        ],
      },
      {
        id: "keamanan-data",
        number: "08",
        title: "数据加密与隐私安全",
        iconName: "Lock",
        summary: "采用高强度加密传输，绝不出售用户数据。",
        points: [
          {
            description: "我们采用业界标准加密技术保护用户信息，绝不向第三方违规出售个人数据。",
          },
        ],
      },
      {
        id: "hak-cipta",
        number: "09",
        title: "知识产权与内容授权",
        iconName: "FileCheck",
        summary: "经文权威引证与软件版权保护说明。",
        points: [
          {
            description: "经文及译文依据官方权威校订。应用界面设计与程序代码均属 Excitech 团队所有。",
          },
        ],
      },
      {
        id: "ketentuan-penutup",
        number: "10",
        title: "条款更新与联系支持",
        iconName: "HelpCircle",
        summary: "协议修订说明与技术支持联系途径。",
        points: [
          {
            description: "本条款可能根据需要进行更新。如需帮助或有任何疑问，请随时联系我们的支持团队。",
          },
        ],
      },
    ],
    contactHeading: "对使用条款有任何疑问？",
    contactDescription: "我们的支持团队随时为您解答疑问。",
    contactEmail: "support@excitech.id",
    contactDeveloper: "Excitech Software & Digital Solution",
    closingNote: "使用 Qur'an Ku 即代表您已阅读并同意本协议的全部条款。",
  },
};
