import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact – DecorVista',
  description: 'Get in touch with the DecorVista team.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <p className="section-label">Get In Touch</p>
            <h1 className={styles.title}>Contact Us</h1>
            <p className={styles.subtitle}>Have a question or suggestion? We'd love to hear from you.</p>
          </div>
          <div className={styles.cards}>
            <div className={styles.card}>
              <span className={styles.cardIcon}>📌</span>
              <h3>Pinterest</h3>
              <p>Follow us for daily decor inspiration and new product finds.</p>
              <a href={process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com'} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>Visit our Pinterest →</a>
            </div>
            <div className={styles.card}>
              <span className={styles.cardIcon}>📧</span>
              <h3>Email</h3>
              <p>For business inquiries, collaborations, or product suggestions.</p>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@decorvista.com'}`} className={styles.cardLink}>
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@decorvista.com'}
              </a>
            </div>
          </div>
          <div className={styles.note}>
            <p>🛍️ <strong>Note:</strong> DecorVista is a product discovery platform. We do not sell products directly — all purchases are made through the respective store (Amazon, Flipkart, IKEA, etc.) via the product links.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
