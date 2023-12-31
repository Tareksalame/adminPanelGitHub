import React, { useContext, useState } from 'react'
import adminContext from '../userContext'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword(props) {
    const [email,setEmail] = useState('')
    const {setCode} = useContext(adminContext)
    const {setAdmin,req,setReq} = useContext(adminContext)
    props.setMenu(false)

    const nav = useNavigate()

    const send  = ()=>
    {
        let theEmail = email.toLowerCase()
        setReq(4)
        fetch('/sendPasswordReset' , 
        {
            headers:{
                "Content-Type": "application/json"
            },
            method:'post',
            body:JSON.stringify({
                email:theEmail,
                requist:req
            })
        }).then((res)=>{return res.json()}).then((data)=>
    {
        if(data == null)
        {
            alert('This Email was not found')
        }
        else
        {
            setCode(data)
            setAdmin(theEmail)
            nav('/codeConfirmation')
        }
    }    
        ).catch((err)=>{return err})
    }
  return (
    <div id='signInDiv'>
        <h1 className='signInTitle'>Password reset</h1>
        <input onChange={(e)=>{setEmail(e.target.value)}} placeholder='Enter Your Email' className='Inputs' type="email" />
        <button onClick={send} className='signInButton'>Send Code</button>
    </div>
  )
}
