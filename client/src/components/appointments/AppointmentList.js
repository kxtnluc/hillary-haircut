import { useEffect, useState } from "react"
import { deleteAppointment, getAppointments } from "../../data/appointmentData";
import { Button, Card, CardBody, CardFooter, CardGroup, CardHeader, CardSubtitle, CardText, CardTitle, Col, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { getServices } from "../../data/serviceData";
import { deleteAppointmentService, postAppointmentService } from "../../data/appointmentServicesData";

export const AppointmentList = () => {

    const [appointments, setAppointments] = useState([]);
    const [selectedAppt, setSelectedAppt] = useState({});
    const [services, setServices] = useState([]);

    const [modal, setModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    let [selectedServices, setSelectedServices] = useState([])
    let [deselectedServices, setDeselectedServices] = useState([])

    const toggle = (a) => {
        setModal(!modal)
        setEditMode(false)
        setSelectedAppt(a)

    }

    useEffect(() => {
        getAppointments().then(setAppointments)
        getServices().then(setServices)
    }, [modal])

    const handleEdit = () => {

        if(!editMode)
        {
            for (const s of services) {
                if(selectedAppt.appointmentServices?.some(service => service.serviceId === s.id))
                {
                    const apptServ = {
                        appointmentId: selectedAppt.id,
                        serviceId: s.id
                    }
                    selectedServices.push(apptServ);
                }
            }
        } else{
            selectedServices.length = 0;
        }

        console.log("=====INITIAL======")
        console.log(selectedServices)

        setEditMode(!editMode);
    }

    const handleServiceChange = (e) =>
    {
        const checked = e.target.checked
        const value = parseInt(e.target.value)
        
        
        const applicationServiceObj = {
            appointmentId: selectedAppt.id,
            serviceId: value
        }
        
        console.log("=====service======")
        console.log(checked, value)

            if(checked)
            {
                selectedServices.push(applicationServiceObj)
                deselectedServices = deselectedServices.filter(s => s.serviceId !== value)
                
                console.log("=====checked======")
                console.log("SELECTED")
                console.log(selectedServices)
                console.log("NOT")
                console.log(deselectedServices)

            } else if (!checked) {
                deselectedServices.push(applicationServiceObj)
                selectedServices = selectedServices.filter(s => s.serviceId !== value)

                console.log("=====unchecked======")
                console.log("SELECTED")
                console.log(selectedServices)
                console.log("NOT")
                console.log(deselectedServices)
            }
    }

    const handleEditSubmission = () => {
        console.log("=====SUBMIT======")
                console.log("SELECTED")
                console.log(selectedServices)
                console.log("NOT")
                console.log(deselectedServices)

        for (const add of selectedServices) {
            if(selectedAppt.appointmentServices?.every(service => service.serviceId !== add.serviceId))
            {
                console.log("add:")
                console.log(add)

                postAppointmentService(add)
            }
        }
        for (const del of deselectedServices) {
            if(selectedAppt.appointmentServices?.some(service => service.serviceId === del.serviceId))
            {
                console.log("del:")
                console.log(del)

                const apptServId = selectedAppt.appointmentServices.find(service => service.serviceId === del.serviceId).id;
                // console.log(apptServId)
                deleteAppointmentService(apptServId)
            }
        }

        //resets everything
        selectedServices.length = 0;
        deselectedServices.length = 0;
        setSelectedAppt({});

        toggle();

        // console.log("=====POSTGAME======")
        // console.log("SELECTED")
        // console.log(selectedServices)
        // console.log("NOT")
        // console.log(deselectedServices)
        // console.log(selectedAppt)

    }

    const handleDelete = () => {
        console.log("canceling appointment...")

        deleteAppointment(selectedAppt.id)

        toggle();
    }

    return (
        <main>
            <Link to="create">
                <Button className="mt-3 mb-2" style={{ marginLeft: '3rem' }} color="primary">Create</Button>
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

                                            <button onClick={() => toggle(a)} outline size="lg" style={
                                                {
                                                    padding: "0", margin: "0", background: "none", fontSize: "1.5rem", float: "right", border: "none"
                                                }
                                            }
                                                color="primary">
                                                <IoSettingsOutline type="icon" />
                                            </button>

                                            <Modal centered isOpen={modal} toggle={toggle} {...a}>
                                                {editMode ? (
                                                    <>
                                                        <ModalHeader toggle={toggle}>Edit Appointment</ModalHeader>
                                                        <ModalBody>
                                                            <Form>
                                                                <FormGroup>
                                                                    <Row>
                                                                        {services.map((s) => 
                                                                        {
                                                                            return (
                                                                                <Col key={s.id}>
                                                                                    {s.serviceName}
                                                                                    {selectedAppt.appointmentServices?.some(service => service.serviceId === s.id) ? (
                                                                                        <Input onChange={handleServiceChange} name="services" value={s.id} style={{ marginLeft: "0.3rem" }} defaultChecked={true} type="checkbox" />
                                                                                    ):(
                                                                                        <Input onChange={handleServiceChange} name="services" value={s.id} style={{ marginLeft: "0.3rem" }} type="checkbox" />
                                                                                    )}
                                                                                    
                                                                                </Col>
                                                                            )
                                                                        })}
                                                                    </Row>
                                                                </FormGroup>
                                                            </Form>
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button size="sm" color="secondary" onClick={handleEdit}>
                                                                Back
                                                            </Button>{' '}
                                                            <Button size="sm" color="success" onClick={handleEditSubmission}>
                                                                Save
                                                            </Button>
                                                        </ModalFooter>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ModalHeader toggle={toggle}>Cancel/Edit Appointment</ModalHeader>
                                                        <ModalBody>
                                                            By selecting Cancel, this appointment and all its data will be deleted and cannot be retreived.
                                                            By selecting Edit, you can change the time for the appointment, along with its selected services.
                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button size="sm" color="secondary" onClick={toggle}>
                                                                Back
                                                            </Button>{' '}
                                                            <Button size="sm" color="success" onClick={handleEdit}>
                                                                Edit
                                                            </Button>{' '}
                                                            <Button size="sm" color="danger" onClick={handleDelete}>
                                                                Delete
                                                            </Button>
                                                        </ModalFooter>
                                                    </>
                                                )}

                                            </Modal>

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