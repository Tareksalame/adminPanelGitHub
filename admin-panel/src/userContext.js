import {createContext, useEffect, useState} from 'react'

const adminContext = createContext();

export const AdminProvider = ({children})=>
{
    const[admin,setAdmin] = useState('');
    const[code,setCode] = useState('')
    const[allData , setAllData] = useState()
    const[newPassword,setNewPassword] = useState('')
    const[newPasswordConfirm,setNewPasswordConfirm] = useState('')
    const[admins,setAdmins] = useState()
    const[newEmail,setNewEmail] = useState('')
    const[changePage,setChangePage] = useState(0)
    const[newAdmin,setNewAdmin] = useState('')
    const[req,setReq] = useState(0)
    const[users,setUsers] = useState([])
    const[tickers,setTickers]= useState([])



    
    
    // useEffect(()=>
    // {
    //     fetch('/getAdmins',
    //     {
    //         headers:{
    //             "Content-Type": "application/json"
    //         },
    //         method:'post',
    //         body:JSON.stringify({
    //             email:'@',
    //         })
    //     })
    //     .then((res)=>{return res.json()})
    //     .then((data)=>{
    //         const myAdmins = data.email
    //         setAdmins(myAdmins)
    //     }).catch((err)=>{return 'error'})
    // },[])

    // console.log(admins)
    


//     console.log(admin,code);

//     // Load data from localStorage on component mount
//   useEffect(() => {
//     const savedAdmin = localStorage.getItem('myAdmin');
//     const savedCode = localStorage.getItem('myCode');
//     if (savedAdmin,savedCode) {
//       setAllData({admin : savedAdmin, code : savedCode});
//     }
//         console.log(allData);
//   }, []);

//   // Save data to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('myAdmin',admin);
//     localStorage.setItem('myCode',code);
//   }, [allData]);

//   console.log(allData);



    return (
    <adminContext.Provider value={{admin,setAdmin,code,setCode,allData,setNewPassword,newPassword,newPasswordConfirm,setNewPasswordConfirm,
        newEmail,setNewEmail,changePage,setChangePage,newAdmin,setNewAdmin,req,setReq,users,setUsers,tickers,setTickers
        }}>
        {children}
    </adminContext.Provider>
    )
}

export default adminContext