import React from 'react';
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';

const ResetCompleted = () => {
  const { data, setData } = useContext(dataContext);

  const handleReset = (e) => {
    e.preventDefault();

    const updatedData = data.map((item) => {
      item.isCompleted = false;
      return item;
    });

    // console.log(updatedData);
    setData(updatedData);
  };
  return (
    <span
      className='block text-red-600 text-right m-4 cursor-pointer'
      onClick={(e) => handleReset(e)}>
      Reset
    </span>
  );
};

export default ResetCompleted;
