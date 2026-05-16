import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { FaWhatsapp, FaShieldAlt, FaLock, FaClock, FaMoneyBillWave, FaGavel, FaGraduationCap, FaBriefcase, FaStethoscope, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { testimonials } from '../data/testimonials';
import './Home.css';

function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        const start = 0;
        const startTime = performance.now();
        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * (end - start) + start));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const { t, language } = useLanguage();
  const { openContactModal } = useModal();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const advantages = [
    { icon: <FaShieldAlt />, key: 'certified' },
    { icon: <FaLock />, key: 'confidential' },
    { icon: <FaClock />, key: 'ontime' },
    { icon: <FaMoneyBillWave />, key: 'transparent' },
  ];

  const specializations = [
    { icon: <FaGavel />, key: 'legal', image: `${import.meta.env.BASE_URL}images/legal-translation.png` },
    { icon: <FaGraduationCap />, key: 'academic', image: `${import.meta.env.BASE_URL}images/academic-translation.png` },
    { icon: <FaBriefcase />, key: 'business', image: `${import.meta.env.BASE_URL}images/business-translation.png` },
    { icon: <FaStethoscope />, key: 'medical', image: `${import.meta.env.BASE_URL}images/medical-translation.png` },
  ];

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

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

      {/* Stats */}
      <section className="section section-navy" id="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number"><CountUp end={500} suffix="+" /></div>
              <p>{t('stats.documents')}</p>
            </div>
            <div className="stat-item">
              <div className="stat-number"><CountUp end={50} suffix="+" /></div>
              <p>{t('stats.clients')}</p>
            </div>
            <div className="stat-item">
              <div className="stat-number"><CountUp end={4} /></div>
              <p>{t('stats.specializations')}</p>
            </div>
            <div className="stat-item">
              <div className="stat-number"><CountUp end={10} suffix="+" /></div>
              <p>{t('stats.experience')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" id="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>{t('testimonials.title')}</h2>
            <p>{t('testimonials.subtitle')}</p>
          </div>
          <div className="testimonial-carousel">
            <button className="carousel-btn prev" onClick={prevTestimonial}><FaChevronLeft /></button>
            <div className="testimonial-card light-card">
              <div className="testimonial-stars">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="testimonial-content">"{testimonials[currentTestimonial].content[language]}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonials[currentTestimonial].name.charAt(0)}</div>
                <div>
                  <strong>{testimonials[currentTestimonial].name}</strong>
                  <span>{testimonials[currentTestimonial].role[language]}</span>
                </div>
              </div>
            </div>
            <button className="carousel-btn next" onClick={nextTestimonial}><FaChevronRight /></button>
          </div>
          <div className="carousel-dots">
            {testimonials.map((_, i) => (
              <button key={i} className={`dot ${i === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(i)} />
            ))}
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
