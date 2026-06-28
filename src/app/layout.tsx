import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/hooks/useAuth';
import './globals.css';

export const metadata: Metadata = {
  title: 'DecorVista – Discover Beautiful Decor Ideas for Every Corner',
  description: 'Explore handpicked home decor products for bedrooms, bathrooms, living rooms, kitchens, balconies, study rooms, and more. Curated for Pinterest lovers.',
  keywords: 'home decor, bedroom decor, living room ideas, bathroom decor, kitchen decor, Pinterest decor',
  openGraph: {
    title: 'DecorVista – Beautiful Home Decor Ideas',
    description: 'Discover curated home decor products for every corner of your home.',
    type: 'website',
    siteName: 'DecorVista',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{ style: { fontFamily: "'Inter', sans-serif", fontSize: '14px' } }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
