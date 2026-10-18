import "./StyleFile/report.css"
import { useState } from "react"
import type{ Transaction } from "./Transactions"
import IncomeExpenseChart from "./charts/IncomeExpenseChart"
import ExpenseByCategory from "./charts/ExpenseByCategory"
import MonthlyTrend from "./charts/MonthlyTrend"



function Report(){
    const[month,setMonth]=useState("")
    const[year,setYear]=useState("")
    const[transaction,setTransaction]=useState<Transaction[]>([])


    const handle_event=async()=>{
        const respnse=await fetch(`http://127.0.0.1:5000/report?month=${month}&year=${year}`);
        const result=await respnse.json()
        setTransaction(result)
        
        
    }
    
    const income=transaction.filter((item)=>item.Type==="Income").reduce((sum,item)=>sum+item.Amount,0)
    const expense=transaction.filter((item)=>item.Type==="Expense").reduce((sum,item)=>sum+item.Amount,0)
    
    
    // const balance=income-expense

    const expensecategory=transaction.filter((item)=>item.Type==="Expense").reduce(
        (result,item)=>{
            if(result[item.Category]){
                result[item.Category]+=item.Amount;
            }
            else{
                result[item.Category]=item.Amount;
            }
            return result
        },{} as Record<string,number>);
    
    

    return(
        <div className="Reports">
            <div className="report-filter">
                <select name="month" id="month" onChange={(e)=>setMonth(e.target.value)}>
                    <option value="1">jan</option>
                    <option value="2">feb</option>
                    <option value="3">mar</option>
                    <option value="4">april</option>
                    <option value="5">may</option>
                    <option value="6">jun</option>
                    <option value="7">july</option>
                    <option value="8">aug</option>
                    <option value="9">sep</option>
                    <option value="10">oct</option>
                    <option value="11">nov</option>
                    <option value="12">dec</option>
                </select>

                <input type="text" placeholder="Year" onChange={(e)=>setYear(e.target.value)}/>

                <button onClick={handle_event}>Generate</button>
                </div>
            
            <div className="report-charts">

                <div className="report-chart">
                    <h3>Income vs Expense</h3>
                    <IncomeExpenseChart income={income} expense={expense}/>
                </div>

                <div className="report-chart">
                    <h3>Expense by Category</h3>
                    <ExpenseByCategory data={expensecategory}/>
                </div>

                <div className="report-chart monthly-trend">
                    <MonthlyTrend  date={year}/>
                </div>

            </div>

        </div>
        
    )



}


export default Report