import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import SetCompleted from '../components/SetCompleted';
import { dataContext } from '../context/dataContext';
import useLocalStorage from '../hooks/useLocalStorage';
import Markdown from 'markdown-to-jsx';
import logo from '../assets/logo.svg';
import { TbChevronLeft, TbExclamationCircle, TbChevronRight, TbLoader2 } from 'react-icons/tb';
import './Detail.scss';

const Detail = () => {
  const [content, setContent] = useState('');
  const { checklistId } = useParams();
  const { data } = useContext(dataContext);
  const [storageData] = useLocalStorage('msData', '[]');
  const navigate = useNavigate();

  const handleChecklistItem = () => {
    if (data !== null) {
      return data.find((item) => {
        return item.id === parseInt(checklistId);
      });
    } else if (storageData !== null || storageData.length > 0) {
      return storageData.find((item) => {
        return item.id === parseInt(checklistId);
      });
    } else {
      console.log('Error happend');
    }
  };

  const checklistItem = handleChecklistItem();

  useEffect(() => {
    import(`../content/${checklistItem.contentFileName}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setContent(res))
          .catch((err) => setContent('Content couldn’t have been loaded.'));
      })
      .catch((err) => setContent('Content couldn’t have been loaded.'));
  }, []);

  return (
    <>
      <Card size='lg'>
        <h1 className='mt-0 mb-6 pb-4 lg:pb-2 flex items-end lg:items-center justify-between border-b'>
          <span className='flex items-center mr-6'>
            <Link to='/'>
              <img
                src={logo}
                alt='Logo T-Mobile'
                className='mr-8 w-[24px] py-4 hidden lg:block'
              />
            </Link>
            {checklistItem.title}
          </span>
          <SetCompleted id={parseInt(checklistId)}>
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
            <a href='tel:731326653'>zavolejte</a>.
          </div>
        </div>
        <div className='content-holder lg:max-w-[85%]'>
          {content ? (
            <Markdown>{content}</Markdown>
          ) : (
            <TbLoader2
              size={24}
              className='text-magenta loader'></TbLoader2>
          )}
        </div>
        <div className='flex justify-between'>
          <Link
            to='/'
            className='flex items-center mt-12 no-underline text-sm lg:text-md'>
            <TbChevronLeft
              size={16}
              className='mr-1'></TbChevronLeft>
            Zpět na seznam
          </Link>
          {storageData.length > checklistItem.id && (
            <div className='flex items-center mt-12 no-underline text-sm lg:text-md'>
              {checklistItem.isCompleted ? (
                <Link
                  to={`/detail/${parseInt(checklistId) + 1}`}
                  className='no-underline'>
                  Další bod
                </Link>
              ) : (
                <SetCompleted
                  id={parseInt(checklistId)}
                  redirPath={`/detail/${parseInt(checklistId) + 1}`}
                  className='cursor-pointer'>
                  <span onClick={() => navigate(`/detail/${parseInt(checklistId) + 1}`)}>
                    Hotovo, pokračovat
                  </span>
                </SetCompleted>
              )}
              <TbChevronRight
                size={16}
                className='ml-1'></TbChevronRight>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default Detail;
