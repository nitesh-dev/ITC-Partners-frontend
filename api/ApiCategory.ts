import { LoanCategory } from "data/dataTypes";
import Api from "./Api";
import { stat } from "fs";



namespace ApiLead {


    export function createCategory(token: string, name: string){
        let data = {
            token: token,
            data: {name: name}
        }
        return Api.post('category', '', data)
    }

    export function updateCategory(token: string, id: number, name: string){
        let data = {
            token: token,
            data: {name: name}
        }
        return Api.put(`category/${id}`, '', data)
    }

    export function getAll(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<LoanCategory[]>('category', '', myHeaders)
    }

    export function deleteCategory(token: string, id: number) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);

        return Api.deleteRequest(`category/${id}`, myHeaders)
    }


}

export default ApiLead;