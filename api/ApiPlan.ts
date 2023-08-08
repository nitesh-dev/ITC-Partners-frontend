import { LoanSubCategory } from "data/dataTypes";
import Api from "./Api";

namespace ApiPlan {

    export function createPlan(token: string, categoryId: number, name: string, description: string){
        let data = {
            token: token,
            data: {category_id: categoryId, name: name, description: description}
        }
        return Api.post('plan', '', data)
    }

    export function updatePlan(token: string, id: number, name: string, description: string){
        let data = {
            token: token,
            data: {name: name, description: description}
        }
        return Api.put(`plan/${id}`, '', data)
    }

    export function getAll(token: string) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);
        return Api.get<LoanSubCategory[]>('plan', '', myHeaders)
    }

    export function deletePlan(token: string, id: number) {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);

        return Api.deleteRequest(`plan/${id}`, myHeaders)
    }


}

export default ApiPlan;