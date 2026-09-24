import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { team } from '../data/team';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaExternalLinkAlt, FaBookOpen, FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from 'react-icons/fa';
import './About.css';

const PUBLICATIONS = [
  {
    title: 'Bestuur Law Journal – Unsri',
    journal: 'Bestuur, Universitas Sebelas Maret',
    url: 'https://jurnal.uns.ac.id/bestuur/article/view/93620',
    tag: 'Hukum'
  },
  {
    title: 'Sriwijaya Law Review – Vol. 1',
    journal: 'Sriwijaya Law Review, FH Unsri',
    url: 'https://journal.fh.unsri.ac.id/index.php/sriwijayalawreview/article/view/4029',
    tag: 'Hukum'
  },
  {
    title: 'Hasanuddin Law Review',
    journal: 'Hasanuddin Law Review, Unhas',
    url: 'https://pasca.unhas.ac.id/ojs/index.php/halrev/article/view/4818',
    tag: 'Hukum'
  },
  {
    title: 'Journal of Indonesian Legal Studies – Vol. 1',
    journal: 'JILS, Universitas Negeri Semarang',
    url: 'https://journal.unnes.ac.id/sju/index.php/jils/article/view/60523',
    tag: 'Hukum Internasional'
  },
  {
    title: 'Journal of Indonesian Legal Studies – Vol. 2',
    journal: 'JILS, Universitas Negeri Semarang',
    url: 'https://journal.unnes.ac.id/sju/index.php/jils/article/view/60523',
    tag: 'Hukum Internasional'
  },
  {
    title: 'Sriwijaya Law Review – Vol. 2',
    journal: 'Sriwijaya Law Review, FH Unsri',
    url: 'https://journal.fh.unsri.ac.id/index.php/sriwijayalawreview/article/view/974',
    tag: 'Hukum'
  },
  {
    title: 'Diponegoro Law Review',
    journal: 'Diponegoro Law Review, Undip',
    url: 'https://ejournal.undip.ac.id/index.php/dlr/article/view/28029',
    tag: 'Hukum'
  },
  {
    title: 'De Jure – Law & Policy Journal',
    journal: 'De Jure, Law Policy Journal',
    url: 'https://lawpolicyjournal.id/index.php/dejure/article/view/4025',
    tag: 'Hukum & Kebijakan'
  },
  {
    title: 'Kebijakan – Law & Policy Journal',
    journal: 'Kebijakan, Law Policy Journal',
    url: 'https://lawpolicyjournal.id/index.php/kebijakan/article/view/3182',
    tag: 'Hukum & Kebijakan'
  },
];

const ACTIVITY_PHOTOS = [
  'images/activities/lex_lingua_15.jpeg',
  'images/activities/lex_lingua_16.jpeg',
  'images/activities/lex_lingua_17.jpeg',
  'images/activities/lex_lingua_18.jpeg',
  'images/activities/lex_lingua_19.jpeg',
  'images/activities/lex_lingua_20.jpeg',
  'images/activities/lex_lingua_21.jpeg',
  'images/activities/lex_lingua_22.jpeg',
  'images/activities/lex_lingua_23.jpeg',
  'images/activities/lex_lingua_24.jpeg',
  'images/activities/lex_lingua_25.jpeg',
];

function PhotoGallery({ basePath }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = useCallback(() => setLightboxIdx((i) => (i - 1 + ACTIVITY_PHOTOS.length) % ACTIVITY_PHOTOS.length), []);
  const next = useCallback(() => setLightboxIdx((i) => (i + 1) % ACTIVITY_PHOTOS.length), []);

  useEffect(() => {
    if (lightboxIdx === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };

    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIdx, prev, next]);

  return (
    <>
      <div className="gallery-grid">
        {ACTIVITY_PHOTOS.map((photo, idx) => (
          <div
            key={idx}
            className="gallery-item"
            onClick={() => openLightbox(idx)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(idx);
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`Lihat foto dokumentasi ${idx + 1}`}
          >
            <img
              src={`${basePath}${photo}`}
              alt={`Dokumentasi Kegiatan Lex Lingua ${idx + 1}`}
              loading="lazy"
              className="gallery-item-img"
            />
            <div className="gallery-item-overlay">
              <span className="gallery-view-hint">Lihat Foto</span>
            </div>
          </div>
        ))}
      </div>

      {lightboxIdx !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Tutup"><FaTimes /></button>
          <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Sebelumnya"><FaChevronLeft /></button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={`${basePath}${ACTIVITY_PHOTOS[lightboxIdx]}`}
              alt={`Dokumentasi ${lightboxIdx + 1}`}
              className="lightbox-img"
            />
          </div>
          <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Selanjutnya"><FaChevronRight /></button>
          <div className="lightbox-counter">Foto {lightboxIdx + 1} dari {ACTIVITY_PHOTOS.length}</div>
        </div>
      )}
    </>
  );
}

export default function About() {
  const { t, language } = useLanguage();
  const { openContactModal } = useModal();
  const basePath = import.meta.env.BASE_URL;

  return (
    <main id="about-page">
      <section className="page-hero section-dark about-hero">
        <div className="about-hero-bg" style={{ backgroundImage: `url(${basePath}images/about-hero.png)` }} />
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
                      src={`${basePath}${member.image.replace(/^\//, '')}`}
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

      {/* Scientific Publications */}
      <section className="section section-light" id="publications-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('about_page.publications_title')}</h2>
            <p>{t('about_page.publications_subtitle')}</p>
          </div>
          <div className="publications-grid">
            {PUBLICATIONS.map((pub, idx) => (
              <a
                key={idx}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="publication-card light-card"
              >
                <div className="pub-icon"><FaBookOpen /></div>
                <div className="pub-content">
                  <span className="pub-tag">{pub.tag}</span>
                  <h4>{pub.title}</h4>
                  <p className="pub-journal">{pub.journal}</p>
                </div>
                <div className="pub-link-icon"><FaExternalLinkAlt /></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="section" id="activities-section">
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

      {/* Photo Gallery */}
      <section className="section section-light" id="gallery-section">
        <div className="container">
          <div className="section-header">
            <h2>{t('about_page.gallery_title')}</h2>
            <p>{t('about_page.gallery_subtitle')}</p>
          </div>
          <PhotoGallery basePath={basePath} />
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
