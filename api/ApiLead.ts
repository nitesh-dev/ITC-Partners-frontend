import { Lead } from "data/dataTypes";
import Api from "./Api";
import { stat } from "fs";



namespace ApiLead {


    export function createLead(token: string, lead: Lead){
        let data = {
            token: token,
            data: lead
        }
        return Api.post('leads', '', data)
    }

    export function getAll(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<Lead[]>('leads', '', myHeaders)
    }

    export function updateStatus(token: string, id: number, status: 'Pending'| 'Progress'| 'Approved'| 'Rejected') {
        let updateData = {
            token: token,
            data: { status: status }
        }
        return Api.put<any>(`leads/${id}`, '', updateData)
    }

    export function completeLead(token: string, id: number, amount: number) {
        let updateData = {
            token: token,
            data: { loan_amount: amount }
        }
        return Api.put<any>(`leads/${id}/complete`, '', updateData)
    }

    export function deleteAccount(token: string, id: number) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);

        return Api.deleteRequest(`leads/${id}`, myHeaders)
    }


}

export default ApiLead;