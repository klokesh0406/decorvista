import { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About – DecorVista',
  description: 'Learn about DecorVista, your trusted source for curated home decor ideas and products.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={`container ${styles.inner}`}>
          <div className={styles.header}>
            <p className="section-label">Our Story</p>
            <h1 className={styles.title}>About DecorVista</h1>
          </div>
          <div className={styles.content}>
            <p>DecorVista is a curated home decor discovery platform built for people who love beautiful spaces. We handpick the best products from trusted stores like Amazon, Flipkart, and IKEA — so you don't have to spend hours searching.</p>
            <p>Whether you're designing a cozy bedroom, a functional study room, or a lush balcony garden, our categorized product collections help you find inspiration and the right products quickly.</p>
            <h2>What We Do</h2>
            <p>Every product on DecorVista is manually curated and reviewed before being added. We focus on quality, aesthetics, and value — filtering out the noise so you only see products worth considering for your home.</p>
            <h2>Our Mission</h2>
            <p>We believe everyone deserves a home that feels beautiful and personal. DecorVista's mission is to make discovering and buying great home decor easy, inspiring, and enjoyable.</p>
            <h2>Connect With Us</h2>
            <p>We share daily decor inspiration on Pinterest. <a href={process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com'} target="_blank" rel="noopener noreferrer" className={styles.pinterestLink}>Follow DecorVista on Pinterest →</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
