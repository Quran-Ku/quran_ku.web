"use client";

import { useState, useEffect, createContext, useContext, ReactNode, createElement } from "react";

export type SupportedLocale = "en" | "id" | "zh";

export const DEFAULT_LOCALE: SupportedLocale = "id";

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = ["id", "en", "zh"] as const;

export function isValidLocale(lang: unknown): lang is SupportedLocale {
  return typeof lang === "string" && SUPPORTED_LOCALES.includes(lang as SupportedLocale);
}

const DICTIONARY: Record<SupportedLocale, Record<string, string>> = {
  id: {
    "app.name": "Quran Ku",
    "app.tagline": "Al-Quran Lebih Dekat, Setiap Hari.",
    "app.description":
      "Baca Al-Quran, dengarkan murattal, pahami terjemahan, dan temukan doa harian dalam satu aplikasi sederhana dan nyaman.",
    "nav.home": "Beranda",
    "nav.features": "Fitur",
    "nav.quran": "Al-Quran",
    "nav.doa": "Doa Harian",
    "nav.openApp": "Buka Quran Ku",
    "nav.download": "Download",
    "hero.title": "Al-Quran Lebih Dekat, Setiap Hari.",
    "hero.subtitle":
      "Baca Al-Quran, dengarkan murattal dari qari terkemuka, pahami makna terjemahan bahasa Indonesia, dan amalkan doa harian dengan tenang.",
    "hero.cta.open": "Buka Quran Ku",
    "hero.cta.explore": "Jelajahi Al-Quran",
    "hero.badge": "114 Surah • Audio Murattal • 200+ Doa Harian",
    "features.heading": "Lebih Mudah Mendekatkan Diri dengan Al-Quran",
    "features.subheading": "Fitur lengkap yang dirancang untuk menemani ibadah harian Anda",
    "features.quran.title": "114 Surah Al-Quran",
    "features.quran.desc":
      "Teks Arab terverifikasi, transliterasi, dan terjemahan resmi Kementerian Agama RI.",
    "features.audio.title": "Audio Murattal Lengkap",
    "features.audio.desc":
      "Dengarkan lantunan ayat suci dari 6 pilihan qari ternama dunia dengan kualitas audio jernih.",
    "features.doa.title": "200+ Doa Harian",
    "features.doa.desc":
      "Kumpulan doa shahih lengkap dengan teks Arab, transliterasi, terjemahan, dan sumber riwayat.",
    "features.bookmark.title": "Penanda Bacaan",
    "features.bookmark.desc":
      "Tandai ayat terakhir dibaca dan lanjutkan tilawah Anda kapan saja dengan mudah.",
    "features.theme.title": "Tampilan Nyaman",
    "features.theme.desc":
      "Mode terang dan gelap yang dirancang untuk kenyamanan membaca mata dalam waktu lama.",
    "features.deeplink.title": "Deep Link Terintegrasi",
    "features.deeplink.desc":
      "Buka surat, ayat, atau doa secara instan di aplikasi Quran Ku ponsel Anda.",
    "slides.badge": "Tampilan Aplikasi",
    "slides.heading": "Pengalaman Tilawah yang Indah & Modern",
    "slides.subheading":
      "Lihat tampilan antarmuka Quran Ku di perangkat seluler yang dirancang tenang, bersih, dan nyaman digunakan setiap hari.",
    "slides.prev": "Slide Sebelumnya",
    "slides.next": "Slide Berikutnya",
    "slides.openInApp": "Buka di Aplikasi",
    "slides.item1.title": "Qur'an Ku",
    "slides.item1.tag": "Beranda & Desain",
    "slides.item1.subtitle": "Kemudahan membaca, menghafal, dan mendalami Al-Qur'an di mana saja.",
    "slides.item1.desc": "Desain antarmuka yang estetis dan menenangkan, memberikan akses instan ke bacaan terakhir dan seluruh fitur utama.",
    "slides.item2.title": "Baca Qur'an",
    "slides.item2.tag": "Tilawah & Audio",
    "slides.item2.subtitle": "Halaman untuk membaca ayat-ayat Al-Qur'an, dilengkapi dengan fitur bookmark dan audio.",
    "slides.item2.desc": "Tipografi ayat yang jernih, terjemahan Indonesia lengkap, pemutar audio qari terkemuka per ayat, dan fitur simpan penanda.",
    "slides.item3.title": "Daftar Surah",
    "slides.item3.tag": "114 Surah & Juz",
    "slides.item3.subtitle": "Menampilkan daftar 114 surah dalam Al-Qur'an. Pengguna dapat mencari dan memilih surah yang ingin dibaca.",
    "slides.item3.desc": "Navigasi pintar dengan tab Surah dan Juz, pencarian cepat nama surah, dan kartu akses lanjut baca ayat terakhir.",
    "slides.item4.title": "Doa Harian",
    "slides.item4.tag": "Koleksi Doa",
    "slides.item4.subtitle": "Halaman yang menampilkan kumpulan doa harian yang diambil dari Al-Qur'an dan hadis.",
    "slides.item4.desc": "Kumpulan doa harian shahih bersumber dari Al-Qur'an dan hadis untuk menemani setiap langkah dan aktivitas harian.",
    "slides.item5.title": "Bookmark",
    "slides.item5.tag": "Favorit & Riwayat",
    "slides.item5.subtitle": "Menampilkan daftar ayat-ayat yang telah disimpan sebagai favorit oleh pengguna untuk diakses kembali dengan mudah.",
    "slides.item5.desc": "Kelola ayat-ayat tersimpan, riwayat baca terakhir, dan doa favorit dalam profil pribadi yang rapi.",
    "slides.item6.title": "Detail Surah",
    "slides.item6.tag": "Informasi Surah",
    "slides.item6.subtitle": "Menampilkan informasi lengkap mengenai surah yang dipilih, termasuk jumlah ayat, arti nama surah dan lokasi diturunkannya.",
    "slides.item6.desc": "Dilengkapi kartu informasi Makkiyah/Madaniyah, jumlah ayat, pemutar murattal surah, serta lompat cepat ke nomor ayat yang diinginkan.",
    "slides.item7.title": "Pencarian Ayat",
    "slides.item7.tag": "Cari & Temukan",
    "slides.item7.subtitle": "Fitur untuk mencari ayat tertentu berdasarkan kata kunci atau nomor surah dan ayat.",
    "slides.item7.desc": "Pencarian cerdas dengan filter tab Surat, Ayat, dan Do'a. Hasil pencarian langsung dapat disalin, dibagikan, atau diputar audionya.",
    "quran.preview.title": "Mulai Membaca Al-Quran",
    "quran.preview.subtitle": "Pilih surah untuk membaca ayat, terjemahan, dan mendengarkan audio",
    "quran.search.placeholder": "Cari surah berdasarkan nama, arti, atau nomor...",
    "quran.surah.ayahs": "Ayat",
    "quran.surah.makkiyah": "Makkiyah",
    "quran.surah.madaniyah": "Madaniyah",
    "quran.action.play": "Putar",
    "quran.action.pause": "Jeda",
    "quran.action.copy": "Salin",
    "quran.action.share": "Bagikan",
    "quran.action.openInApp": "Buka di Aplikasi",
    "quran.action.copied": "Teks ayat berhasil disalin!",
    "quran.reciter.select": "Pilih Qari",
    "doa.preview.title": "Doa untuk Setiap Aktivitas",
    "doa.preview.subtitle": "Temukan doa harian shahih bersumber dari Al-Quran dan As-Sunnah",
    "doa.search.placeholder": "Cari doa berdasarkan nama atau kata kunci...",
    "doa.viewAll": "Lihat Semua Doa",
    "cta.heading": "Bawa Quran Ku ke Mana Pun Anda Pergi",
    "cta.subheading":
      "Nikmati pengalaman membaca Al-Quran dan berdoa yang tenang langsung di genggaman Anda.",
    "cta.openApp": "Buka Aplikasi",
    "cta.download": "Download Android",
    "cta.web": "Baca di Web",
    "open.title": "Membuka Quran Ku",
    "open.desc": "Mengarahkan ke aplikasi Quran Ku di perangkat Anda...",
    "open.fallback.title": "Aplikasi belum terbuka?",
    "open.fallback.desc":
      "Jika Anda belum memasang Quran Ku, Anda dapat mengunduhnya atau melanjutkan membaca di web.",
    "open.button.continueWeb": "Lanjutkan di Web",
    "open.button.retry": "Buka Ulang di Aplikasi",
    "open.button.download": "Download Aplikasi",
    "footer.desc":
      "Quran Ku dibuat untuk membantu umat Muslim membaca, memahami, dan mengamalkan Al-Quran dalam kehidupan sehari-hari.",
    "footer.quickLinks": "Tautan Cepat",
    "footer.legal": "Informasi",
    "footer.privacy": "Kebijakan Privasi",
    "footer.terms": "Syarat & Ketentuan",
    "footer.about": "Tentang Kami",
    "footer.contact": "Hubungi Kami",
    "footer.rights": "Hak Cipta Dilindungi.",
  },
  en: {
    "app.name": "Quran Ku",
    "app.tagline": "Closer to the Holy Quran, Every Day.",
    "app.description":
      "Read the Quran, listen to audio recitations, understand translations, and discover daily prayers in one peaceful app.",
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.quran": "Al-Quran",
    "nav.doa": "Daily Prayers",
    "nav.openApp": "Open Quran Ku",
    "nav.download": "Download",
    "hero.title": "Closer to the Holy Quran, Every Day.",
    "hero.subtitle":
      "Read the Quran, listen to world-renowned reciters, understand Indonesian translations, and practice authentic daily duas calmly.",
    "hero.cta.open": "Open Quran Ku",
    "hero.cta.explore": "Explore Quran",
    "hero.badge": "114 Surahs • Audio Recitations • 200+ Daily Duas",
    "features.heading": "Enrich Your Daily Quran Journey",
    "features.subheading": "Comprehensive features designed to accompany your daily Islamic worship",
    "features.quran.title": "114 Quran Surahs",
    "features.quran.desc":
      "Verified Arabic scripture, transliteration, and Indonesian Ministry of Religious Affairs translation.",
    "features.audio.title": "Audio Murattal",
    "features.audio.desc":
      "Listen to crystal-clear recitations from 6 world-renowned Quran reciters.",
    "features.doa.title": "200+ Daily Duas",
    "features.doa.desc":
      "Authentic supplications complete with Arabic text, transliteration, meaning, and hadith sources.",
    "features.bookmark.title": "Reading Tracker",
    "features.bookmark.desc":
      "Bookmark your last read ayah and continue your recitation anytime seamlessly.",
    "features.theme.title": "Comfortable Reading",
    "features.theme.desc":
      "Serene light and dark modes designed for long, distraction-free reading sessions.",
    "features.deeplink.title": "Seamless Deep Links",
    "features.deeplink.desc":
      "Open specific surahs, ayahs, or duas directly in the Quran Ku mobile application.",
    "slides.badge": "App Showcase",
    "slides.heading": "Beautiful & Modern Recitation Experience",
    "slides.subheading":
      "Explore the clean and serene mobile interface of Quran Ku designed for everyday worship and reflection.",
    "slides.prev": "Previous Slide",
    "slides.next": "Next Slide",
    "slides.openInApp": "Open in App",
    "slides.item1.title": "Quran Ku",
    "slides.item1.tag": "Home & Overview",
    "slides.item1.subtitle": "Ease of reading, memorizing, and exploring the Holy Quran anywhere.",
    "slides.item1.desc": "Calm, aesthetic interface providing instant access to your last read ayah and primary features.",
    "slides.item2.title": "Read Quran",
    "slides.item2.tag": "Recitation & Audio",
    "slides.item2.subtitle": "Clean page for reading Quranic verses with verse audio and bookmarking tools.",
    "slides.item2.desc": "Clear Arabic typography, verified Indonesian translation, verse-by-verse recitation player, and quick bookmarking.",
    "slides.item3.title": "Surah List",
    "slides.item3.tag": "114 Surahs & Juz",
    "slides.item3.subtitle": "Complete list of 114 Surahs with instant search and easy chapter navigation.",
    "slides.item3.desc": "Filter by Surah and Juz, quick search, and resume card for your last read passage.",
    "slides.item4.title": "Daily Duas",
    "slides.item4.tag": "Dua Collection",
    "slides.item4.subtitle": "Authentic daily prayers and supplications from the Quran and Sunnah.",
    "slides.item4.desc": "Hundreds of authentic supplications with Arabic scripture, translation, and verified hadith citations.",
    "slides.item5.title": "Bookmarks",
    "slides.item5.tag": "Favorites & History",
    "slides.item5.subtitle": "Easily access your saved favorite verses and reading history anytime.",
    "slides.item5.desc": "Manage saved ayahs, recent reading progress, and favorite supplications in one neat personal profile.",
    "slides.item6.title": "Surah Details",
    "slides.item6.tag": "Surah Info",
    "slides.item6.subtitle": "Displays comprehensive information about the selected surah, including ayah count, translation, and revelation place.",
    "slides.item6.desc": "Equipped with revelation origin cards, total verses count, chapter murattal player, and quick verse jump.",
    "slides.item7.title": "Ayah Search",
    "slides.item7.tag": "Search & Explore",
    "slides.item7.subtitle": "Feature to search specific verses by keywords, topics, or surah and ayah numbers.",
    "slides.item7.desc": "Smart search with tabs for Surah, Ayah, and Dua. Instant results can be copied, shared, or listened to immediately.",
    "quran.preview.title": "Start Reading Al-Quran",
    "quran.preview.subtitle": "Select a surah to read ayahs, translations, and listen to audio",
    "quran.search.placeholder": "Search surah by name, meaning, or number...",
    "quran.surah.ayahs": "Ayahs",
    "quran.surah.makkiyah": "Makkiyah",
    "quran.surah.madaniyah": "Madaniyah",
    "quran.action.play": "Play",
    "quran.action.pause": "Pause",
    "quran.action.copy": "Copy",
    "quran.action.share": "Share",
    "quran.action.openInApp": "Open in App",
    "quran.action.copied": "Ayah text copied to clipboard!",
    "quran.reciter.select": "Select Reciter",
    "doa.preview.title": "Supplications for Every Moment",
    "doa.preview.subtitle": "Discover authentic daily duas from the Quran and Sunnah",
    "doa.search.placeholder": "Search dua by name or keyword...",
    "doa.viewAll": "View All Duas",
    "cta.heading": "Take Quran Ku Wherever You Go",
    "cta.subheading":
      "Experience peaceful Quran reading and daily prayers right at your fingertips.",
    "cta.openApp": "Open App",
    "cta.download": "Download Android",
    "cta.web": "Read on Web",
    "open.title": "Opening Quran Ku",
    "open.desc": "Redirecting to Quran Ku mobile application...",
    "open.fallback.title": "App didn't open?",
    "open.fallback.desc":
      "If you don't have Quran Ku installed yet, you can download it or continue reading on the web.",
    "open.button.continueWeb": "Continue on Web",
    "open.button.retry": "Try Opening App Again",
    "open.button.download": "Download App",
    "footer.desc":
      "Quran Ku was built to help Muslims read, understand, and apply the Quran in everyday life.",
    "footer.quickLinks": "Quick Links",
    "footer.legal": "Legal",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.about": "About Us",
    "footer.contact": "Contact Us",
    "footer.rights": "All Rights Reserved.",
  },
  zh: {
    "app.name": "Quran Ku",
    "app.tagline": "每天与古兰经更亲近。",
    "app.description": "一款简洁优美的古兰经与日常祈祷应用。",
    "nav.home": "首页",
    "nav.features": "功能",
    "nav.quran": "古兰经",
    "nav.doa": "日常杜阿",
    "nav.openApp": "打开应用",
    "nav.download": "下载",
    "hero.title": "每天与古兰经更亲近。",
    "hero.subtitle": "阅读经文、聆听诵读、理解译文，并在宁静中实践每日祈祷。",
    "hero.cta.open": "打开 Quran Ku",
    "hero.cta.explore": "探索古兰经",
    "hero.badge": "114 章 • 经文音频 • 200+ 每日杜阿",
    "features.heading": "让古兰经融入您的日常生活",
    "features.subheading": "专为穆斯林日常功课设计的全方位功能",
    "features.quran.title": "114 卷古兰经",
    "features.quran.desc": "权威阿拉伯语文本、注音及完整译文。",
    "features.audio.title": "名家音频诵读",
    "features.audio.desc": "聆听来自多位著名诵读家的清澈声音。",
    "features.doa.title": "200+ 日常祈祷",
    "features.doa.desc": "圣训可靠杜阿，配有阿文、注音和来源出处。",
    "features.bookmark.title": "阅读书签",
    "features.bookmark.desc": "轻松标记最后阅读的节数并随时继续诵读。",
    "features.theme.title": "舒适阅读",
    "features.theme.desc": "深色与浅色模式，呵护长时间阅读的眼睛。",
    "features.deeplink.title": "深度链接",
    "features.deeplink.desc": "通过网页链接直达手机端相应章节和经文。",
    "slides.badge": "应用界面预览",
    "slides.heading": "典雅现代的诵读与阅读体验",
    "slides.subheading": "探索精心设计的移动端古兰经界面，让每一次诵读与祈祷都充满宁静。",
    "slides.prev": "上一张",
    "slides.next": "下一张",
    "slides.openInApp": "在应用中打开",
    "slides.item1.title": "Quran Ku",
    "slides.item1.tag": "首页与概览",
    "slides.item1.subtitle": "随时随地轻松诵读、背诵和参悟古兰经。",
    "slides.item1.desc": "宁静美观的界面设计，快速访问上次阅读章节与主要功能。",
    "slides.item2.title": "古兰经诵读",
    "slides.item2.tag": "经文与音频",
    "slides.item2.subtitle": "配备单节音频诵读与收藏书签功能的经文阅读页面。",
    "slides.item2.desc": "清晰优雅的阿拉伯语排版、权威印尼语翻译、名家逐节诵读和一键书签。",
    "slides.item3.title": "章节列表",
    "slides.item3.tag": "114 章与卷次",
    "slides.item3.subtitle": "展示全部114个章节，支持即时搜索与便捷导航。",
    "slides.item3.desc": "支持按章节和卷次筛选、快速查找经文，并记录最近阅读进度。",
    "slides.item4.title": "日常杜阿",
    "slides.item4.tag": "祈祷文集",
    "slides.item4.subtitle": "来自古兰经和可靠圣训的日常祈祷文大全。",
    "slides.item4.desc": "涵盖日常生活多种场景的可靠祈祷文，附带阿拉伯原文、释义及可靠出处。",
    "slides.item5.title": "书签与收藏",
    "slides.item5.tag": "收藏与历史",
    "slides.item5.subtitle": "查看和管理已收藏的喜爱经文，轻松随时温习。",
    "slides.item5.desc": "清晰管理历史诵读进度、收藏经文及常用祈祷文，助力每日功课。",
    "slides.item6.title": "章节详情",
    "slides.item6.tag": "章节资讯",
    "slides.item6.subtitle": "展示所选章节的详尽资讯，包含节数、释义及降示地点。",
    "slides.item6.desc": "包含麦加/麦地那篇章分类、总节数、全章音频诵读及快速跳转经文功能。",
    "slides.item7.title": "经文搜索",
    "slides.item7.tag": "搜索与查找",
    "slides.item7.subtitle": "支持按关键词、主题或章节编号快速搜索指定经文。",
    "slides.item7.desc": "支持按章节、经文与杜阿分类的智能搜索，搜索结果可直接复制、分享或播放音频。",
    "quran.preview.title": "开始阅读古兰经",
    "quran.preview.subtitle": "选择章节阅读经文与译文并聆听音频",
    "quran.search.placeholder": "按名称、意义或编号搜索...",
    "quran.surah.ayahs": "节",
    "quran.surah.makkiyah": "麦加篇",
    "quran.surah.madaniyah": "麦地那篇",
    "quran.action.play": "播放",
    "quran.action.pause": "暂停",
    "quran.action.copy": "复制",
    "quran.action.share": "分享",
    "quran.action.openInApp": "在应用中打开",
    "quran.action.copied": "经文已成功复制！",
    "quran.reciter.select": "选择诵读家",
    "doa.preview.title": "日常生活祈祷词",
    "doa.preview.subtitle": "来自古兰经和圣训的可靠杜阿集合",
    "doa.search.placeholder": "搜索杜阿...",
    "doa.viewAll": "查看全部杜阿",
    "cta.heading": "随时随地打开 Quran Ku",
    "cta.subheading": "在手机上享受宁静专注的古兰经阅读体验。",
    "cta.openApp": "打开应用",
    "cta.download": "下载安卓版",
    "cta.web": "在网页端阅读",
    "open.title": "正在打开 Quran Ku",
    "open.desc": "正在跳转至手机应用...",
    "open.fallback.title": "未自动打开？",
    "open.fallback.desc": "如果您尚未安装应用，可以立即下载或在网页端继续阅读。",
    "open.button.continueWeb": "在网页端继续",
    "open.button.retry": "重试打开应用",
    "open.button.download": "下载应用",
    "footer.desc": "Quran Ku 旨在帮助穆斯林更轻松地阅读、理解和实践古兰经。",
    "footer.quickLinks": "快捷链接",
    "footer.legal": "法律与条款",
    "footer.privacy": "隐私政策",
    "footer.terms": "使用条款",
    "footer.about": "关于我们",
    "footer.contact": "联系我们",
    "footer.rights": "版权所有。",
  },
};

export class LocaleTranslator {
  t(key: string, locale: SupportedLocale = DEFAULT_LOCALE): string {
    const dict = DICTIONARY[locale] || DICTIONARY[DEFAULT_LOCALE];
    return dict[key] || DICTIONARY[DEFAULT_LOCALE][key] || key;
  }
}

export const translator = new LocaleTranslator();

interface TranslatorContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  t: (key: string) => string;
}

const TranslatorContext = createContext<TranslatorContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: (key: string) => translator.t(key, DEFAULT_LOCALE),
});

export function TranslatorProvider({
  children,
  initialLocale = DEFAULT_LOCALE,
}: {
  children: ReactNode;
  initialLocale?: SupportedLocale;
}) {
  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("quranku_locale");
      if (isValidLocale(saved)) {
        setLocaleState(saved);
      }
    }
  }, []);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    if (typeof window !== "undefined") {
      localStorage.setItem("quranku_locale", newLocale);
    }
  };

  const t = (key: string) => translator.t(key, locale);

  return createElement(
    TranslatorContext.Provider,
    { value: { locale, setLocale, t } },
    children
  );
}

export function useTranslator(): TranslatorContextValue {
  return useContext(TranslatorContext);
}
