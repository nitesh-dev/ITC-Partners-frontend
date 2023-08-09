import { ConsultantAccount } from "data/dataTypes";
import Api from "./Api";



namespace ApiConsultant {

    export async function isAccountExist(googleToken: string) {
        let data = {
            googleToken
        }
        const result = await Api.post('consultants/exists', '', data) as any
        return result.isExist as boolean
    }
    export async function signUp(googleToken: string, account: Partial<ConsultantAccount>, referralCode: string) {
        let data = {
            googleToken,
            data: account,
            referralCode: referralCode
        }
        const result = await Api.post<{jwtToken:string}>('consultants/signUp', '', data) 
        console.log(result)
     
        return result
    }
    export async function signIn(googleToken: string) {
        let data = {
            googleToken
        }
        const result = await Api.post<{jwtToken:string}>('consultants/signIn', '', data) 
        console.log(result)
        
        return result
    }

    export function createAccount(token: string, account: ConsultantAccount) {
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

export default ApiConsultant