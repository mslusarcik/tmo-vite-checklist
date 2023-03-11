import { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { dataContext } from './context/dataContext';
import useLocalStorage from './hooks/useLocalStorage';
import originData from './data';
import Layout from './components/Layout';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Error from './pages/Error';

function App() {
  const [data, setData] = useState(null);
  const [storageData, setStorageData] = useLocalStorage('msData', '[]');

  useEffect(() => {
    if (storageData === null || storageData.length < 1) {
      console.log('Origin data');
      setData(originData);
    } else {
      console.log('Localstorage data');
      setData(JSON.parse(localStorage.getItem('msData')));
    }
  }, []);

  useEffect(() => {
    setStorageData(data);
  }, [data]);

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
