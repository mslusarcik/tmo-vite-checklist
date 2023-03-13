import React, { useContext } from 'react';
import { dataContext } from '../context/dataContext';
import Card from '../components/Card';
import ChecklistItem from '../components/ChecklistItem';
import ResetCompleted from '../components/ResetCompleted';
import CheckVersion from '../components/CheckVersion';
import logo from '../assets/logo.svg';

const index = () => {
  const { data } = useContext(dataContext);

  if (data) {
    return (
      <>
        <Card size='md'>
          <CheckVersion />
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
  } else {
    return (
      <>
        <Card size='md'>Sorry, no data to show</Card>
      </>
    );
  }
};

export default index;
