import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overflow, ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';
const modalRef = document.querySelector('#modal-root');

export class Modal extends Component {
  static defaultProps = {
    largeImg: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEsc);
  }

  onCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { user, largeImg, onClose } = this.props;
    return createPortal(
      <Overflow onClick={onClose}>
        <ModalWindow>
          <img src={largeImg} alt={user} />
        </ModalWindow>
      </Overflow>,
      modalRef
    );
  }
}
