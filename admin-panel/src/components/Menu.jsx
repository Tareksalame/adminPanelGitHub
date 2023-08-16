import React, { useContext,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import adminContext from '../userContext'

export default function Menu() {
    const {setAdmin , admin} = useContext(adminContext)

    const {setUsers,users,ticekrs,setTickers} = useContext(adminContext)

    const nav = useNavigate()
    const signOut = ()=>
    {
        setAdmin('');
        nav('/');
    }
    const getUsers = ()=>
    {
        nav('/users')
        fetch('/getUsers').then((res)=>{return res.json()}).then((data) => {
            setUsers([...data])
        }).catch((err)=>{return err})
    }
    const getTickers = ()=>
    {
        nav('/tickers')
        fetch('/getTickers').then((res)=>{return res.json()}).then((data) => {
            setTickers([...data])
        }).catch((err)=>{return err})
    }

  return (
    <div>
        <header className='header'>
        <button onClick={()=>{nav('/adminPanel')}} className='signOutButton'>Admin</button>
        <button onClick={getUsers}   className='signOutButton'>Users</button>
        <button onClick={getTickers} className='signOutButton' >Tickers</button>
        <button onClick={signOut} className='signOutButton'>Sign Out</button>
        </header>
    </div>
  )
}
