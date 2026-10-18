import { Link, Outlet } from "react-router-dom"
import "./StyleFile/Navside.css"

function NavSide() {

    return (
        <div className="navside">
            <nav className="navbar">
                
                <ul>
                    <li>
                        <Link to="/dashboard">
                            Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link to="/transcation">
                            Transactions
                        </Link>
                    </li>

                    <li>
                        <Link to="/income">
                            Income Section
                        </Link>

                    </li>

                    <li>
                        <Link to="/expense">

                            Expense section
                        </Link>

                    </li>

                    <li>
                        <Link to="/report">
                            Report
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )

}


export default NavSide