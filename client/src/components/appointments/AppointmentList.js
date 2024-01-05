import { useEffect, useState } from "react"
import { getAppointments } from "../../data/appointmentData";
import { Card, CardBody, CardFooter, CardGroup, CardHeader, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem } from "reactstrap";

export const AppointmentList = () =>
{

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getAppointments().then(setAppointments)
    }, [])

    return (
        <main>
            <section>
                <CardGroup >
                    {appointments.map((a) => 
                    {
                        return (
                            <Card>
                                <CardBody style={{textAlign: "left"}}>

                                    <CardTitle className="text-left" tag="h2">
                                        {a.timeInDateOnly}
                                    </CardTitle>

                                    <CardSubtitle className="mb-2 text-muted ml-5" tag="h4">
                                        {a.timeInHourOnly}
                                    </CardSubtitle>

                                    <ListGroup flush>
                                        {a.appointmentServices.map((s) => 
                                        {
                                            return (
                                                    <ListGroupItem>
                                                        {s.service.serviceName}
                                                    </ListGroupItem>
                                                    )
                                                })}
                                    </ListGroup>

                                    <CardFooter  className="mb-2 text-success">
                                        ${a.totalCost}
                                    </CardFooter>
                                </CardBody>
                            </Card>
                        )
                    })}
                </CardGroup>
            </section>
        </main>
    )
}