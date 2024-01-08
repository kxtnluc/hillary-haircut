import { useEffect, useState } from "react"
import { getAppointments } from "../../data/appointmentData";
import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

export const AppointmentList = () =>
{

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        getAppointments().then(setAppointments)
    }, [])

    return (
        <main>
            <Link to="create">
                <Button className="mt-3 mb-2" style={{marginLeft: '3rem'}} color="primary">Create</Button>
            </Link>

            <section>
                <CardGroup style={{ marginLeft: '3rem', marginRight: '3rem' }}>
                    <div className="row">
                    {appointments.map((a, index) => (
                        <div key={index} className="col-md-3">
                        <Card>
                            <CardBody style={{ textAlign: 'left' }}>
                                <CardTitle className="text-left" tag="h2">
                                    {a.timeInDateOnly.startsWith('0') ? a.timeInDateOnly.slice(1) : a.timeInDateOnly}
                                </CardTitle>

                                <CardSubtitle className="mb-2 text-muted ml-5" tag="h4">
                                    {a.customer.name} @{a.timeInHourOnly}
                                </CardSubtitle>

                                <ListGroup flush>
                                    {a.appointmentServices.map((s, serviceIndex) => (
                                    <ListGroupItem key={serviceIndex}>
                                        {s.service.serviceName}
                                    </ListGroupItem>
                                    ))}
                                </ListGroup>

                                <CardFooter className="mb-2 text-success">${a.totalCost}</CardFooter>
                            </CardBody>
                        </Card>
                        </div>
                    ))}
                    </div>
                </CardGroup>
        </section>      

        </main>
    )
}