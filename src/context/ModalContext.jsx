import { createContext, useContext, useState } from 'react';
import ContactModal from '../components/ContactModal';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    initialDocType: ''
  });

  const openContactModal = (docType = '') => {
    setModalConfig({ isOpen: true, initialDocType: docType });
  };

  const closeContactModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider value={{ openContactModal }}>
      {children}
      <ContactModal 
        isOpen={modalConfig.isOpen} 
        onClose={closeContactModal} 
        initialDocType={modalConfig.initialDocType}
      />
    </ModalContext.Provider>
  );
}

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
