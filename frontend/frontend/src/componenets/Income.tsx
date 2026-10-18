import type React from "react"
import { useState,useEffect } from "react";
import "./StyleFile/Income.css"




function Income(){

    const[transaction,setTransaction]=useState<transaction[]>([])
    type transaction={
        Id:number;
        Date:string;
        Category:string;
        Description:string;
        Amount:number;
        Type:string
    }
    const get_transaction=async()=>{
        const response=await fetch("http://127.0.0.1:5000/getdata");
        const result=await response.json()
        setTransaction(result)
    }
    useEffect(
        ()=>{
            get_transaction()
        },[]
    );

    const filterdata=transaction.filter((item)=>item.Type==="Income")

    const handle_submit=async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();


    const data={
        Amount:(document.getElementById("amount")as HTMLInputElement).value,
        Category:(document.getElementById("category")as HTMLInputElement).value,
        Description:(document.getElementById("description")as HTMLTextAreaElement).value,
        Date:(document.getElementById("date")as HTMLInputElement).value,
        Type:"Income"
    };
    const response=await fetch("http://127.0.0.1:5000/submit",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
    )
    if (response.ok){
        alert("information is successfully added.....");

        
        await get_transaction();
        (document.getElementById("amount") as HTMLInputElement).value = "";
        (document.getElementById("category") as HTMLSelectElement).value = "";
        (document.getElementById("description") as HTMLTextAreaElement).value = "moree about it........";
        (document.getElementById("date") as HTMLInputElement).value = "";
    }
    else{
        alert("Failed to save the information kindly contact the developer.......")
    }


}



    return(
        <div className="income-card">
        <div className="income-card-form">
            <div className="income-header">
                INCOME
            </div>
            <div>
            <span>Manage Income here</span>
            </div>
            <div className="income-form">
                <form onSubmit={handle_submit}>
                <span>Add Income</span>
                <input type="number" id="amount" placeholder="enter income" />
                <input type="text" id="category" placeholder="enter some extra information.."/>
                <textarea name="description" id="description">moree about it........</textarea>
                <input type="date" id="date" />
                <button type="submit">Add Income</button>
                </form>
            </div>
        </div>
            <div className="income-card-table">
                <h2>Income Summary</h2>
                <div className="income-table-scroll">

                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterdata.map(
                            (item)=>(
                                <tr key={item.Id}>
                                    <td>{item.Date}</td>
                                    <td>{item.Category}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.Amount}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )

}


export default Income