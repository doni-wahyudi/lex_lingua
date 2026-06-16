import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { team } from '../data/team';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './About.css';

export default function About() {
  const { t, language } = useLanguage();
  const { openContactModal } = useModal();

  return (
    <main id="about-page">
      <section className="page-hero section-dark about-hero">
        <div className="about-hero-bg" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/about-hero.png)` }} />
        <div className="about-hero-overlay" />
        <div className="container about-hero-content">
          <h1>{t('about_page.title')}</h1>
          <p>{t('about_page.subtitle')}</p>
        </div>
      </section>

      {/* Team */}
      <section className="section" id="our-team">
        <div className="container">
          <div className="section-header">
            <h2>{t('about_page.team_title')}</h2>
            <p>{t('about_page.team_subtitle')}</p>
          </div>
          <div className="team-grid">
            {team.map(member => (
              <div key={member.id} className="light-card team-card">
                <div className="team-avatar-container">
                  {member.image ? (
                    <img 
                      src={`${import.meta.env.BASE_URL}${member.image}`} 
                      alt={member.name} 
                      className="team-img" 
                      onError={(e) => { e.target.style.display = 'none'; }} 
                    />
                  ) : null}
                  <div className="team-avatar-placeholder">{member.name.charAt(0)}</div>
                </div>
                <h3>{member.name}</h3>
                <span className="team-role">{member.role[language]}</span>
                <p className="team-bio">{member.bio[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section section-light" id="activities-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('about_page.activities_title')}</h2>
            <p>{t('about_page.activities_subtitle')}</p>
          </div>
          <div className="activities-grid">
            {Array.isArray(t('about_page.activities', { returnObjects: true })) && 
             t('about_page.activities', { returnObjects: true }).map((activity, idx) => (
              <div key={idx} className="activity-card light-card fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="activity-number">{idx + 1}</div>
                <h3>{activity.title}</h3>
                <p>{activity.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Maps */}
      <section className="section" id="contact-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('about_page.contact_title')}</h2>
            <p>{t('about_page.contact_subtitle')}</p>
          </div>
          <div className="contact-layout">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon"><FaMapMarkerAlt /></div>
                <div>
                  <h4>{t('about_page.address_label')}</h4>
                  <p>{t('about_page.address')}</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaWhatsapp /></div>
                <div>
                  <h4>{t('about_page.whatsapp_label')}</h4>
                  <a href="https://wa.me/6281291406888" target="_blank" rel="noopener noreferrer">0812-9140-6888</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaEnvelope /></div>
                <div>
                  <h4>{t('about_page.email_label')}</h4>
                  <a href="mailto:lexlinguaacademica@gmail.com">lexlinguaacademica@gmail.com</a>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon"><FaClock /></div>
                <div>
                  <h4>{t('about_page.hours_label')}</h4>
                  <p>{t('about_page.hours')}</p>
                  <span className="contact-note">{t('about_page.hours_note')}</span>
                </div>
              </div>
              <button onClick={() => openContactModal()} className="btn btn-whatsapp contact-wa-btn">
                <FaWhatsapp /> {t('nav.contact_cta')}
              </button>
            </div>
            <div className="contact-map">
              <iframe
                title="Lex Lingua Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.323!2d104.7575!3d-2.9775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e3b75e8e7c1b1a7%3A0x0!2sJl.+Pedang+No.543-62%2C+20+Ilir+D.+II%2C+Kec.+Kemuning%2C+Kota+Palembang%2C+Sumatera+Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%" height="450" style={{ border: 0, borderRadius: '20px' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
