import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meniu & Preturi',
  description: 'Meniul complet Vibe Caffe, cu preturi actualizate si optiuni pentru fiecare preferinta.',
};

export default function MeniuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
