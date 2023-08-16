import React, { useContext } from 'react'
import adminContext from '../userContext'
import TickersList from './TickersList';

export default function Tickers() {
    const {tickers} = useContext(adminContext);

    const showTickers = ()=>
    {
        return tickers.map((val)=>
        {
            return <TickersList val={val}/>
        })
    }
  return (
    <div id='tickersDiv'>
        {showTickers()}
    </div>
  )
}
