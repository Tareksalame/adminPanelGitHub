import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';


export default function UsersTickers(props) {
    const[price,setPrice] = useState(0)

    const apiKey = 'ci26vg1r01qqjoq0o0ngci26vg1r01qqjoq0o0o0';
    useEffect(() => {
      const fetchStockPrice = async () => {
        try {
          const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${props.val.Ticker}&token=${apiKey}`);
          const price = response.data.c;
          setPrice(price);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      if (props.val.Ticker) {
        fetchStockPrice();
      }
    }, [props.val.Ticker]);
    
  return (
    <div className='tickersDiv' style={{display:props.show}}>
    <h3 className='userInformations'>Tickers : {props.val.Ticker}</h3>
    <h3 className='userInformations'>Quantity : {props.val.Quantity}</h3>
    <h3 className='userInformations'>Price : {props.val.price}</h3>
    <h3 className='userInformations'>ActualPice : {price}</h3>
    <h3 className='userInformations'>ExitPrice : {props.val.ExitPrice}</h3>
    <h3 className='userInformations'>StopLose : {props.val.StopLose}</h3>
    <h3 className='userInformations'>TotalCost : {props.val.TotalCost}</h3>
    <h3 className='userInformations'>ExpectedProfit : {props.val.ExpectedProfit}</h3>
    <h3 className='userInformations'>ExpectedLose : {props.val.ExpectedLose}</h3>
</div>
  )
}
