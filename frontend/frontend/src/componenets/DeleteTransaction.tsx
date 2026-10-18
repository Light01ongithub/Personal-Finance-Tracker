import type { Transaction } from "./Transactions";
import "./StyleFile/deletetransaction.css"

interface Deletetransaction{
    onClose:()=>void;
    transaction: Transaction | null;
    onUpdate:()=>void;

}



function DeleteTransaction ({onClose,transaction,onUpdate}:Deletetransaction){
    
    

    const handle_delete=async(Id:number |undefined)=>{
        const response=await fetch(`http://127.0.0.1:5000/delete/${Id}`,{method:"DELETE"});
        const result=await response.json()
        console.log(result.message);

        if (response.ok) {
            await onUpdate();
            onClose();
            }
        
        }

    

    return(
        <div className="delete-transaction">
            <div className="delete-popup">
            <p>
            Are you sure you want to delete this transaction?
            </p>
            <div className="delete-actions">
            <button onClick={()=>{handle_delete(transaction?.Id);}}>Delete</button>
            <button onClick={onClose}>Cancle</button>
            </div>    
            </div>
        </div>
    )



}

export default DeleteTransaction