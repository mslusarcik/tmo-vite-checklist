import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import SetCompleted from '../components/SetCompleted';
import { dataContext } from '../context/dataContext';
import useLocalStorage from '../hooks/useLocalStorage';
import Markdown from 'markdown-to-jsx';
import logo from '../assets/logo.svg';
import { TbChevronLeft, TbExclamationCircle } from 'react-icons/tb';
import './Detail.scss';

const Detail = () => {
  const [content, setContent] = useState('');
  const { checklistId } = useParams();
  const { data } = useContext(dataContext);
  const [storageData, setStorageData] = useLocalStorage('msData', '[]');
  let checklistItem = null;

  if (data !== null) {
    checklistItem = data.find((item) => {
      return item.id === parseInt(checklistId);
    });
  } else if (storageData !== null || storageData.length > 0) {
    console.log('Data does exist in storage');
    console.log(storageData);
    checklistItem = storageData.find((item) => {
      return item.id === parseInt(checklistId);
    });
  } else {
    window.location.replace('/');
  }

  useEffect(() => {
    import(`../content/${checklistItem.contentFileName}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setContent(res))
          .catch((err) => setContent('Content couldn’t have been loaded.'));
      })
      .catch((err) => setContent('Content couldn’t have been loaded.'));
  });

  return (
    <>
      <Card size='lg'>
        <h1 className='mt-0 mb-6 pb-4 lg:pb-2 flex items-end lg:items-center justify-between border-b'>
          <span className='flex items-center mr-6'>
            <Link to={'/'}>
              <img
                src={logo}
                alt='Logo T-Mobile'
                className='mr-8 w-[24px] py-4 hidden lg:block'
              />
            </Link>
            {checklistItem.title}
          </span>
          <SetCompleted id={checklistItem.id}>
            {checklistItem.isCompleted ? (
              <span className='block whitespace-nowrap text-sm px-4 py-2 bg-green-100 text-green-600 rounded-8 cursor-pointer'>
                Done
              </span>
            ) : (
              <span className='block whitespace-nowrap text-sm px-4 py-2 bg-yellow-100 text-yellow-600 rounded-8 cursor-pointer'>
                To do
              </span>
            )}
          </SetCompleted>
        </h1>
        <div className='p-3 lg:p-4 mb-8 bg-blue-100 text-blue-500 rounded-lg flex items-center lg:max-w-[85%]'>
          <TbExclamationCircle className='mr-2 shrink-0'></TbExclamationCircle>
          <div className='content text-sm'>
            Nevíte si rady nebo stránku optimalizujete poprvé? Napište mi na{' '}
            <a href='mailto:miroslav.slusarcik@external.t-mobile.cz'>e-mail</a> nebo mi{' '}
            <a href='tel:miroslav.slusarcik@external.t-mobile.cz'>zavolejte</a>.
          </div>
        </div>
        <div className='content-holder lg:max-w-[85%]'>
          <Markdown>{content}</Markdown>
        </div>
        <Link
          to='/'
          className='flex items-center mt-4 no-underline'>
          <TbChevronLeft
            size={16}
            className='mr-1'></TbChevronLeft>
          Zpět
        </Link>
      </Card>
    </>
  );
};

export default Detail;
