const apiURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000'

namespace Api {

    export async function get<T>(path: string, query: string, headers: HeadersInit | undefined = undefined) {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow",
            headers: headers
        };
        const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
        const jsonData = await res.json();
        if (res.ok) {
            return jsonData as T
        } else {
            throw new Error(jsonData)
        }
    }

    export async function post<T>(path: string, query: string, body: any) {
        const requestOptions: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            redirect: "follow",
            body: JSON.stringify(body),
        };

        const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
        const jsonData = await res.json();
        if (res.ok) {
            return jsonData as T
        } else {
            throw new Error(jsonData)
        }

    }

    export async function put<T>(path: string, query: string, body: any) {
        const requestOptions: RequestInit = {
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT",
            redirect: "follow",
            body: JSON.stringify(body),
        };


        const res = await fetch(`${apiURL}/${path}?${query}`, requestOptions);
        const jsonData = await res.json();
        if (res.ok) {
            return jsonData as T
        } else {
            throw new Error(jsonData)
        }
    }


    export async function deleteRequest<T>(path: string, headers: HeadersInit) {
        const requestOptions: RequestInit = {
            method: "DELETE",
            redirect: "follow",
            headers: headers
        };


        const res = await fetch(`${apiURL}/${path}`, requestOptions);
        const jsonData = await res.json();
        if (res.ok) {
            return jsonData as T
        } else {
            throw new Error(jsonData)
        }
    }

}

export default Api;