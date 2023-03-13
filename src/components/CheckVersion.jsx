import React, { useState, useContext, useEffect } from 'react';
import { dataContext } from '../context/dataContext';
import useLocalStorage from '../hooks/useLocalStorage';
import originData from '../data';

const CheckVersion = () => {
  const [storageVersion, setStorageVersion] = useLocalStorage('msVersion', '');
  const { setData } = useContext(dataContext);
  const currentVersion = document.body.dataset.version;

  if (!storageVersion) {
    setStorageVersion(currentVersion);
  }

  const handleDataRefresh = (e) => {
    e.preventDefault();
    setStorageVersion(currentVersion);
    setData(originData);
  };

  return (
    <>
      {storageVersion !== currentVersion ? (
        <p className='text-red-400 text-xs text-right'>
          Vypadá to, že máte zastaralou verzi. Prosím{' '}
          <span
            className='cursor-pointer underline'
            onClick={(e) => {
              handleDataRefresh(e);
            }}>
            aktualizujte data
          </span>
          .
        </p>
      ) : (
        <p className='text-green-400 text-xs text-right'>Máte aktuální verzi</p>
      )}
    </>
  );
};

export default CheckVersion;
