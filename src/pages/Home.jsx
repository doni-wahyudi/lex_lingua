import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { FaWhatsapp, FaLock, FaClock, FaGavel, FaGraduationCap, FaBriefcase, FaGlobe, FaUsers, FaBook } from 'react-icons/fa';
import './Home.css';

export default function Home() {
  const { t } = useLanguage();
  const { openContactModal } = useModal();

  const advantages = [
    { icon: <FaGraduationCap />, key: 'terminology' },
    { icon: <FaGlobe />, key: 'cultural' },
    { icon: <FaLock />, key: 'confidential' },
    { icon: <FaClock />, key: 'process' },
    { icon: <FaUsers />, key: 'team' },
  ];

  const specializations = [
    { icon: <FaGraduationCap />, key: 'academic', image: `${import.meta.env.BASE_URL}images/academic-translation.png` },
    { icon: <FaGavel />, key: 'legal', image: `${import.meta.env.BASE_URL}images/legal-translation.png` },
    { icon: <FaBook />, key: 'education', image: `${import.meta.env.BASE_URL}images/education-translation.png` },
    { icon: <FaBriefcase />, key: 'business', image: `${import.meta.env.BASE_URL}images/business-translation.png` },
  ];

  return (
    <main id="home-page">
      {/* Hero */}
      <section className="hero section-dark" id="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-bg.png)` }} />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <p className="hero-brand fade-in-up">LEX LINGUA ACADEMICA</p>
          <h1 className="hero-tagline fade-in-up fade-in-up-delay-1">
            <span className="shimmer-text">{t('hero.tagline')}</span>
          </h1>
          <p className="hero-subtitle fade-in-up fade-in-up-delay-2">{t('hero.subtitle')}</p>
          <div className="hero-actions fade-in-up fade-in-up-delay-3">
            <button onClick={() => openContactModal()} className="btn btn-primary">
              <FaWhatsapp /> {t('hero.cta_consult')}
            </button>
            <Link to="/services" className="btn btn-outline">{t('hero.cta_services')}</Link>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
        </div>
      </section>

      {/* Short Description */}
      <section className="section section-light description-section" id="description">
        <div className="container">
          <div className="description-content fade-in-up">
            <h2>{t('description.title')}</h2>
            <p>{t('description.text')}</p>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section section-light" id="advantages">
        <div className="container">
          <div className="section-header">
            <h2>{t('advantages.title')}</h2>
            <p>{t('advantages.subtitle')}</p>
          </div>
          <div className="advantages-grid">
            {advantages.map((adv, i) => (
              <div key={adv.key} className={`light-card advantage-card fade-in-up fade-in-up-delay-${i + 1}`}>
                <div className="advantage-icon">{adv.icon}</div>
                <h3>{t(`advantages.${adv.key}.title`)}</h3>
                <p>{t(`advantages.${adv.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Preview */}
      <section className="section section-dark" id="specializations-preview">
        <div className="container">
          <div className="section-header">
            <h2>{t('specialization_preview.title')}</h2>
            <p>{t('specialization_preview.subtitle')}</p>
          </div>
          <div className="spec-grid">
            {specializations.map((spec) => (
              <Link to="/specialization" key={spec.key} className="glass-card spec-card">
                <div className="spec-card-img" style={{ backgroundImage: `url(${spec.image})` }} />
                <div className="spec-card-content">
                  <div className="spec-icon">{spec.icon}</div>
                  <h3>{t(`specialization_preview.${spec.key}.title`)}</h3>
                  <p>{t(`specialization_preview.${spec.key}.desc`)}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/specialization" className="btn btn-outline">{t('specialization_preview.view_all')}</Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section section-dark cta-banner" id="cta-banner">
        <div className="container cta-banner-content">
          <h2>{t('cta_banner.title')}</h2>
          <p>{t('cta_banner.subtitle')}</p>
          <button onClick={() => openContactModal()} className="btn btn-whatsapp btn-lg">
            <FaWhatsapp size={20} /> {t('cta_banner.button')}
          </button>
        </div>
      </section>
    </main>
  );
}
