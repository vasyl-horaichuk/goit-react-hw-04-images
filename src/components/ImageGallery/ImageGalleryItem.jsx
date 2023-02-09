import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  image: { webformatURL, user, largeImageURL },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggelModal = () => {
    setIsModalOpen(isModalOpen => !isModalOpen);
  };

  return (
    <>
      <GalleryItem onClick={handleToggelModal} className="gallery-item">
        <GalleryItemImg src={webformatURL} alt={user} />
      </GalleryItem>
      {isModalOpen && (
        <Modal
          onClose={handleToggelModal}
          largeImg={largeImageURL}
          user={user}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
  }).isRequired,
};
