import Link from "next/link";
import { Container } from "@/client/presentation/components/ui/Container";
import { Button } from "@/client/presentation/components/ui/Button";
import { ROUTES } from "@/core/constants/routes";
import { BookOpen, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50/50 dark:bg-dark-bg flex items-center justify-center p-4 pt-24 pb-20 text-gray-900 dark:text-dark-textPrimary">
      <Container size="narrow">
        <div className="max-w-md mx-auto text-center space-y-6 bg-white dark:bg-dark-card p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-dark-border shadow-soft-lg">
          <div className="w-16 h-16 rounded-2xl bg-primary-light dark:bg-primary-1/20 text-primary-1 dark:text-primary-3 font-bold text-2xl flex items-center justify-center mx-auto">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold">Halaman Tidak Ditemukan</h1>
            <p className="text-sm text-gray-600 dark:text-dark-textMuted leading-relaxed">
              Halaman atau surah yang Anda tuju tidak tersedia atau telah dipindahkan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href={ROUTES.HOME}>
              <Button variant="primary" fullWidth size="md">
                <Home className="w-4 h-4 mr-2" />
                <span>Beranda</span>
              </Button>
            </Link>

            <Link href={ROUTES.QURAN}>
              <Button variant="secondary" fullWidth size="md">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Buka Al-Quran</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
