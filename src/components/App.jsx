import { useEffect, useState } from 'react';
import { fetchImages } from 'service/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { GalleryContainer } from './App.styled';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImgs, setTotalImgs] = useState(0);

  const handleSubmit = newQuery => {
    if (!newQuery || newQuery === query) {
      return;
    }
    setQuery(query);
    setPage(1);
    setIsLoading(true);
  };

  useEffect(() => {
    fetchImages(query, page)
      .then(response => {
        setImages(prevImages => {
          return page === 1
            ? [...response.hits]
            : [...prevImages, ...response.hits];
        });
        setTotalImgs(response.totalHits);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const renderButtonOrLoder = () => {
    return isLoading ? (
      <Loader />
    ) : (
      images.length !== 0 && images.length < totalImgs && (
        <Button onClick={handleLoadMore} />
      )
    );
  };

  return (
    <GalleryContainer>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {renderButtonOrLoder()}
    </GalleryContainer>
  );
};
