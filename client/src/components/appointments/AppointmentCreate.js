import { useEffect, useState } from "react"
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap"
import { getCustomers } from "../../data/customerData"
import { getStylists } from "../../data/stylistData"
import { getServices } from "../../data/serviceData"
import { getAppointments, postAppointment } from "../../data/appointmentData"
import { postAppointmentService } from "../../data/appointmentServicesData"
import { useNavigate } from "react-router-dom"

export const AppointmentCreate = () => {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState([])
    const [stylists, setStylists] = useState([])
    const [services, setServices] = useState([])

    useEffect(() => {
        getCustomers().then(setCustomers)
        getStylists().then(setStylists)
        getServices().then(setServices)
    }, [])

    let customerId = 0;
    let stylistId = 0;
    let date = "0";
    let hour = "0";
    let selectedServices = [];

    const updateState = (e) => {
        // console.log(e.target.name)

        if(e.target.name === "customer")
        {
            customerId = e.target.value //int
        }
        if(e.target.name === "stylist")
        {
            stylistId = e.target.value //int
        }
        if(e.target.name === "date")
        {
            date = e.target.value //yyyy-MM-dd
        }
        if(e.target.name === "hour")
        {
            hour = e.target.value //13:30
        }
        if(e.target.name === "services")
        {
            const checked = e.target.checked
            const value = parseInt(e.target.value)

            console.log(checked, value)
            if(checked)
            {
                const applicationServiceObj = {
                    appointmentId: null,
                    serviceId: value
                }

                selectedServices.push(applicationServiceObj)

                // console.log(selectedServices)

            } else if (!checked) {
                selectedServices = selectedServices.filter(s => s.serviceId !== value)

                // console.log(selectedServices)
            }
        }
    }

    const handleSubmit = () => {
        console.log(`customer: ${customerId}\nstylist: ${stylistId}\ndate: ${date}\nhour: ${hour}`)
        console.log("===============================================")

        if(customerId !== 0 && stylistId !== 0 && date !== "0" && hour !== "0" && selectedServices.length > 0)
        {
            console.log("submitting!")

            const datetime = `${date}T${hour}:00`

            const appointment = {
                customerId: customerId,
                stylistId: stylistId,
                time: datetime
            }
            postAppointment(appointment).then(() => {
                getAppointments().then((aArray) => {
                    const newAppointmentId = aArray.reduce((max, current) => (current.id > max.id ? current : max), aArray[0]).id; //idont fully get this
                    for (const s of selectedServices) {
                        s.appointmentId = newAppointmentId
                        postAppointmentService(s).then(() =>
                        {
                            navigate("/appointments");
                        })
                    }
                    // console.log(1234567890,selectedServices)
                })
            })
        }
        else{
            console.log("invalid")
        }
    }

    return (
        <main>
            <section>
                <h3 className="mt-4" style={{marginLeft: "3rem"}} tag="h3">Create Appointment ~</h3>
            </section>
            <section>
                <Form className="mt-4" style={{marginLeft: "10rem", marginRight: "10rem"}}>
                    <Row>
                        <Col md={6}>
                        {/* customer */}
                            <FormGroup>
                                <Label for="Customer">Customer</Label>
                                <Input
                                    id="customerId"
                                    name="customer"
                                    type="select"
                                    onChange={updateState}
                                >

                                    <option value={0}>Select...</option>

                                    {customers.map((c) => 
                                    {
                                        return (
                                            <option value={c.id}>
                                                {c.name}
                                            </option>
                                        )
                                    })}

                                </Input>
                            </FormGroup>
                        </Col>

                        <Col md={6}>
                        {/* stylist */}
                            <FormGroup>
                                <Label for="Stylist">Stylist</Label>
                                <Input
                                    id="stylistId"
                                    name="stylist"
                                    type="select"
                                    onChange={updateState}
                                >
                                    <option value={0}>Select...</option>

                                    {stylists.map((s) => 
                                    {
                                        return (
                                            <option value={s.id}>
                                                {s.name}
                                            </option>
                                        )
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                        {/* services */}
                            <FormGroup>
                                {services.map((s) => 
                                {
                                    return (
                                        <>
                                            <Label style={{marginLeft: "3rem"}}  check>{s.serviceName}</Label>
                                            <Input name="services" onChange={updateState} value={s.id} style={{marginLeft: "0.5rem"}} type="checkbox"/>
                                        </>
                                    )
                                })}
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                        {/* time Date*/}
                            <FormGroup>
                                <Label for="date">Date</Label>
                                <Input
                                    type="date"
                                    onChange={updateState}
                                    name="date"
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                        {/* time Hour*/}
                            <FormGroup>
                                <Label for="date">Time</Label>
                                <Input
                                    type="time"
                                    onChange={updateState}
                                    name="hour"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Button onClick={handleSubmit} type="button" color="success">Submit</Button>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </section>
        </main>
    )
}