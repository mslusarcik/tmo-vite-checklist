import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { dataContext } from './context/dataContext';
import useLocalStorage from './hooks/useLocalStorage';
import originData from './data';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Error from './pages/Error';

function App() {
  const [storageData, setStorageData] = useLocalStorage('msData', '[]');
  const [data, setData] = useState();

  if (!data) {
    if (storageData === null || storageData.length < 1) {
      console.log('Importing data from origin');
      setData(originData);
    } else {
      console.log('Importing data from localStorage');
      setData(JSON.parse(localStorage.getItem('msData')));
    }
  }

  useEffect(() => {
    setStorageData(data);
  }, [data]);

  return (
    <div className='App'>
      <dataContext.Provider value={{ data, setData }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path='/'
                element={
                  <Navigate
                    to={import.meta.env.BASE_URL}
                    replace
                  />
                }></Route>
              <Route
                path={import.meta.env.BASE_URL}
                element={<Home />}></Route>
              <Route
                path={import.meta.env.BASE_URL + 'detail/:checklistId'}
                element={<Detail />}></Route>
              <Route
                path='*'
                element={<Error />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </dataContext.Provider>
    </div>
  );
}

export default App;
