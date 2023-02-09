import { ButtonLoadMore } from './Button.styled';
import { TiArrowSync } from 'react-icons/ti';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <ButtonLoadMore type="button" onClick={onClick}>
      <TiArrowSync size={25} stroke="white" />
      Load more
    </ButtonLoadMore>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
