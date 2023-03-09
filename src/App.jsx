import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Error from './pages/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route
              element={<Layout />}>
              <Route
                index
                element={<Home />}></Route>
              {/* <Route
                path={homePath + '/detail/:checklistId'}
                element={<UpdateTask />}></Route> */}
              <Route
                path='*'
                element={<Error />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
