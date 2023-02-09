import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  static defaultProps = {
    image: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      user: PropTypes.string.isRequired,
    }).isRequired,
  };

  state = {
    isModalOpen: false,
  };

  handleToggelModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { webformatURL, user, largeImageURL } = this.props.image;
    const { isModalOpen } = this.state;
    return (
      <>
        <GalleryItem onClick={this.handleToggelModal} className="gallery-item">
          <GalleryItemImg src={webformatURL} alt={user} />
        </GalleryItem>
        {isModalOpen && (
          <Modal onClose={this.handleToggelModal} largeImg={largeImageURL} />
        )}
      </>
    );
  }
}
