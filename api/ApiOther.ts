import { AdminAccount, ConsultantDashboard } from "data/dataTypes";
import Api from "./Api";



namespace ApiAdmin {

    export function getConsultantDashboard(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<ConsultantDashboard>('other/consultant/dashboard', '', myHeaders)
    }

}

export default ApiAdmin