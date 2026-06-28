'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import styles from './page.module.css';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && isAdmin) router.replace('/admin/dashboard');
  }, [user, isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      if (email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setError('Access denied. Not an admin account.');
        setLoading(false);
        return;
      }
      router.replace('/admin/dashboard');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          <span className={styles.logoText}>Decor<span className={styles.logoAccent}>Vista</span></span>
        </div>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.subtitle}>Sign in to manage your products</p>

        {error && (
          <div className={styles.error}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
              placeholder="admin@example.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? <span className="spinner" style={{width:'18px',height:'18px',borderWidth:'2px'}} /> : null}
            {loading ? 'Signing in…' : 'Sign In to Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
