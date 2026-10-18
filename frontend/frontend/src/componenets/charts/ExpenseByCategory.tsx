import { PieChart,Pie,Tooltip,Legend,Cell } from "recharts"




interface expensecategory{
    data:{
        [category:string]:number
    };
}


function ExpenseByCategory({data}:expensecategory){
    const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#0088FE",
    "#00C49F"
];
    
    
    
    
    const information=Object.entries(data).map(([category,amount],index)=>({category,amount,color: colors[index % colors.length]}))
    
    



    return(
        <div className="expensebycategory">
            <PieChart width={500} height={300}>
                <Pie 
                data={information}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                
                >
                
                {
                    information.map((entry,index)=>(
                        <Cell 
                        key={`cell-${index}`}
                        fill={entry.color}
                        
                        />
                    ))
                }
                </Pie>

                <Tooltip />
                <Legend />

            </PieChart>
        </div>
    )
}


export default ExpenseByCategory