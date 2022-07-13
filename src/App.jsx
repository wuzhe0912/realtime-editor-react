import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from 'pages/Home/Home';
import Editor from 'pages/Editor/Editor';
import './App.css';

function App() {
  return (
    <>
      <Toaster
        position='top-center'
        toastOptions={{
          success: {
            theme: {
              primary: '#00bcd4',
            },
          },
        }}
      ></Toaster>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/editor/:roomId' element={<Editor />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
