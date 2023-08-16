import React, { useContext, useState } from 'react'
import adminContext from '../userContext'
import { useNavigate } from 'react-router-dom'

export default function CodeConfirmation(props) {
    const[confirmation, setConfirmation] = useState()
    const {code} = useContext(adminContext)
    props.setMenu(false)

    const nav = useNavigate()
    const submit = ()=>
    {
        if(code != confirmation)
        {
            alert('the code is not currect')
        }
        else
        {
            nav('/passwordReset')
        }
    }
  return (
    <div id='signInDiv'>
        <h1 className='signInTitle'>Code Confirmation</h1>
        <input onChange={(e)=>{setConfirmation(e.target.value)}} placeholder='Enter the Confirmation Code' className='Inputs' type="text" />
        <h1 className='signInTitle' style={{fontSize:'15px', paddingBottom:'0px',marginBottom:'0px'}}>it may take a few seconds</h1>
        <button onClick={submit} className='signInButton'>Submit</button>
    </div>
  )
}
