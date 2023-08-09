import { AdminAccount } from "data/dataTypes";
import Api from "./Api";



namespace ApiAdmin {

    export async function isAdminExist() {
        let data = {
        }
        const result = await Api.post('admins/exists', '', data) as any
        return result.isExist as boolean
    }

    export async function signUp(googleToken: string, account: Partial<AdminAccount>) {
        let data = {
            googleToken,
            data: account
        }
        const result = await Api.post<{jwtToken:string}>('admins/signUp', '', data) 
        return result
    }

    export async function signIn(googleToken: string) {
        let data = {
            googleToken
        }
        const result = await Api.post<{jwtToken:string}>('admins/signIn', '', data) 
        return result
    }

   
    export function get(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<AdminAccount>('admins/me', '', myHeaders)
    }

}

export default ApiAdmin