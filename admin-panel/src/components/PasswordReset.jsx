import React, { useContext, useState } from 'react'
import adminContext from '../userContext';
import { useNavigate } from 'react-router-dom';

export default function PasswordReset(props) {
    const[password,setPassword] = useState('');
    const[confirm,setConfirm] = useState('');
    const nav = useNavigate()

    const {admin} = useContext(adminContext)
    props.setMenu(false)


    const submit = ()=>
    {
        if(password != confirm)
        {
            alert('The Password & The Confirmation must be the same')
        }
        else
        {
            fetch('/changePassword', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    email:admin,
                    password:password,
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data == 'Password updated successfully')
                {
                    nav('/')
                }
                else
                {
                    alert(data)
                }
            }).catch((err)=>{return err})
        }
    }

  return (
    <div id='signInDiv'>
        <h1 className='signInTitle'>Password reset</h1>
        <input onChange={(e)=>{setPassword(e.target.value)}} placeholder='Enter Your New Password' className='Inputs' type="text" />
        <input onChange={(e)=>{setConfirm(e.target.value)}} placeholder='Confirm Your Password' className='Inputs' type="text" />
        <button onClick={submit} className='signInButton'>Submit</button>
    </div>
  )
}
