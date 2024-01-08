const _apiUrl = "/appointmentServices"

export const postAppointmentService = (apptServ) => {
    return fetch(_apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(apptServ),
    }).then((r) => r.json())
}

export const deleteAppointmentService = (apptServId) => {
    return fetch(`${_apiUrl}/${apptServId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
}