import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const { t, language, switchLanguage } = useLanguage();
  const { openContactModal } = useModal();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/specialization', label: t('nav.specialization') },
    { path: '/services', label: t('nav.services') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/about', label: t('nav.about') },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} id="main-navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo">
          <span className="logo-lex">LEX</span>
          <span className="logo-lingua">LINGUA</span>
        </Link>

        <div className={`navbar-links ${mobileOpen ? 'active' : ''}`}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="nav-mobile-actions">
            <div className="lang-switch-mobile">
              <button className={language === 'id' ? 'active' : ''} onClick={() => switchLanguage('id')}>ID</button>
              <span>|</span>
              <button className={language === 'en' ? 'active' : ''} onClick={() => switchLanguage('en')}>EN</button>
            </div>
            <button onClick={() => openContactModal()} className="btn btn-whatsapp nav-wa-btn">
              <FaWhatsapp /> {t('nav.contact_cta')}
            </button>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="lang-switch">
            <button className={language === 'id' ? 'active' : ''} onClick={() => switchLanguage('id')}>ID</button>
            <span className="lang-divider">|</span>
            <button className={language === 'en' ? 'active' : ''} onClick={() => switchLanguage('en')}>EN</button>
          </div>
          <button onClick={() => openContactModal()} className="btn btn-primary nav-cta">
            <FaWhatsapp /> {t('nav.contact_cta')}
          </button>
          <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      {mobileOpen && <div className="navbar-overlay" onClick={() => setMobileOpen(false)} />}
    </nav>
  );
}
