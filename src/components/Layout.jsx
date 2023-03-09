import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <div className='overall-wrapper'>
        {/* <Header /> */}
        <main>
          <Outlet />
        </main>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
