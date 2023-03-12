import React, { useContext } from 'react';
import { dataContext } from '../context/dataContext';

const SetCompleted = ({ id, className, children }) => {
  const { data, setData } = useContext(dataContext);

  const handleCompleted = (e) => {
    const updatedData = data.map((item) => {
      if (item.id === id) item.isCompleted = !item.isCompleted;
      return item;
    });

    setData(updatedData);
  };

  return (
    <div
      className={`btn-completed ${className}`}
      onClick={(e) => {
        handleCompleted(e);
      }}>
      {children}
    </div>
  );
};

export default SetCompleted;
