import { useEffect, useState } from "react"
import { getCustomers } from "../../data/customerData"
import { Table } from "reactstrap"

export const CustomerList = () => 
{

    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomers().then(setCustomers);
    }, [])

    return (
        <main>
            <section>
                <Table hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((c) => {
                            return (
                                <tr>
                                    <th>{c.id}</th>
                                    <td>{c.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </section>
        </main>
    )
}