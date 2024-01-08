import { useEffect, useState } from "react"
import { deleteAppointment, getAppointments } from "../../data/appointmentData";
import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardSubtitle, CardText, CardTitle, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";

export const AppointmentList = () =>
{

    const [appointments, setAppointments] = useState([]);
    const [modal, setModal] = useState(false);
    const [selectedAppt, setSelectedAppt] = useState({});

    const toggle = (a) => 
    {
        setModal(!modal)
        setSelectedAppt(a)

    }

    useEffect(() => {
        getAppointments().then(setAppointments)
    }, [modal])

    const handleDelete = () => {
        console.log("canceling appointment...")

        deleteAppointment(selectedAppt.id)

        toggle();
    }

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
                                    <span style={{ fontSize: "1.25rem", fontStyle: "italic" }}> ~ {a.stylist.name}</span>
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

                                <CardFooter className="mb-2 text-success">
                                    ${a.totalCost}
                                   <Button onClick={() => toggle(a)} outline size="sm" style={{ float: "right"}} color="danger">Cancel</Button>
                                    <Modal isOpen={modal} toggle={toggle} {...a}>
                                        <ModalHeader toggle={toggle}>Cancel Appointment?</ModalHeader>
                                        <ModalBody>
                                            By selecting Cancel, this appointment and all its data will be deleted and cannot be retreived.
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button  size="sm" color="secondary" onClick={toggle}>
                                                Back
                                            </Button>{' '}
                                            <Button size="sm" color="danger" onClick={handleDelete}>
                                                Delete
                                            </Button>
                                    </ModalFooter>
                                </Modal>
                                </CardFooter>
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