import { Commission } from "data/dataTypes";
import Api from "./Api";

namespace ApiCommission {

    export function createCommission(token: string, name: string, leadsCount: number, commissionPercentage: number){
        let data = {
            token: token,
            data: {name: name, leads_count: leadsCount, commission_percentage: commissionPercentage}
        }
        return Api.post('commission', '', data)
    }

    export function updateCommission(token: string, id: number,  name: string, leadsCount: number, commissionPercentage: number){
        let data = {
            token: token,
            data: {name: name, leads_count: leadsCount, commission_percentage: commissionPercentage}
        }
        return Api.put(`commission/${id}`, '', data)
    }

    export function getAll(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<Commission[]>('commission', '', myHeaders)
    }

    export function deletePlan(token: string, id: number) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);

        return Api.deleteRequest(`commission/${id}`, myHeaders)
    }

    export function getConsultantCommissionLevel(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<Commission>('commission/me', '', myHeaders)
    }



}

export default ApiCommission;