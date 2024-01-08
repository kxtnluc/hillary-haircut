const _apiUrl = "/appointments"

export const getAppointments = () => {
    return fetch(_apiUrl).then((r) => r.json());
}

export const postAppointment = (appointment) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(appointment),
    }).then((r) => r.json())
}

export const deleteAppointment = (apptId) => {
    return fetch(`${_apiUrl}/${apptId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}
    })
}