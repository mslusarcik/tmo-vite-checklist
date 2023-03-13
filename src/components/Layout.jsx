import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className='overall-wrapper'>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
