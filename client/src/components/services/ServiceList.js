import { useEffect, useState } from "react"
import { Card, CardFooter, CardGroup, CardText, CardTitle } from "reactstrap"
import { getServices } from "../../data/serviceData"

export const ServiceList = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        getServices().then(setServices);
    }, [])


    return (
        <main>
            <section>
                <CardGroup>
                    {services.map((s) => {
                        return (
                            <Card>

                                <CardTitle tag="h3" className="mt-3 mb-2" >
                                    {s.serviceName}
                                </CardTitle>

                                <CardText style={{textAlign: "left"}}>
                                    description? aushgdui hasud huiashdui shauid huiah uiash uih uiashuid iuash iuasuid hauisd uihasiu  haushd usahd uiashiud hasuidh iuahd iuahsiu hasiudh uiash diuhi uhasiu hiuasdh iuhasiud hsaiuhd iuash iushai uhadsiu huiashuid hsauihduisah iuasuid hsaduih uih
                                </CardText>

                                <CardFooter style={{textAlign: "right"}}>
                                    ${s.cost}
                                </CardFooter>

                            </Card>
                        )
                    })}
                </CardGroup>
            </section>
        </main>
    )
}