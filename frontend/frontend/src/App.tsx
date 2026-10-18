import { BrowserRouter,Route,Routes } from "react-router-dom";


import Formm from "./componenets/Formm";
import Dashboard from "./componenets/Dashboard";
import Home from "./componenets/Home";
import NavSide from "./componenets/NavSide";
import Expense from "./componenets/Expense";
import Income from "./componenets/Income";
import Report from "./componenets/Report";
import Transcation from "./componenets/Transactions";



function App(){
  return(
    <div className="container2">

        <BrowserRouter>
        <Routes>
        <Route element={<NavSide/>} >
        <Route path="/" element={<Home/>}/>
        <Route path="/form" element={<Formm/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/expense" element={<Expense/>} />
        <Route path="/income" element={<Income/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/transcation" element={<Transcation/>} />
          </Route>

        </Routes>
        
        
        </BrowserRouter>
        </div>
  )
}

export default App