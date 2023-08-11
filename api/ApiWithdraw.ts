import { WithdrawHistory, WithdrawPage } from "data/dataTypes";
import Api from "./Api";



namespace ApiWithdraw {

    export function createWithdraw(token: string, amount: number) {
        let data = {
            token: token,
            data: {
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

    export function getWithdrawPage(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<WithdrawPage>('withdrawHistory/page', '', myHeaders)
    }

    export function updateStatus(token: string, id: number, status: 'Progress' | 'Accepted' | 'Rejected') {
        let updateData = {
            token: token,
            data: {
                status: status
            }
        }

        console.log(updateData)
        return Api.put<any>(`withdrawHistory/${id}`, '', updateData)
    }
}

export default ApiWithdraw;