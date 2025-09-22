import { createContext, useContext, useState } from 'react';

export const PopupContext = createContext(null);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

export const PopupProvider = ({ children }) => {
  const [popupQueue, setPopupQueue] = useState([]); // { id: 'popupId', data: {} }

  const showPopup = (id, data = {}) => {
    setPopupQueue(prev => [...prev, { id, data }]);
  };

  const hidePopup = (id) => {
    setPopupQueue(prev => prev.filter(popup => popup.id !== id));
  };

  const value = {
    popupQueue,
    showPopup,
    hidePopup,
  };

  return <PopupContext.Provider value={value}>{children}</PopupContext.Provider>;
};
