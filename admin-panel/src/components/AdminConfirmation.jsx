import React, { useContext, useState, useEffect } from 'react'
import adminContext from '../userContext'
import { useNavigate,useParams } from 'react-router-dom'

export default function AdminConfirmation(props) {
    const[confirmation, setConfirmation] = useState()
    const {code} = useContext(adminContext)
    props.setMenu(false)
    
    const nav = useNavigate()

    const check = ()=>
    {

        if(code != confirmation)
        {
            alert('code is not currect');
        }
        else
        {
            nav('/adminPanel')
        }
    }


    // const { token } = useParams();
    // const [verificationStatus, setVerificationStatus] = useState('Waiting for you verification');
  
    // useEffect(() => {
    //   fetch(`/verify/${token}`)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data == 'success') {
    //         setVerificationStatus('Verification successful. Redirecting to admin panel...');
    //         setTimeout(() => {
    //           nav('/adminPanel'); // Redirect to the admin panel route
    //         }, 2000); // Redirect after a brief delay
    //       } else {
    //         setVerificationStatus('Verification failed. Invalid or expired token.');
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error verifying token:', error);
    //     });
    // }, [token,nav]);
  

  return (
    <div id='signInDiv'>
        <h1 className='signInTitle'>Email Confirmation</h1>
        <input onChange={(e)=>{setConfirmation(e.target.value)}} placeholder='Confirmation Code' className='Inputs' type="text" />
        <h1 className='signInTitle' style={{fontSize:'15px', paddingBottom:'0px',marginBottom:'0px'}}>it may take a few seconds</h1> 
        <button onClick={check} className='signInButton'>Confirm</button>
        {/* <h1 className='signInTitle'>{verificationStatus}</h1> */}
    </div>
  )
}
