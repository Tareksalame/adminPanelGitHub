import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import adminContext from '../userContext'
import UsersList from './UsersList'

export default function Users() {

    const nav = useNavigate()
    const {setUsers,users} = useContext(adminContext)


    const showUsers = ()=>
    {
        return users.map((val)=>
        {
            return <UsersList val={val}/>
        })
    }

  return (
    <div style={{marginTop:'5%'}} id='usersDiv'>
        {showUsers()}
    </div>
  )
}
