import { Circles } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Circles
      height="80"
      width="80"
      color="#ff0027"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass="flex"
      visible={true}
    />
  );
};
