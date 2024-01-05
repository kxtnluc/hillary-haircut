const _apiUrl = "/stylists"

export const getStylists = () =>
{
    return fetch(_apiUrl).then((r) => r.json())
}