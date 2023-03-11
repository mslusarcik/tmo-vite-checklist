import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/Card';
import SetCompleted from '../components/SetCompleted';
import { dataContext } from '../context/dataContext';
import Markdown from 'markdown-to-jsx';
import logo from '../assets/logo.svg';
import { TbChevronLeft, TbExclamationCircle } from 'react-icons/tb';
import './Detail.scss';

const Detail = () => {
  const [content, setContent] = useState('');
  const { checklistId } = useParams();
  const { data, setData } = useContext(dataContext);
  let checklistItem = null;

  if (data !== null) {
    checklistItem = data.find((item) => {
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
        <Link
          to='/'
          className='flex items-center mb-4 no-underline'>
          <TbChevronLeft
            size={16}
            className='mr-1'></TbChevronLeft>
          Zpět
        </Link>
        <h1 className='mt-0 mb-6 pb-2 flex items-center justify-between border-b'>
          <span className='flex items-center'>
            <img
              src={logo}
              alt='Logo T-Mobile'
              className='mr-8 w-[24px] py-4'
            />
            {checklistItem.title}
          </span>
          <SetCompleted id={checklistItem.id}>
            {checklistItem.isCompleted ? (
              <span className='text-sm px-4 py-2 bg-green-100 text-green-600 rounded-8 cursor-pointer'>
                Done
              </span>
            ) : (
              <span className='text-sm px-4 py-2 bg-yellow-100 text-yellow-600 rounded-8 cursor-pointer'>
                To do
              </span>
            )}
          </SetCompleted>
        </h1>
        <div className='p-4 mb-8 bg-blue-100 text-blue-500 rounded-lg flex items-center max-w-[85%]'>
          <TbExclamationCircle className='mr-2'></TbExclamationCircle>
          <div className='content text-sm'>
            Nevíte si rady nebo stránku optimalizujete poprvé? Zavolejte mi na{' '}
            <a href='mailto:miroslav.slusarcik@external.t-mobile.cz'>
              miroslav.slusarcik@external.t-mobile.cz
            </a>{' '}
            nebo číslo <a href='tel:miroslav.slusarcik@external.t-mobile.cz'>731 326 653</a>.
          </div>
        </div>
        <div className='content-holder max-w-[85%]'>
          <Markdown>{content}</Markdown>
        </div>
      </Card>
    </>
  );
};

export default Detail;
