import { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { FaWhatsapp, FaTimes, FaUser, FaEnvelope, FaFileAlt, FaCommentAlt } from 'react-icons/fa';
import './ContactModal.css';

export default function ContactModal({ isOpen, onClose, initialDocType = '' }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    docType: '',
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      setForm(prev => ({ ...prev, docType: initialDocType }));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, initialDocType]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Future: Add database submission here
    // const response = await fetch('/api/consultation', { method: 'POST', body: JSON.stringify(form) });

    const message = `Halo Lex Lingua,\n\nSaya ingin konsultasi:\n\nNama: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nJenis Dokumen: ${form.docType}\nKeterangan: ${form.notes}`;
    
    window.open(`https://wa.me/6281291406888?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container glass-card" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FaTimes /></button>
        
        <div className="modal-header">
          <h2>{t('services_page.form_title')}</h2>
          <p>{t('services_page.form_subtitle')}</p>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label><span><FaUser /></span> {t('services_page.form.name')}</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              placeholder="Full Name"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label><span><FaEnvelope /></span> {t('services_page.form.email')}</label>
              <input 
                type="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
                placeholder="email@example.com"
              />
            </div>
            <div className="form-group">
              <label><span><FaWhatsapp /></span> {t('services_page.form.whatsapp')}</label>
              <input 
                type="tel" 
                name="whatsapp" 
                value={form.whatsapp} 
                onChange={handleChange} 
                required 
                placeholder="08xxxxxxxxxx"
              />
            </div>
          </div>

          <div className="form-group">
            <label><span><FaFileAlt /></span> {t('services_page.form.doc_type')}</label>
            <select name="docType" value={form.docType} onChange={handleChange} required>
              <option value="">{t('services_page.form.select_placeholder')}</option>
              {Array.isArray(t('services_page.form.doc_types')) && t('services_page.form.doc_types').map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label><span><FaCommentAlt /></span> {t('services_page.form.notes')}</label>
            <textarea 
              name="notes" 
              value={form.notes} 
              onChange={handleChange} 
              rows="3" 
              placeholder={t('services_page.form.notes_placeholder')}
            />
          </div>

          <button type="submit" className="btn btn-whatsapp modal-submit">
            <FaWhatsapp /> {t('services_page.form.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
