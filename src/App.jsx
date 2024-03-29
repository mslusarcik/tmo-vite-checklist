import React, { useState, useEffect } from 'react';
import { BrowserRouter, HashRouter, Route, Routes, Navigate } from 'react-router-dom';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className='App'>
      <dataContext.Provider value={{ data, setData }}>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route
                index
                element={<Home />}></Route>
              <Route
                path={'/detail/:checklistId'}
                element={<Detail />}></Route>
              <Route
                path='*'
                element={<Error />}></Route>
            </Route>
          </Routes>
        </HashRouter>
      </dataContext.Provider>
    </div>
  );
}

export default App;
