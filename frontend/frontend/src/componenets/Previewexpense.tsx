import { useState,useEffect } from "react"
import "./StyleFile/preie.css"


function Previewexpense(){
	const[expense,setExpense]=useState<expense[]>([])

	type expense={
		Id:number;
		Date:string;
		Amount:number;
	}

	const prevexpense=async()=>{
		const response=await fetch("http://127.0.0.1:5000/prev_expense")
		const data=await response.json()
		setExpense(data)
	}

	useEffect(
		()=>{
			prevexpense()
		},[]
	);


	return(
		<div className="prevexpense">
				<table>
					<thead>
						<tr>
							
							<th>Date</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{
							expense.slice(0,6).map(
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


export default Previewexpense