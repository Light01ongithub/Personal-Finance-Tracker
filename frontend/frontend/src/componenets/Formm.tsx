


function Formm(){

    const handlesubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const data={
            Date:(document.getElementById("Date")as HTMLInputElement).value,
            Type:(document.getElementById("Type")as HTMLInputElement).value,
            Category:(document.getElementById("Category")as HTMLInputElement).value,
            Description:(document.getElementById("Description")as HTMLTextAreaElement).value,
            Amount:(document.getElementById("Amount")as HTMLInputElement).value
        };
        
        const response=await fetch("http://127.0.0.1:5000/submit",
            {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
        )
        const result=await response.json()
        console.log(result.message)
    };



    return(
        <div className="container1">
            <form onSubmit={handlesubmit}>
                <input type="date" id="Date" />
                <select name="Type" id="Type">
                    <option value="">--Selecet type of the transaction--</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>
                <input type="text" placeholder="Type the caetory where you have spent or earned mony from" id="Category"/>
                <textarea name="Description" id="Description">Describe more if you want</textarea>
                <input type="number" id="Amount" placeholder="Enter the amount" min="0" step="0.01" />
                <button type="submit">Submit</button>
            </form> 
        </div>
    )
}

export default Formm