import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { FaWhatsapp, FaCheck, FaCrown } from 'react-icons/fa';
import './Services.css';

export default function Services() {
  const { t } = useLanguage();
  const { openContactModal } = useModal();
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', docType: '', notes: '' });

  const tiers = ['standard', 'express', 'premium'];

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const docTypes = t('services_page.form.doc_types');
    const selectedType = Array.isArray(docTypes) ? docTypes[form.docType] || form.docType : form.docType;
    const message = `Halo Lex Lingua,\n\nSaya ingin konsultasi:\n\nNama: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nJenis Dokumen: ${selectedType}\nKeterangan: ${form.notes}`;
    window.open(`https://wa.me/6281291406888?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <main id="services-page">
      <section className="page-hero section-dark">
        <div className="container">
          <h1>{t('services_page.title')}</h1>
          <p>{t('services_page.subtitle')}</p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section">
        <div className="container">
          <div className="pricing-grid">
            {tiers.map((tier) => {
              const data = t(`services_page.tiers.${tier}`);
              const isPopular = tier === 'express';
              const features = typeof data === 'object' ? data.features : [];
              return (
                <div key={tier} className={`pricing-card light-card ${isPopular ? 'popular' : ''}`}>
                  {isPopular && data.badge && <div className="popular-badge"><FaCrown /> {data.badge}</div>}
                  <h3 className="tier-name">{data.name || tier}</h3>
                  <div className="tier-price">
                    <span className="price">{data.price}</span>
                    <span className="per">{data.per}</span>
                  </div>
                  <p className="tier-turnaround">{data.turnaround}</p>
                  <ul className="tier-features">
                    {Array.isArray(features) && features.map((f, i) => (
                      <li key={i}><FaCheck /> {f}</li>
                    ))}
                  </ul>
                  <button onClick={() => openContactModal(`Layanan ${data.name || tier}`)}
                    className={`btn ${isPopular ? 'btn-primary' : 'btn-outline'} tier-btn`}>
                    <FaWhatsapp /> {t('specialization_page.cta')}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="section section-dark" id="consultation-form">
        <div className="container">
          <div className="section-header">
            <h2>{t('services_page.form_title')}</h2>
            <p>{t('services_page.form_subtitle')}</p>
          </div>
          <form className="consult-form glass-card" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('services_page.form.name')}</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>{t('services_page.form.email')}</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>{t('services_page.form.whatsapp')}</label>
                <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} required placeholder="08xxxxxxxxxx" />
              </div>
              <div className="form-group">
                <label>{t('services_page.form.doc_type')}</label>
                <select name="docType" value={form.docType} onChange={handleChange} required>
                  <option value="">{t('services_page.form.select_placeholder')}</option>
                  {Array.isArray(t('services_page.form.doc_types')) && t('services_page.form.doc_types').map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group full-width">
              <label>{t('services_page.form.notes')}</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows="4" placeholder={t('services_page.form.notes_placeholder')} />
            </div>
            <button type="submit" className="btn btn-whatsapp btn-lg">
              <FaWhatsapp size={20} /> {t('services_page.form.submit')}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
