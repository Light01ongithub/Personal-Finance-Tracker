import { useState,useEffect } from "react"
import "./StyleFile/Transaction.css"
import EditTransaction from "./EditTransaction"
import DeleteTransaction from "./DeleteTransaction";




export interface Transaction{
            Id:number;
            Date:string;
            Type:string;
            Category:string;
            Description:string;
            Amount:number;
        }


function Transcation(){
        const[transaction,setTransaction]=useState<Transaction[]>([])
        const[search,setSearch]=useState("search tranasction by category.......")
        const[date,setDate]=useState("")

        const[appliedSearch,setAppliedSearch]=useState("All")
        const[appliedDate,setAppliedDate]=useState("All")

        const[selecttransaction,setSelecttransaction]=useState<Transaction|null>(null)
        const[popup,setPopup]=useState("null")


        

        const get_transaction=async()=>{
            const response=await fetch("http://127.0.0.1:5000/getdata")
            const result=await response.json()
            setTransaction(result)
        }

        useEffect(
            ()=>{
                get_transaction()
            },[]
        );

        const filteredsearch=transaction.filter(
            (item)=>{
                const matchsearch=
                appliedSearch==="All" || item.Category.toLowerCase().includes(appliedSearch.toLowerCase());

                const matchdate=
                appliedDate==="All" || item.Date.toLowerCase().includes(appliedDate.toLowerCase());

                return matchdate&&matchsearch;
            }
        );



        return(
            <div className="Transactions">
                <div className="transaction-header">
                    Transaction
                </div>
                <div>
                    <span>Manage your transaction here</span>
                </div>
                <div className="transaction-search">
                    <input type="text" id="Search" placeholder={search} onChange={(e)=>setSearch(e.target.value)} />
                    <input type="date" id="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
                    <button onClick={
                        ()=>{
                            setAppliedSearch(search);
                            setAppliedDate(date);
                        }
                        }>🔍</button>
                </div>
                <div className="transaction-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            filteredsearch.map((item)=>(
                                <tr key={item.Id}>
                                        <td>{item.Date}</td>
                                        <td>{item.Type}</td>
                                        <td>{item.Category}</td>
                                        <td>{item.Description}</td>
                                        <td>{item.Amount}</td>
                                        <td>
                                        <div className="action-buttons">
                                        <button onClick={()=>{setSelecttransaction(item); setPopup("edit");}} >Edit</button>
                                        <button onClick={()=>{setPopup("delete"); setSelecttransaction(item);}}>Delete</button>
                                        </div>
                                        </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
                            <div className="popup-window">
                                {
                                    popup==="edit" &&(
                                            <EditTransaction transaction={selecttransaction} onClose={()=>setPopup("null")} onUpdate={get_transaction}/>
                                        
                                    )
                                }

                                {
                                    popup==="delete" &&(
                                        <DeleteTransaction transaction={selecttransaction} onClose={()=>setPopup("null") } onUpdate={get_transaction} />
                                    )
                                }
                            </div>
            </div>
        )
}


export default Transcation