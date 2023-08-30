import React, { useState,useEffect } from 'react'
import axios from 'axios';


export default function TickersList(props) {
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
    <div>
    <div className='tickersList' style={{display:'flex'}}>
    <h3 className='userInformations'>Tickers <br /> {props.val.Ticker}</h3>
    <h3 className='userInformations'>Quantity <br /> {props.val.Quantity}</h3>
    <h3 className='userInformations'>Price <br /> {props.val.price}</h3>
    <h3 className='userInformations'>ActualPice <br /> {price}</h3>
    <h3 className='userInformations'>ExitPrice <br /> {props.val.ExitPrice}</h3>
    <h3 className='userInformations'>StopLose <br /> {props.val.StopLose}</h3>
    <h3 className='userInformations'>TotalCost <br /> {props.val.TotalCost}</h3>
    <h3 className='userInformations'>ExpectedProfit <br /> {props.val.ExpectedProfit}</h3>
    <h3 className='userInformations'>ExpectedLose <br /> {props.val.ExpectedLose}</h3>
    </div>
    </div>
  )
}
