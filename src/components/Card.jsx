import React from 'react';
import './Card.scss';

const Card = ({ size, children }) => {
  let cardSize = size || 'md';

  return (
    <div className='container mx-auto px-4 card'>
      <div className={`block w-full size-${cardSize} mx-auto p-8 bg-white rounded-md shadow-lg`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
