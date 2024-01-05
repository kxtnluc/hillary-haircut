import { useEffect, useState } from "react"
import { Table } from "reactstrap"
import { getStylists } from "../../data/stylistData"

export const StylistList = () => 
{

    const [stylists, setStylists] = useState([])

    useEffect(() => {
        getStylists().then(setStylists);
    }, [])

    return (
        <main>
            <section>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stylists.map((s) => {
                            return (
                                <tr>
                                    <th>{s.id}</th>
                                    <td>{s.name}</td>
                                    <td>{s.isActive ? "Yes" : "No"}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </section>
        </main>
    )
}