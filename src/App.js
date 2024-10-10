import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import BookStore from './Components/Book Store/BookStore'
import LoginSignup from './Components/Book Store/LoginSignup'
import NoPage from './Components/Book Store/NoPage'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<BookStore/>}/>
        <Route path = "/home" element = {<BookStore/>}/>
        <Route path = "/loginsignup" element = {<LoginSignup/>}/>
        <Route path = "*" element = {<NoPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
