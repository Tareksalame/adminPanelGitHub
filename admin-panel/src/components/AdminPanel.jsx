import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import adminContext from '../userContext'
export default function AdminPanel(props) {
    props.setMenu(true)
    const{ newPassword , setNewPassword, newEmail,setNewEmail } = useContext(adminContext)
    const{ newPasswordConfirm , setNewPasswordConfirm } =useContext(adminContext)
    const{ admin , changePage,setChangePage,setAdmin } = useContext(adminContext)
    const { setCode,newAdmin,setNewAdmin,req,setReq } = useContext(adminContext)
    

    const nav = useNavigate()

    const[choose,setChoose] = useState(0)


    const changePassword = ()=>
    {
        setReq(0)
        if(newPassword !== newPasswordConfirm)
        {
            alert('Passwords are not match')
        }else
        {
            fetch('/sendPasswordReset', 
            {
                headers:{
                    "Content-Type": "application/json"
                },
                method:'post',
                body:JSON.stringify({
                    email:admin,
                    requist:req
                })
            }).then((res)=>{return res.json()})
            .then((data)=>
            {
                setCode(data)
                setChangePage(0)
                nav('/changeConfirmation')
            }).catch((err)=>{return err})
        }
    }

    const changeEmail = ()=>
    {
        setReq(1)
        if(admin == newEmail)
        {
            alert('please enter a new email')
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
                        email:admin,
                        newEmail:newEmail,
                        requist:req
                    })
                }).then((res)=>{return res.json()})
                .then((data)=>
                {
                    if(data == null)
                    {
                        alert('Email Already Added')
                    }
                    else
                    {
                        setCode(data)
                        setAdmin(newEmail)
                        setChangePage(1)
                        nav('/changeConfirmation')
                    }
                }).catch((err)=>{return err})
        }
        
    }

    const addNewAdmin = ()=>
    {
        setReq(2)
        if(admin == newAdmin)
        {
            alert('please enter a new email')
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
                        email:admin,
                        newAdmin:newAdmin,
                        requist:req
                    })
                }).then((res)=>{return res.json()})
                .then((data)=>
                {
                    if(data == null)
                    {
                        alert('This Admin Already Added')
                    }
                    else
                    {
                        setCode(data)
                        setChangePage(2)
                        nav('/changeConfirmation')
                    }
                }).catch((err)=>{return err})
        }
        
    }

    const deleteAdmin = ()=>
    {
        setReq(3)
        if(admin == newAdmin)
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
                        email:admin,
                        deletedAdmin: newAdmin,
                        requist:req

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
                        nav('/changeConfirmation')
                    }
                }).catch((err)=>{return err})
        }
        
    }



    const chooseDiv = ()=>
    {
        if(choose == 0)
        {
            return <div className='divs'>
            <h1 className='change'>Change Password</h1>
            <input onChange={(e)=>{setNewPassword(e.target.value)}} className='Inputs' placeholder='Enter New Password' type="text" />
            <input onChange={(e)=>{setNewPasswordConfirm(e.target.value)}} style={{marginLeft:'20px',marginRight:'20px'}} className='Inputs' placeholder='Confirm Password' type="text" />
            <button onClick={changePassword} className='signInButton'>Change</button>
            </div>
        }
        else if (choose == 1)
        {
            return <div className='divs'>
        <h1 className='change'>Change My Email</h1>
        <input onChange={(e)=>{setNewEmail(e.target.value)}} className='Inputs' style={{marginLeft:'20px',marginRight:'20px'}} placeholder='Enter Your New Email' type="text" />
        <button onClick={changeEmail} className='signInButton'>Change</button>
        </div>
        }
        else if(choose == 2)
        {
            return <div className='divs'>
        <h1 className='change'>Add Another Admin</h1>
        <input onChange={(e)=>{setNewAdmin(e.target.value)}} className='Inputs' style={{marginLeft:'20px',marginRight:'20px'}} placeholder='Enter The New Admin Email' type="text" />
        <button onClick={addNewAdmin} className='signInButton'>Add</button>
        </div>
        }
        else
        {
            return <div className='divs'>
            <h1 className='change'>Delete Admin</h1>
            <input onChange={(e)=>{setNewAdmin(e.target.value)}} className='Inputs' style={{marginLeft:'20px',marginRight:'20px'}} placeholder='Enter The Email' type="text" />
            <button onClick={deleteAdmin} className='signInButton'>Delete</button>
            </div>
        }
    }

    // const [inputValue, setInputValue] = useState('');
    // const [showAlert, setShowAlert] = useState(false);
  
    // const handleInputChange = (e) => {
    //   setInputValue(e.target.value);
    // };
  
    // const handleSubmit = () => {
    //   // Handle the input value here (e.g., save it to state, perform an action, etc.)
    //   console.log('Input value:', inputValue);
  
    //   // Close the alert
    //   setShowAlert(false);
    // };
  return (
    <div id='adminPanel'>
        <div id='adminPanelMenu'>
            <button onClick={()=>{setChoose(0);setReq(0)}} className='adminPanelMenuButton'>Change Password  </button>
            <button onClick={()=>{setChoose(1);setReq(1)}} className='adminPanelMenuButton'>Change My Email  </button>
            <button onClick={()=>{setChoose(2);setReq(2)}} className='adminPanelMenuButton'>Add Another Admin</button>
            <button onClick={()=>{setChoose(3);setReq(3)}} className='adminPanelMenuButton'>Delete Admin     </button>
        </div>
        {chooseDiv()}
        
    </div>
  )
}
