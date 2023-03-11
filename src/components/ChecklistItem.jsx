import React from 'react';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import './ChecklistItem.scss';
import SetCompleted from './SetCompleted';

const ChecklistItem = ({ id, title, checked }) => {
  return (
    <div className='flex items-center checklist-item border-b py-6'>
      <SetCompleted id={id}>
        {checked ? (
          // <FaCheckSquare
          //   className='mr-6 text-magenta mt-[3px] cursor-pointer'
          //   size={24}></FaCheckSquare>
          <span className='text-sm font-medium px-4 py-2 bg-green-100 text-green-600 rounded-8 cursor-pointer w-full mr-6 whitespace-nowrap'>
            Done
          </span>
        ) : (
          // <FaSquare
          //   className='mr-6 text-slate-400 mt-[3px] cursor-pointer'
          //   size={24}></FaSquare>
          <span className='text-sm font-medium px-4 py-2 bg-yellow-100 text-yellow-600 rounded-8 cursor-pointer w-full mr-6 whitespace-nowrap'>
            To do
          </span>
        )}
      </SetCompleted>
      <div className='content flex justify-between items-center w-full'>
        <SetCompleted id={id}>
          <h2 className='cursor-pointer'>{title || 'Title is empty'}</h2>
        </SetCompleted>
        <Link
          to={`/detail/${id}`}
          className='no-underline'>
          Detail{' '}
          <FaChevronRight
            className='inline-block ml-1'
            size={8}></FaChevronRight>
        </Link>
      </div>
    </div>
  );
};

export default ChecklistItem;
