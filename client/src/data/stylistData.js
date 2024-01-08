const _apiUrl = "/stylists"

export const getStylists = () =>
{
    return fetch(_apiUrl).then((r) => r.json())
}

export const deactivateStylist = (id) => {
    return fetch(`${_apiUrl}/deactivate/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"}
    })
}

export const activateStylist = (id) => {
    return fetch(`${_apiUrl}/activate/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"}
    })
}