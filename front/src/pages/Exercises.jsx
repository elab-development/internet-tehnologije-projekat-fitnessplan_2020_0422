import React, {useEffect, useState} from 'react';
import server from "../server";
import Naslov from "../components/Naslov";
import {Col, Row} from "react-bootstrap";
import {GiMuscleFat, GiMuscleUp} from "react-icons/gi";
const Exercises = () => {

    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        server.get('exercises')
            .then(response => {
                console.log(response.data);
                setExercises(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <Naslov title="Sve vezbe koje cesto izvodimo u teretani" subtitle="Mozda vama neka bude zanimljiva" />
            <Row className="m-3">

            {
                exercises.map(exercise => {
                    return (
                        <Col key={exercise.id} md={3}>
                            <h1><GiMuscleUp size={40} />{exercise.name}</h1>
                            <p>{exercise.description}</p>
                        </Col>
                    )
                })
            }
            </Row>
        </div>
    );
};

export default Exercises;