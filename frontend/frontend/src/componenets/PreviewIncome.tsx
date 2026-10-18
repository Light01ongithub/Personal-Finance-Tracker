import { useEffect,useState } from "react"
import "./StyleFile/preie.css"


function PreviewIncome(){
    const[pre_income,setPrev_income]=useState<prev_income[]>([])

    type prev_income={
        Id:number;
        Date:string;
        Amount:number;

    }
    
    const getdata=async()=>{
        const response=await fetch("http://127.0.0.1:5000/prev_income")
        const data=await response.json()
        setPrev_income(data)

    }

    useEffect(
        ()=>{
            getdata()
        },[]
    );
    
    return(
        <div className="prenin">
            <table>
                <thead>
                    <tr>
                        
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        pre_income.slice(0,6).map(
                            (item)=>(
                                <tr key={item.Id}>
                                    <td>{item.Date}</td>
                                    <td>{item.Amount}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default PreviewIncome