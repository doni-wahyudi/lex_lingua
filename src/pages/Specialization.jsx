import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { FaGavel, FaGraduationCap, FaBriefcase, FaBook, FaWhatsapp, FaCheckCircle, FaLanguage } from 'react-icons/fa';
import './Specialization.css';

export default function Specialization() {
  const { t } = useLanguage();
  const { openContactModal } = useModal();

  const specs = [
    { key: 'academic', icon: <FaGraduationCap size={32} />, image: `${import.meta.env.BASE_URL}images/academic-translation.png` },
    { key: 'legal', icon: <FaGavel size={32} />, image: `${import.meta.env.BASE_URL}images/legal-translation.png` },
    { key: 'education', icon: <FaBook size={32} />, image: `${import.meta.env.BASE_URL}images/education-translation.png` },
    { key: 'business', icon: <FaBriefcase size={32} />, image: `${import.meta.env.BASE_URL}images/business-translation.png` },
  ];

  return (
    <main id="specialization-page">
      <section className="page-hero section-dark">
        <div className="container">
          <h1>{t('specialization_page.title')}</h1>
          <p>{t('specialization_page.subtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {specs.map((spec, i) => {
            const documents = t(`specialization_page.${spec.key}.documents`);
            const specTitle = t(`specialization_page.${spec.key}.title`);
            return (
              <div key={spec.key} className={`spec-detail ${i % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="spec-detail-image">
                  <img src={spec.image} alt={specTitle} />
                  <div className="spec-detail-icon">{spec.icon}</div>
                </div>
                <div className="spec-detail-content">
                  <h2>{specTitle}</h2>
                  <p className="spec-detail-desc">{t(`specialization_page.${spec.key}.desc`)}</p>
                  <p className="spec-detail-info">{t(`specialization_page.${spec.key}.details`)}</p>
                  <div className="spec-documents">
                    {Array.isArray(documents) && documents.map((doc, j) => (
                      <span key={j} className="doc-chip"><FaCheckCircle /> {doc}</span>
                    ))}
                  </div>
                  <button onClick={() => openContactModal(specTitle)} className="btn btn-primary">
                    <FaWhatsapp /> {t('specialization_page.cta')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Languages Served */}
      <section className="section section-navy" id="languages-served">
        <div className="container">
          <div className="section-header">
            <h2>{t('specialization_page.languages.title')}</h2>
            <p>{t('specialization_page.languages.subtitle')}</p>
          </div>
          <div className="languages-grid">
            {Array.isArray(t('specialization_page.languages.pairs', { returnObjects: true })) && 
             t('specialization_page.languages.pairs', { returnObjects: true }).map((pair, idx) => (
              <div key={idx} className="language-card glass-card">
                <FaLanguage className="language-icon" />
                <span>{pair}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
