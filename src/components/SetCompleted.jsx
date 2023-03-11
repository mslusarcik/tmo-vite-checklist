import React from 'react';
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';

const SetCompleted = ({ id, children }) => {
  const { data, setData } = useContext(dataContext);

  const handleCompleted = (e) => {
    e.preventDefault();

    const updatedData = data.map((item) => {
      if (item.id === id) item.isCompleted = !item.isCompleted;
      return item;
    });

    setData(updatedData);
  };
  return (
    <div
      className='btn-completed'
      onClick={(e) => {
        handleCompleted(e);
      }}>
      {children}
    </div>
  );
};

export default SetCompleted;
