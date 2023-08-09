import { WithdrawHistory } from "data/dataTypes";
import Api from "./Api";



namespace ApiWithdraw {


    export function createWithdraw(token: string, consultantId: number, amount: number) {
        let data = {
            token: token,
            data: {
                consultant_id: consultantId,
                amount: amount
            }
        }
        return Api.post('withdrawHistory', '', data)
    }

    export function getAll(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<WithdrawHistory[]>('withdrawHistory', '', myHeaders)
    }

    export function updateStatus(token: string, id: number, status: 'Progress' | 'Accepted' | 'Rejected') {
        let updateData = {
            token: token,
            data: {
                status: status
            }
        }
        return Api.put<any>(`withdrawHistory/${id}`, '', updateData)
    }
}

export default ApiWithdraw;