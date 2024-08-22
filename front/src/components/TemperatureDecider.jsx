import React, {useEffect, useState} from 'react';
import server from "../server";
import {Row} from "react-bootstrap";

const TemperatureDecider = () => {

    const [temperature, setTemperature] = useState(0);

    useEffect(() => {
        server.get('temperatura')
            .then(response => {
                console.log(response.data);
                setTemperature(response.data.data.main.temp - 273.15);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <Row>
                {
                    temperature > 20 ? <h1 className="text-center p-3">Toplo je napolju, mozete da trcite</h1> : <h1 className="text-center p-3">Danas je traka u teretani najbolja opcija</h1>
                }
                <p className="text-center">Napolju je trenutno {temperature} stepeni</p>
            </Row>
        </>
    );
};

export default TemperatureDecider;
