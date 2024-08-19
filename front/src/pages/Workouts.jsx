import React, {useEffect, useState} from 'react';
import Naslov from "../components/Naslov";
import {Col, Form, Row, Table} from "react-bootstrap";
import server from "../server";

const Workouts = () => {

    const [workouts, setWorkouts] = useState([]);
    const [intensities, setIntensities] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [workoutParts, setWorkoutParts] = useState([]);

    useEffect(() => {
        server.get('intensities').then(response => {
            console.log(response.data);
            setIntensities(response.data.data);
        }).catch(error => {
            console.error(error);
        })
    }, []);

    useEffect(() => {
        server.get('workouts').then(response => {
            console.log(response.data);
            setWorkouts(response.data.data);
            setFilteredWorkouts(response.data.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if (selectedWorkout !== null) {
            server.get('find-by-workout/' + selectedWorkout.id).then(response => {
                console.log(response.data);
                setWorkoutParts(response.data.data);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [selectedWorkout]);

    return (
        <div>
            <Naslov title="Nasi treninzi" subtitle="Pogledajte nase treninge" />
            <Row className="m-3">
                <Col md={6}>
                    <Form.Select onChange={
                        (e) => {
                            if(e.target.value === '0'){
                                setFilteredWorkouts(workouts);
                            }else{
                                setFilteredWorkouts(workouts.filter(workout => workout.intensity.id === parseInt(e.target.value)));
                            }
                        }
                    } aria-label="Intensity select">

                        <option value="0">Svi intenziteti</option>
                        {
                            intensities && intensities.map(intensity => {
                                return (
                                    <option key={intensity.id} value={intensity.id}>{intensity.level}</option>
                                )
                            })
                        }
                    </Form.Select>
                    <hr/>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Naziv</th>
                            <th>Datum treninga</th>
                            <th>Intenzitet</th>
                            <th>Ucitaj</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            filteredWorkouts && filteredWorkouts.map(workout => {
                                return (
                                    <tr key={workout.id}>
                                        <td>{workout.id}</td>
                                        <td>{workout.name}</td>
                                        <td>{workout.workout_date}</td>
                                        <td>{workout.intensity.level}</td>
                                        <td><button type="button" className="btn btn-info" onClick={() => {
                                            setSelectedWorkout(workout);
                                        }} > Ucitaj trening </button> </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Col>
                <Col md={6}>
                    <h1>Izabrani trening </h1>
                    {
                        selectedWorkout && (
                            <div>
                                <h2>{selectedWorkout.name}</h2>
                                <p>{selectedWorkout.description}</p>
                                <h3>Intenzitet: {selectedWorkout.intensity.level}</h3>
                            </div>
                        )
                    }
                    <hr/>
                    <Table hover>
                        <thead>
                        <tr>
                            <th>Vežba</th>
                            <th>Opis</th>
                            <th>Serija</th>
                            <th>Ponavljanja</th>
                            <th>Pauza</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            workoutParts && workoutParts.map(workoutPart => {
                                return (
                                    <tr key={workoutPart.id}>
                                        <td>{workoutPart.exercise.name}</td>
                                        <td>{workoutPart.exercise.description}</td>
                                        <td>{workoutPart.sets}</td>
                                        <td>{workoutPart.reps}</td>
                                        <td>{workoutPart.rest}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </div>
    );
};

export default Workouts;