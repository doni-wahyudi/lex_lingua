import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
                src={`${import.meta.env.BASE_URL}images/logo-full.png`} 
                alt="Lex Lingua Academica" 
                className="footer-logo-img" 
              />
            </div>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>
          <div className="footer-col">
            <h4>{t('footer.quick_links')}</h4>
            <Link to="/">{t('nav.home')}</Link>
            <Link to="/specialization">{t('nav.specialization')}</Link>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/blog">{t('nav.blog')}</Link>
            <Link to="/about">{t('nav.about')}</Link>
          </div>
          <div className="footer-col">
            <h4>{t('footer.services')}</h4>
            <span>{t('specialization_preview.academic.title')}</span>
            <span>{t('specialization_preview.legal.title')}</span>
            <span>{t('specialization_preview.education.title')}</span>
            <span>{t('specialization_preview.business.title')}</span>
          </div>
          <div className="footer-col">
            <h4>{t('footer.contact')}</h4>
            <a href="https://wa.me/6281291406888" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> 0812-9140-6888
            </a>
            <a href="mailto:lexlinguaacademica@gmail.com">
              <FaEnvelope /> lexlinguaacademica@gmail.com
            </a>
            <span className="footer-address">
              <FaMapMarkerAlt /> Palembang, Sumatera Selatan
            </span>
            <span className="footer-hours">
              <FaClock /> {t('footer.hours')}
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
