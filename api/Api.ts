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

}

export default Api;