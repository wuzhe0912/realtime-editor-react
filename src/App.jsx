import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from 'pages/Home/Home';
import Editor from 'pages/Editor/Editor';
import './App.css';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/editor/:roomId' element={<Editor />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
