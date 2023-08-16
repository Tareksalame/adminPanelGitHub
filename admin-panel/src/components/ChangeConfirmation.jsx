import React, { useContext } from 'react'
import { useState } from 'react'
import adminContext from '../userContext'
import { useNavigate } from 'react-router-dom'

export default function ChangeConfirmation(props) {
    const[confirmation, setConfirmation] = useState('')
    const{code} = useContext(adminContext)
    const{ newPassword , setNewPassword, changePage,setChangePage } = useContext(adminContext)
    const{admin, newEmail,setNewEmail,newAdmin,setNewAdmin} = useContext(adminContext)
    const nav = useNavigate()


    props.setMenu(false)

    const submitCode = ()=>
    {
        if(code != confirmation)
        {
            alert('the code is not currect')
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
                    password:newPassword,
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data == 'Password updated successfully')
                {
                    nav('/adminPanel')
                }
                else
                {
                    alert(data)
                }
            }).catch((err)=>{return err})
        }
    }

    const emailChange = ()=>
    {
        if(code != confirmation)
        {
            alert('the code is not currect')
        }
        else
        {
            fetch('/changeEmail', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    email:admin,
                    newEmail:newEmail,
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data == 'Email updated successfully')
                {
                    alert(data)
                    nav('/adminPanel')
                }
                else
                {
                    alert(data)
                }
            }).catch((err)=>{return err})
        }
    }
    const addAdmin = ()=>
    {
        if(code != confirmation)
        {
            alert('the code is not currect')
        }
        else
        {
            fetch('/addAdmin', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    email:newAdmin,
                    password:'12345',
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data == 'Admin Added successfully')
                {
                    nav('/adminPanel')
                }
                else
                {
                    alert(data)
                }
            }).catch((err)=>{return err})
        }
    }
    const deleteAdmin = ()=>
    {
        if(code != confirmation)
        {
            alert('the code is not currect')
        }
        else
        {
            fetch('/deleteAdmin', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    email:newAdmin,
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                if(data == 'Email deleted successfully')
                {
                    nav('/adminPanel')
                }
                else
                {
                    alert(data)
                }
            }).catch((err)=>{return err})
        }
    }

    console.log(newAdmin);
    const changingPage = ()=>
    {
        if(changePage == 0)
        {
            return    <div id='signInDiv'>
            <h1 className='signInTitle'>Code Confirmation</h1>
            <input onChange={(e)=>{setConfirmation(e.target.value)}} placeholder='Enter the Confirmation Code' className='Inputs' type="text" />
            <h1 className='signInTitle' style={{fontSize:'15px', paddingBottom:'0px',marginBottom:'0px'}}>Enter The code That You have recived to your Email</h1>
            <button onClick={submitCode} className='signInButton'>Submit</button>
        </div>
        }
        else if(changePage == 1)
        {
            return  <div id='signInDiv'>
            <h1 className='signInTitle'>Code Confirmation</h1>
            <input onChange={(e)=>{setConfirmation(e.target.value)}} placeholder='Enter the Confirmation Code' className='Inputs' type="text" />
            <h1 className='signInTitle' style={{fontSize:'15px', paddingBottom:'0px',marginBottom:'0px'}}>Enter The code That You have recived to your Email</h1>
            <button onClick={emailChange} className='signInButton'>Submit</button>
        </div>
        }
        else if(changePage == 2)
        {
            return  <div id='signInDiv'>
            <h1 className='signInTitle'>Code Confirmation</h1>
            <input onChange={(e)=>{setConfirmation(e.target.value)}} placeholder='Enter the Confirmation Code' className='Inputs' type="text" />
            <h1 className='signInTitle' style={{fontSize:'15px', paddingBottom:'0px',marginBottom:'0px'}}>Enter The code That You have recived to your Email</h1>
            <button onClick={addAdmin} className='signInButton'>Submit</button>
        </div>
        }
        else
        {
            return  <div id='signInDiv'>
            <h1 className='signInTitle'>Code Confirmation</h1>
            <input onChange={(e)=>{setConfirmation(e.target.value)}} placeholder='Enter the Confirmation Code' className='Inputs' type="text" />
            <h1 className='signInTitle' style={{fontSize:'15px', paddingBottom:'0px',marginBottom:'0px'}}>Enter The code That You have recived to your Email</h1>
            <button onClick={deleteAdmin} className='signInButton'>Submit</button>
        </div>
        }
    }




  return (
    <div id='signInDiv'>
        {changingPage()}
    </div>
  )
}
