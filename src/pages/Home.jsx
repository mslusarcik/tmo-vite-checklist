import React from 'react';
import { useContext } from 'react';
import { dataContext } from '../context/dataContext';
import Card from '../components/Card';
import ChecklistItem from '../components/ChecklistItem';
import ResetCompleted from '../components/ResetCompleted';
import logo from '../assets/logo.svg';
import originData from '../data';

const index = () => {
  const { data, setData } = useContext(dataContext);

  const handleDataRefresh = (e) => {
    e.preventDefault();

    console.log('Trying to reset data');
    setData(originData);
  };

  return (
    <>
      <Card size='md'>
        <p className='text-red-400 text-xs text-right'>
          V případě, že máte zastaralou verzi,{' '}
          <span
            className='cursor-pointer underline'
            onClick={(e) => {
              handleDataRefresh(e);
            }}>
            aktualizujte data
          </span>
          .
        </p>
        <h1 className='mt-0 mb-2 pb-2 flex items-center'>
          <img
            src={logo}
            alt='Logo T-Mobile'
            className='mr-8 w-[24px] py-4'
          />
          SEO Checklist
        </h1>
        {data?.map((item) => {
          return (
            <ChecklistItem
              key={item.id}
              id={item.id}
              checked={item.isCompleted}
              title={item.title}></ChecklistItem>
          );
        })}
        <ResetCompleted />
      </Card>
    </>
  );
};

export default index;
