'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          <span className={styles.logoText}>Decor<span className={styles.logoAccent}>Vista</span></span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.links}>
          <Link href="/" className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}>Home</Link>
          <Link href="/categories" className={`${styles.link} ${pathname === '/categories' ? styles.active : ''}`}>Categories</Link>
          <Link href="/about" className={`${styles.link} ${pathname === '/about' ? styles.active : ''}`}>About</Link>
          <Link href="/contact" className={`${styles.link} ${pathname === '/contact' ? styles.active : ''}`}>Contact</Link>
        </div>

        {/* Pinterest CTA */}
        <a
          href={process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com'}
          target="_blank" rel="noopener noreferrer"
          className={styles.pinterestBtn}
          aria-label="Follow DecorVista on Pinterest"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
          Pinterest
        </a>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <Link href="/" className={styles.mobileLink}>Home</Link>
          <Link href="/categories" className={styles.mobileLink}>Categories</Link>
          <Link href="/about" className={styles.mobileLink}>About</Link>
          <Link href="/contact" className={styles.mobileLink}>Contact</Link>
          <a href={process.env.NEXT_PUBLIC_PINTEREST_URL || 'https://pinterest.com'} target="_blank" rel="noopener noreferrer" className={styles.mobilePinterest}>
            Follow on Pinterest →
          </a>
        </div>
      )}
    </nav>
  );
}
