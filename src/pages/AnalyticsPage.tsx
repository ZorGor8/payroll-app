//src/pages/AnaliticsPage.tsx

//Importing componetns:
import Header from "../components/Header";
import HistoryChart from "../components/HistoryChart";
import { Link } from "react-router-dom";


//Declaring the page function:

export default function AnalysticsPage () {

return(
    <div className="analytics-page-wrapper">

    <div className ="analitics-content">
        {/*Back Button  */}
     <Link to="/" className="back-link"> ← Back
      </Link>
    
     <h1 className="analytics-title">Financial Analytics</h1>
    
     <div className="chart-container-huge">
     <HistoryChart/>
     </div>
    </div>
    </div>
);
}