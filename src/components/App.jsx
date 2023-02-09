import React, { Component } from 'react';
import { fetchImages } from 'service/fetchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { GalleryContainer } from './App.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    totalImgs: 0,
  };

  handleSubmit = query => {
    if (!query || query === this.state.query) {
      return;
    }
    this.setState({ query, page: 1, isLoading: true });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      fetchImages(query, page)
        .then(response => {
          this.setState(({ images }) => ({
            images:
              page === 1 ? [...response.hits] : [...images, ...response.hits],
            totalImgs: response.totalHits,
          }));
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  renderButtonOrLoder = () => {
    return this.state.isLoading ? (
      <Loader />
    ) : (
      this.state.images.length !== 0 &&
        this.state.images.length < this.state.totalImgs && (
          <Button onClick={this.handleLoadMore} />
        )
    );
  };

  render() {
    return (
      <GalleryContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.renderButtonOrLoder()}
      </GalleryContainer>
    );
  }
}
