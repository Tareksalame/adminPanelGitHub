import React, { useState } from 'react'
import UsersTickers from './UsersTickers'

export default function UsersList(props) {
    const[flag,setFlag] = useState(false)
    const[show,setShow] = useState('none')
    const showMore = ()=>
    {
        if(flag == false){
            setFlag(!flag)
            setShow("flex")
        }
        else
        {
            setFlag(!flag);
            setShow("none");
        }
    }
    const tickers = ()=>
    {
        return props.val.Tickers.map((val)=>
        {
            return <UsersTickers show={show} setShow={setShow} val={val}/>
        })
    }
  return (
    <div className='userDiv'>
        <div className='startUserDiv'>
        <h3 style={{marginRight:'180px'}} className='userInformations'>Name : {props.val.userName}</h3>
        <h3 style={{marginRight:'180px'}} className='userInformations'>Email : {props.val.email}</h3>
        <h3 style={{marginRight:'180px'}} className='userInformations'>ID : {props.val.id}</h3>
        <button id='showMoreButton' onClick={showMore} >Show More</button>
        </div>
        {tickers()}
    </div>
  )
}

// userName:String,
//     password:String,
//     repetPassword:String,
//     email:String,
//     id:String,
// Tickers:[{Ticker:String,
//     Quantity:Number,
//     price:Number,
//     ActualPice:Number,
//     ExitPrice:Number,
//     StopLose:Number,
//     TotalCost:Number,
//     ExpectedProfit:Number,
//     ExpectedLose:Number}]