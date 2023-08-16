import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignIn from './components/SignIn';
import Background from './images/buildings.jpg'
import { AdminProvider } from './userContext';
import ForgetPassword from './components/ForgetPassword';
import AdminConfirmation from './components/AdminConfirmation';
import AdminPanel from './components/AdminPanel';
import CodeConfirmation from './components/CodeConfirmation';
import PasswordReset from './components/PasswordReset';
import Menu from './components/Menu';
import { useState } from 'react';
import Users from './components/Users';
import Tickers from './components/Tickers';
import ChangeConfirmation from './components/ChangeConfirmation';

function App() {

  const[menu,setMenu] = useState(false)
  const menuShow = ()=>
  {
    if(menu == true)
    {
      return <Menu/>
    }
  }

  

  return (
    <div className="App">
      <AdminProvider>
    <BrowserRouter>
    <img className='background' src={Background} alt="background" />
    {menuShow()}
    <Routes>
      <Route path='/' element={<SignIn setMenu={setMenu}/>}/>
      <Route path='/forgetPassword' element={<ForgetPassword setMenu={setMenu}/>}/>
      <Route path='/adminConfirmation' element={<AdminConfirmation setMenu={setMenu}/>}/>
      <Route path='/adminPanel' element={<AdminPanel setMenu={setMenu}/>}/>
      <Route path='/codeConfirmation' element={<CodeConfirmation setMenu={setMenu}/>}/>
      <Route path='/changeConfirmation' element={<ChangeConfirmation setMenu={setMenu}/>}/>
      <Route path='/passwordReset' element={<PasswordReset setMenu={setMenu}/>}/>
      <Route path='/users' element={<Users setMenu={setMenu}/>}/>
      <Route path='/tickers' element={<Tickers setMenu={setMenu}/>}/>

    </Routes>
    </BrowserRouter>
    </AdminProvider>
    </div>
  );
}

export default App;
