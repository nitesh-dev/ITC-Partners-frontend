import { ConsultantAccount } from "data/dataTypes";
import Api from "./Api";



namespace ApiConsultant {
    export function getAll() {
        // var myHeaders = new Headers();
        // myHeaders.append("x-access-token", token);
        return Api.get<ConsultantAccount[]>('consultants', '')
    }
}

export default ApiConsultant;