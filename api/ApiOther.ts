import { AdminAccount, AdminDashboard, ConsultantDashboard } from "data/dataTypes";
import Api from "./Api";



namespace ApiOther {

    export function getConsultantDashboard(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<ConsultantDashboard>('other/consultant/dashboard', '', myHeaders)
    }

    export function getAdminDashboard(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<AdminDashboard>('other/admin/dashboard', '', myHeaders)
    }

}

export default ApiOther