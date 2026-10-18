import { useState,useEffect } from "react"
import "./StyleFile/BalanceCard.css"



function Balance(){
    const[transaction,setTransaction]=useState<transaction[]>([])

    type transaction={
        Type:string;
        Amount:number;
    }
    
    const get_balance=async()=>{
        const response=await fetch("http://127.0.0.1:5000/getdata")
        const result=await response.json()
        setTransaction(result)
    }

    useEffect(
        ()=>{
            get_balance()
        },[]
    )

    const income=transaction.filter((item)=>item.Type==="Income").reduce((total,amount)=>total+amount.Amount,0);

    const expense=transaction.filter((item)=>item.Type==="Expense").reduce((total,amount)=>total+amount.Amount,0);
    const balance=income-expense;
                    
    return(
        <div className="balance-card">
            <div className="balance-header">
                <span>Total Balance</span>
            </div>
            <h1>{balance.toLocaleString("en-IN")}</h1>
            <div className="balance-summary">
                <div>
                    <span>Income</span>
                    <strong>{income.toLocaleString("en-IN")}</strong>
                </div>
                <div>
                    <span>Expense</span>
                    <strong>{expense.toLocaleString("en-IN")}</strong>
                </div>
            </div>
        </div>
    )

}

export default Balance