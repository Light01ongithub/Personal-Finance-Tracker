import PreviewIncome from "./PreviewIncome"
import Previewexpense from "./Previewexpense"
import "./StyleFile/Dashboard.css"
import Balance from "./Balance"


function Dashboard(){
    
    
    
    
    
    return(

        <div className="Dashboard">
            
            <h1>Dashboard</h1>
            <Balance />
            <div className="preview-container">

            <PreviewIncome />
            <Previewexpense />
            </div>
    </div>
    )
}

export default Dashboard