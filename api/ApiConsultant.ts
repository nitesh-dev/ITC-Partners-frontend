import { ConsultantAccount } from "data/dataTypes";
import Api from "./Api";



namespace ApiConsultant {


    export function createAccount(token: string, account: ConsultantAccount){
        let data = {
            token: token,
            data: account
        }
        return Api.post('account', '', data)
    }

    export function getAll(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<ConsultantAccount[]>('consultants', '', myHeaders)
    }

    export function updateStatus(token: string, id: number, isApproved: boolean) {
        let updateData = {
            token: token,
            data: { is_approved: isApproved }
        }
        return Api.put<any>(`consultants/${id}`, '', updateData)
    }

    export function deleteAccount(token: string, id: number) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);

        return Api.deleteRequest(`consultants/${id}`, myHeaders)
    }


}

export default ApiConsultant;