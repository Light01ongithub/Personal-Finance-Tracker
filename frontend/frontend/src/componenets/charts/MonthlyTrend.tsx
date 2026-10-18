import type { Transaction } from "../Transactions";
import { useState } from "react";
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";
import "../StyleFile/report.css"


interface monthtend{
    date:string;
    
}


function MonthlyTrend({date}:monthtend){
    const[transaction,setTransaction]=useState<Transaction[]>([])


    const get_result=async()=>{
        const response=await fetch(`http://127.0.0.1:5000/monthtrend?year=${date}`);
        const result=await response.json();
        setTransaction(result);
        
    }

    const monthlyTotal:Record<string,{income:number;expense:number;}>={};

    transaction.forEach((item)=>
    {
        const month=item.Date.split("-")[1];

        if(!monthlyTotal[month]){
            monthlyTotal[month]={
                income:0,
                expense:0
            };
        }

        if(item.Type==="Income"){
            monthlyTotal[month].income+=item.Amount;
        }
        else if(item.Type==="Expense"){
            monthlyTotal[month].expense+=item.Amount;
        }
    }
    );


    const chartdata=Object.entries(monthlyTotal).map(
        ([month,value])=>({
            month,
            income:value.income,
            expense:value.expense
        })
    );
    
    
    
    



    return(
        <div className="monthlytrend">
            
            <div className="monthlytrend-header">
            <h3>Monthly Trend</h3>

            <button onClick={get_result}>
                Generate
            </button>
            </div>


            <div className="monthlytrend-chart">

            <ResponsiveContainer width="100%" height={300}>

            <LineChart data={chartdata}
            >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />


            <Line 
                type= "monotone"
                dataKey="income"
                />

            <Line
                type="monotone"
                dataKey="expense"
                />

            </LineChart>

        </ResponsiveContainer>
            </div>


        </div>


    );



}


export default MonthlyTrend