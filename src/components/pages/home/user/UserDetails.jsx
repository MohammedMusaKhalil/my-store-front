import { useContext } from "react"
import { AppContext } from "../../../layout/Layout"
import AppBar from "../../../layout/AppBar";

export default function UserDetailsPage() {
    const appContext = useContext(AppContext)
    return <div>
            <AppBar/>
                <div className="user-details-page" style={{textAlign:"center"}}>
                    <br />
                    <h1>User Details Page</h1>
                    <br />
                    <br />
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150" />
                    <br />
                    <div className="details">
                        <br />
                        <br />
                        <p><b>name: </b> {appContext.appState?.user?.name} </p>
                        <p><b>email: </b> {appContext.appState?.user?.email} </p>
                        <p><b>role: </b> {appContext.appState?.user?.role} </p>
                        <p><b>the address: </b> {appContext.appState?.user?.address}</p>
                    </div>
                </div>
          </div>
}
