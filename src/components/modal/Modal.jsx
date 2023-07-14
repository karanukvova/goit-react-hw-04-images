import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect } from 'react';


export default function Modal({ selectedImage, tags, onClose, handleBackdropClick }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleBackdropClick);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keydown', handleBackdropClick);
    };
  }, [handleBackdropClick, onClose]);

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div>
        <img src={selectedImage} alt={tags} className={css.Modal} />
      </div>
    </div>
  );
}
Modal.propTypes = {
  selectedImage: PropTypes.string,
  tags: PropTypes.string,
  onClose: PropTypes.func,
};
