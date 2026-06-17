import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { FaWhatsapp, FaLock, FaClock, FaGavel, FaGraduationCap, FaBriefcase, FaGlobe, FaUsers, FaBook, FaCommentDots } from 'react-icons/fa';
import './Home.css';

const TRANSLATION_DATA = [
  {
    type: 'Academic',
    idFile: 'manuskrip_jurnal.docx',
    enFile: 'journal_manuscript.docx',
    idText: 'Tinjauan pustaka ini menguraikan metodologi penelitian...',
    enText: 'This literature review delineates the research methodology...'
  },
  {
    type: 'Legal',
    idFile: 'perjanjian_lisensi.docx',
    enFile: 'license_agreement.docx',
    idText: 'Perjanjian ini tunduk pada hukum Republik Indonesia...',
    enText: 'This Agreement shall be governed by the laws of the Republic of Indonesia...'
  },
  {
    type: 'Business',
    idFile: 'laporan_tahunan.docx',
    enFile: 'annual_report.docx',
    idText: 'Laporan ini memproyeksikan pertumbuhan pangsa pasar...',
    enText: 'This report projects the growth of market share...'
  }
];

function TranslationConsole() {
  const [index, setIndex] = useState(0);
  const [typedId, setTypedId] = useState('');
  const [showEn, setShowEn] = useState(false);
  const [translating, setTranslating] = useState(false);

  const current = TRANSLATION_DATA[index];

  useEffect(() => {
    let timer;
    let charIndex = 0;
    setTypedId('');
    setShowEn(false);
    setTranslating(false);

    const typeId = () => {
      if (charIndex < current.idText.length) {
        setTypedId(current.idText.substring(0, charIndex + 1));
        charIndex++;
        timer = setTimeout(typeId, 40);
      } else {
        setTranslating(true);
        timer = setTimeout(() => {
          setTranslating(false);
          setShowEn(true);
          timer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % TRANSLATION_DATA.length);
          }, 4500);
        }, 1000);
      }
    };

    timer = setTimeout(typeId, 500);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className="console-window">
      <div className="console-header">
        <div className="console-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="console-title">{current.type} Mode</div>
        <div className="console-badge-type">{current.type}</div>
      </div>

      <div className="console-body">
        <div className="console-panel panel-left">
          <div className="panel-tab">
            <span className="tab-icon">🇮🇩</span>
            <span className="tab-name">{current.idFile}</span>
          </div>
          <div className="panel-text-area">
            <div className="line-numbers">
              <span>1</span>
              <span>2</span>
            </div>
            <p className="panel-text">
              {typedId}
              <span className="console-cursor">|</span>
            </p>
          </div>
        </div>

        <div className="console-divider">
          {translating ? (
            <div className="translation-spinner">
              <div className="spinner-ring"></div>
              <span className="spinner-text">EN</span>
            </div>
          ) : (
            <div className="translation-arrow">&rarr;</div>
          )}
        </div>

        <div className="console-panel panel-right">
          <div className="panel-tab">
            <span className="tab-icon">🇬🇧</span>
            <span className="tab-name">{current.enFile}</span>
          </div>
          <div className="panel-text-area">
            <div className="line-numbers">
              <span>1</span>
              <span>2</span>
            </div>
            <p className={`panel-text text-translated ${showEn ? 'fade-in' : 'hidden'}`}>
              {current.enText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const { openContactModal } = useModal();
  const [currentBg, setCurrentBg] = useState(0);

  const heroBgs = [
    `${import.meta.env.BASE_URL}images/hero_1.png`,
    `${import.meta.env.BASE_URL}images/hero_2.png`,
    `${import.meta.env.BASE_URL}images/hero_3.png`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
        <div className="hero-slider">
          <div 
            className="hero-slider-inner" 
            style={{ 
              transform: `translateX(-${currentBg * (100 / heroBgs.length)}%)`, 
              width: `${heroBgs.length * 100}%` 
            }}
          >
            {heroBgs.map((bg, idx) => (
              <div
                key={idx}
                className="hero-slide"
                style={{ 
                  backgroundImage: `url(${bg})`,
                  width: `${100 / heroBgs.length}%`
                }}
              />
            ))}
          </div>
        </div>
        <div className="hero-overlay" />
        <div className="container hero-container-layout">
          <div className="hero-info fade-in-up">
            <p className="hero-tagline-small">
              <FaGlobe className="orange-icon" /> JASA PENERJEMAHAN AKADEMIK &amp; LEGAL
            </p>
            <h1 className="hero-main-title">
              Konsultasikan Kebutuhan Penerjemahan Anda <span className="highlight-italic">Sekarang</span>!
            </h1>
            <p className="hero-description">
              Lex Lingua Academica hadir untuk menerjemahkan dokumen penting Anda dengan presisi tinggi, memperhatikan kesetaraan istilah, rasa bahasa, dan standar internasional.
            </p>
            <div className="hero-badge-box">
              <div className="hero-badge">
                <span className="badge-status-dot" />
                <FaCommentDots className="badge-icon" /> {t('hero.badge_text')}
              </div>
            </div>
            <div className="hero-action-buttons">
              <button onClick={() => openContactModal()} className="btn btn-primary btn-consult">
                {t('hero.cta_consult')} <span className="btn-arrow">&rarr;</span>
              </button>
              <Link to="/services" className="btn btn-outline btn-pricing-scheme">
                {t('hero.cta_services')}
              </Link>
            </div>
          </div>

          <div className="hero-interactive-showcase fade-in-up fade-in-up-delay-1">
            <TranslationConsole />
          </div>
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
