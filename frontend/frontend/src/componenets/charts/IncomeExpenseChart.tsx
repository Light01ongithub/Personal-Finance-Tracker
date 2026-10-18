import { BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer } from "recharts";




interface IncomeExpense{
    income:number;
    expense:number;
}

function IncomeExpenseChart({income,expense}:IncomeExpense){

    const data=[
        {
            name:"Summanry",
            Income:income,
            Expense:expense
        }
    ];

    
    return(
        <div className="incomeexpensechart">
            <ResponsiveContainer width="100%" height={250}>
                
            <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip />
                <Legend/>
                <Bar dataKey="Income"/>
                <Bar dataKey="Expense"/>
            </BarChart>
            </ResponsiveContainer>
        </div>
    );

}


export default IncomeExpenseChart