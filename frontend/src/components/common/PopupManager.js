import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import * as popupService from '../../services/popupService';
import { usePopup } from '../../contexts/PopupContext';

// 기본적인 팝업 UI 컴포넌트 (필요에 따라 별도 파일로 분리 가능)
const Popup = ({ id, title, content, onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      border: '1px solid #ccc',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      maxWidth: '400px',
      maxHeight: '80vh',
      overflowY: 'auto',
    }}>
      <h2>{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <button onClick={onClose} style={{ marginTop: '10px' }}>닫기</button>
    </div>
  );
};

const PopupManager = () => {
  const [activePopups, setActivePopups] = useState([]);
  const location = useLocation();
  const { popupQueue, hidePopup } = usePopup();

  // Effect for fetching active popups based on path
  useEffect(() => {
    const fetchPopups = async () => {
      try {
        const currentPath = location.pathname;
        const popups = await popupService.getActivePopups(currentPath);
        
        const popupsToDisplay = popups.filter(popup => {
          if (popup.display_once_per_session) {
            const hasSeen = sessionStorage.getItem(`popup_seen_${popup.id}`);
            if (hasSeen) {
              return false;
            }
          }
          return true;
        });

        setActivePopups(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newPopups = popupsToDisplay.filter(p => !existingIds.has(p.id));
          return [...prev, ...newPopups];
        });
      } catch (error) {
        console.error('Failed to fetch popups:', error);
      }
    };

    fetchPopups();
  }, [location.pathname]);

  // Effect for handling manually triggered popups from popupQueue
  useEffect(() => {
    const processPopupQueue = async () => {
      if (popupQueue.length > 0) {
        const newPopups = [];
        for (const queuedPopup of popupQueue) {
          if (!activePopups.some(p => p.id === queuedPopup.id)) {
            try {
              const fetchedPopup = await popupService.getPopup(queuedPopup.id);
              if (fetchedPopup) {
                newPopups.push(fetchedPopup);
              }
            } catch (error) {
              console.error(`Failed to fetch popup with ID ${queuedPopup.id}:`, error);
            }
          }
        }
        if (newPopups.length > 0) {
          setActivePopups(prev => [...prev, ...newPopups]);
        }
      }
    };
    processPopupQueue();
  }, [popupQueue, activePopups]); // Added activePopups to dependency array

  const handleClosePopup = (id) => {
    setActivePopups(prev => prev.filter(popup => popup.id !== id));
    hidePopup(id); 
    sessionStorage.setItem(`popup_seen_${id}`, 'true');
  };

  return (
    <>
      {activePopups.map(popup => (
        <Popup
          key={popup.id}
          id={popup.id}
          title={popup.title}
          content={popup.content}
          onClose={() => handleClosePopup(popup.id)}
        />
      ))}
    </>
  );
};

export default PopupManager;
