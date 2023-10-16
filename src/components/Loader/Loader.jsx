import React from 'react';
import { RingLoader } from 'react-spinners';

const loaderStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Loader = () => {
  return (
    <div style={loaderStyle}>
      <RingLoader size={80} color={'#ff4b4b'} loading={true} />
    </div>
  );
};

export default Loader;
