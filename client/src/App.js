// import ReduxListv2 from "./Components/ReduxListv2";
import './App.css';
import {BrowserRouter as Router, Route, Routes }  from 'react-router-dom';
import ListDisplay from "./Components/ListDisplay";
import About from './Components/About'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Errorpage from './Components/Errorpage';
import Logout from './Components/Logout';

function App() {

  return (
    <div id='root'>
      <Router>
        
        <Routes>
      
          <Route path="/about" element={<About/>} />
        
          <Route path="/login" element={<Login/>} />
        
          <Route path="/signup" element={<Signup/>} />

          <Route path="/logout" element={<Logout/>} />

          <Route path="*" element={<Errorpage/>}/>

          <Route exact path='/' element={<ListDisplay />}></Route>

          <Route path='/todolist3/react' element={<ListDisplay />}></Route>

          {/* <Route path='/todolist3/redux' element={<ReduxListv2 />}></Route> */}
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
