import type { Transaction } from "./Transactions";
import "./StyleFile/edittransaction.css"
import {  useState } from "react";

interface EditTransactionProps {
    transaction: Transaction | null;
    onClose:()=>void;
    onUpdate:()=>void;
}




function EditTransaction({transaction,onClose,onUpdate}:EditTransactionProps){
    
    const[date,setDate]=useState(transaction?.Date);
    

    const handle_submit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const Id=transaction?.Id;
        const data={
                Amount:(document.getElementById("amount")as HTMLInputElement).value,
                Category:(document.getElementById("category")as HTMLInputElement).value,
                Description:(document.getElementById("description")as HTMLTextAreaElement).value,
                Date:date,
                Type:(document.getElementById("type")as HTMLSelectElement).value
        }

        const response=await fetch(
            `http://127.0.0.1:5000/update/${Id}`,
            {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            
            }
        
        )
        const result=response.json()

        console.log(result)
        if (response.ok){
            await onUpdate();
            onClose();
        }
    }
    return(
        
            
            <div className="popup-overlay">

            <span>Edit Transaction</span>
            <div className="edit-transaction">
            <form onSubmit={handle_submit}>


            <span>Amount</span><input type="number" id="amount" defaultValue={transaction?.Amount}/>
            <span>Category</span><input type="text" id="category" defaultValue={transaction?.Category}/>
            <span>Description</span><textarea name="description" id="description">{transaction?.Description}</textarea>
            <span>Date</span><input type="date" id="date" onChange={(e)=>setDate(e.target.value)} defaultValue={transaction?.Date}/>
            <span>Type</span><select name="type" id="type" defaultValue={transaction?.Type}>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
            </select>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancle</button>



            </form>
            </div>
            
            
        </div>
    )


}



export default EditTransaction