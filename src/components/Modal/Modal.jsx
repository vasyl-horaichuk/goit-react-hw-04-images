import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overflow, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
const modalRef = document.querySelector('#modal-root');

export const Modal = ({ user, largeImg, onClose }) => {
  useEffect(() => {
    const onCloseByEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
      window.addEventListener('keydown', onCloseByEsc);
    };
    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overflow onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImg} alt={user} />
      </ModalWindow>
    </Overflow>,
    modalRef
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
