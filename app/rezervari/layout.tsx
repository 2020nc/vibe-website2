import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rezervă o Masă',
  description:
    'Rezervă o masă la Vibe Caffè, Bld. Regina Elisabeta 30, București. ' +
    'Formular rapid, confirmare în cel mai scurt timp. Program: Luni–Duminică 08:00–22:00.',
  openGraph: {
    title: 'Rezervă o Masă | Vibe Caffè',
    description: 'Rezervă rapid o masă la Vibe Caffè București. Confirmare promptă.',
  },
};

export default function RezervariLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
