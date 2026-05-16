import { useLanguage } from '../i18n/LanguageContext';
import { useModal } from '../context/ModalContext';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const { t } = useLanguage();
  const { openContactModal } = useModal();
  
  return (
    <button 
      onClick={() => openContactModal()} 
      className="whatsapp-float" 
      id="whatsapp-float" 
      aria-label="Contact Us"
    >
      <FaWhatsapp size={28} />
    </button>
  );
}
