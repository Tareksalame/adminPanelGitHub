import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import adminContext from '../userContext'

export default function SignIn(props) {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const {setAdmin} = useContext(adminContext)
    const {setCode} = useContext(adminContext)
    props.setMenu(false)

    
    const nav = useNavigate()

    const check = ()=>
    {
        fetch('/check' , 
        {
          headers:{
            "Content-Type": "application/json"
        },
        method:'post',
        body:JSON.stringify({
            email:email,
            password:password,
        })
    }).then((res)=>{return res.json()}).then((data)=>
    {
        if(data == null)
        {
            alert('Your Are Not An Admin')
        }else
        {
            const myEmail = data.email
            const myPass = data.password
            const myCode = data.code
            setAdmin(myEmail)
            setCode(myCode)

            // console.log('admin : ' + myEmail , 'code : ' + myCode , 'password : ' + myPass);
            nav('/adminConfirmation')
        }
    })
    }
  return (
    <div id='signInDiv'>
        <h1 className='signInTitle'>Sign In</h1>
        <input onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' className='Inputs' type="email" />
        <input onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' className='Inputs' type="password" />
        <button onClick={check} className='signInButton'>Sign In</button>
        <h3 onClick={()=>{nav('/forgetPassword')}} className='forget'>Forget Password?</h3>
    </div>
  )
}
