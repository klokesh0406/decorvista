import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ textAlign: 'center', padding: '80px 24px 120px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🪴</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '40px', marginBottom: '12px' }}>Page Not Found</h1>
        <p style={{ color: 'var(--taupe)', fontSize: '16px', marginBottom: '32px', maxWidth: '360px', margin: '0 auto 32px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">← Back to Home</Link>
      </main>
      <Footer />
    </>
  );
}
