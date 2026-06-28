'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin' || pathname === '/admin/login';

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace('/admin');
    }
    if (!loading && user && !isAdmin) {
      logout();
      router.replace('/admin');
    }
  }, [user, loading, isAdmin, isLoginPage, router, logout]);

  if (loading) {
    return (
      <div className={styles.loadingScreen}>
        <div className="spinner" />
        <p>Loading…</p>
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;
  if (!user || !isAdmin) return null;

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <span className={styles.logoIcon}>◆</span>
          <span>DecorVista <span className={styles.adminTag}>Admin</span></span>
        </div>
        <nav className={styles.nav}>
          <Link href="/admin/dashboard" className={`${styles.navItem} ${pathname === '/admin/dashboard' ? styles.active : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            Dashboard
          </Link>
          <Link href="/admin/add-product" className={`${styles.navItem} ${pathname === '/admin/add-product' ? styles.active : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add Product
          </Link>
          <Link href="/admin/products" className={`${styles.navItem} ${pathname === '/admin/products' ? styles.active : ''}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            All Products
          </Link>
        </nav>
        <div className={styles.sidebarBottom}>
          <Link href="/" className={styles.viewSite} target="_blank">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            View Site
          </Link>
          <button onClick={logout} className={styles.logoutBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.topBar}>
          <p className={styles.greeting}>Logged in as <strong>{user.email}</strong></p>
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
