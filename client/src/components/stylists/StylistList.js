import { useEffect, useState } from "react"
import { Button, Table } from "reactstrap"
import { activateStylist, deactivateStylist, getStylists } from "../../data/stylistData"

export const StylistList = () => 
{

    const [stylists, setStylists] = useState([])
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        getStylists().then(setStylists);
    }, [clicked])

    const toggleClick = () =>{
        setClicked(!clicked)
    }

    return (
        <main>
            <section>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Active</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {stylists.map((s) => {
                            return (
                                <tr>
                                    <th>{s.id}</th>
                                    <td>{s.name}</td>
                                    <td>{s.isActive ? "Yes" : "No"}</td>
                                    {s.isActive ? (
                                        <td>
                                            <Button 
                                                onClick={() => {
                                                    deactivateStylist(s.id).then(() => {
                                                        toggleClick()
                                                    })
                                                }} 
                                                color="warning"
                                            >
                                                Deactivate
                                            </Button>
                                        </td>
                                    ):(
                                        <td>
                                            <Button 
                                                onClick={() => {
                                                    activateStylist(s.id).then(() => {
                                                        toggleClick()
                                                    })
                                                }} 
                                                color="success"
                                            >
                                                Activate
                                            </Button>
                                        </td>
                                    )}
                                    
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </section>
        </main>
    )
}