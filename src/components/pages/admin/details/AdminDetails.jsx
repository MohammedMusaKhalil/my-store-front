import { useContext } from "react"
import { AppContext } from "../../../layout/Layout"
import Dashboard from "../dashboard"

export default function AdminDetailsPage() {
    const appContext = useContext(AppContext)
    return <div>
        <Dashboard/>
                <div>
                    <div className="main_content" style={{textAlign:"center",marginTop:"50px"}}>
                    <br />
                    <h1>Admin Details Page</h1>
                    <br />
                    <br />
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                    <br />
                    <div className="details">
                        <br />
                        <br />
                        <p><b>name: </b> {appContext.appState?.user?.name} </p>
                        <p><b>email: </b> {appContext.appState?.user?.email} </p>
                        <p><b>address: </b> {appContext.appState?.user?.address} </p>
                        <p><b>role: </b> {appContext.appState?.user?.role} </p>
                    </div>
                </div>
                </div>
          </div>
}
