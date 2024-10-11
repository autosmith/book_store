import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import BookStore from './Components/Book Store/BookStore'
import Login from './Components/Book Store/Login'
import Signup from './Components/Book Store/Signup'
import Forgot from './Components/Book Store/Forgot'
import NoPage from './Components/Book Store/NoPage'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path = "/home" element = {<BookStore/>}/>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/forgot" element = {<Forgot/>}/>
        <Route path = "*" element = {<NoPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
