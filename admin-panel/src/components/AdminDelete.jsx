import React, { useContext } from 'react'
import adminContext from '../userContext'
import { useNavigate } from 'react-router-dom'

export default function AdminDelete(props) {
    const nav = useNavigate()
    const {adminToDelete,setAdminToDelete,setCode,setChangePage} = useContext(adminContext)
    const deleteAdmin = ()=>
    {
        props.setReq(3)
        if(props.admin == props.newAdmin)
        {
            alert('admin cannot delete his email')
        }
        else
        {
                fetch('/sendPasswordReset', 
                {
                    headers:{
                        "Content-Type": "application/json"
                    },
                    method:'post',
                    body:JSON.stringify({
                        email:props.admin,
                        deletedAdmin: props.val.email,
                        requist:props.req

                    })
                }).then((res)=>{return res.json()})
                .then((data)=>
                {
                    if(data == null)
                    {
                        alert('Cannot Find This Email')
                    }
                    else
                    {
                        setCode(data)
                        setChangePage(3)
                        setAdminToDelete(props.val.email)
                        nav('/changeConfirmation')
                    }
                }).catch((err)=>{return err})
        }
        
    }


  return (
    <div id='adminsDiv'>
        <h1 style={{marginRight:'30px'}}>{props.val.email}</h1>
        <button onClick={deleteAdmin} className='signInButton'>Delete</button>
    </div>
  )
}
