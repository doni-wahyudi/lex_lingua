import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { FaWhatsapp, FaUser, FaEnvelope, FaFileAlt, FaCommentAlt, FaCheckCircle } from 'react-icons/fa';
import './Services.css';

export default function Services() {
  const { t } = useLanguage();
  const { openContactModal } = useModal();
  const [form, setForm] = useState({ name: '', email: '', whatsapp: '', docType: '', notes: '' });

  const serviceKeys = ['academic_standard', 'academic_premium', 'legal', 'proofreading', 'express'];

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const docTypes = t('services_page.form.doc_types', { returnObjects: true });
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

      {/* Services List Grid */}
      <section className="section">
        <div className="container">
          <div className="services-list-grid">
            {serviceKeys.map((key) => {
              const service = t(`services_page.services.${key}`, { returnObjects: true });
              const isExpress = key === 'express';
              return (
                <div key={key} className={`service-card light-card ${isExpress ? 'express-card' : ''}`}>
                  <div className="service-card-header">
                    <h3>{service.name}</h3>
                    <div className="service-price">
                      <span className="price-val">{service.price}</span>
                      <span className="price-per">{service.per}</span>
                    </div>
                  </div>
                  <p className="service-desc">{service.desc}</p>
                  <button onClick={() => openContactModal(service.name)} className={`btn ${isExpress ? 'btn-primary' : 'btn-outline'} service-btn`}>
                    <FaWhatsapp /> {t('specialization_page.cta')}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Notes */}
          <div className="services-notes glass-card">
            <h4>{t('services_page.notes_title')}</h4>
            <ul>
              {Array.isArray(t('services_page.notes', { returnObjects: true })) && 
               t('services_page.notes', { returnObjects: true }).map((note, idx) => (
                <li key={idx}>
                  <FaCheckCircle className="note-check-icon" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
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
                <label><span><FaUser /></span> {t('services_page.form.name')}</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label><span><FaEnvelope /></span> {t('services_page.form.email')}</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label><span><FaWhatsapp /></span> {t('services_page.form.whatsapp')}</label>
                <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} required placeholder="08xxxxxxxxxx" />
              </div>
              <div className="form-group">
                <label><span><FaFileAlt /></span> {t('services_page.form.doc_type')}</label>
                <select name="docType" value={form.docType} onChange={handleChange} required>
                  <option value="">{t('services_page.form.select_placeholder')}</option>
                  {Array.isArray(t('services_page.form.doc_types', { returnObjects: true })) && 
                   t('services_page.form.doc_types', { returnObjects: true }).map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group full-width">
              <label><span><FaCommentAlt /></span> {t('services_page.form.notes')}</label>
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
