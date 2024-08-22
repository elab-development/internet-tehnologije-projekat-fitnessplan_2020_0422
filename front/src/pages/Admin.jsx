import React, {useEffect, useState} from 'react';
import Naslov from "../components/Naslov";
import {Col, Form, Row, Table} from "react-bootstrap";
import {Chart} from "react-google-charts";
import server from "../server";
import useForm from "../useForm";

const Admin = () => {
    const [poruka, setPoruka] = useState('Dobro dosli u panel za administraciju');
    const [intensities, setIntensities] = useState([]);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        server.get('exercises').then(response => {
            console.log(response.data);
            setExercises(response.data.data);
        }).catch(error => {
            console.error(error);
            setPoruka('Doslo je do greske prilikom ucitavanja vezbi');
        });
    }, []);

    useEffect(() => {
        server.get('workouts').then(response => {
            console.log(response.data);
            setWorkouts(response.data.data);
        }).catch(error => {
            console.error(error);
            setPoruka('Doslo je do greske prilikom ucitavanja workouta');
        });
    }, [forceUpdate]);

    const {formData, handleChange} = useForm({
        name: '',
        workout_date: '',
        intensity_id: 1,
        workout_id: 1,
        exercise_id: 1,
        sets: 0,
        reps: 0,
        rest: 0,
        info: ''
    });

    const dodaj = () => {
        console.log(formData);
        let data = {
            name: formData.name,
            workout_date: formData.workout_date,
            intensity_id: parseInt(formData.intensity_id)
        }

        console.log(data);

        server.post('workouts', data).then(response => {
            console.log(response.data);
            if (response.data.success === true) {
                setPoruka('Uspesno ste dodali workout');
                setForceUpdate(!forceUpdate);
            }else {
                setPoruka('Doslo je do greske prilikom dodavanja workouta');
            }
        }).catch(error => {
            console.error(error);
            setPoruka('Doslo je do greske prilikom dodavanja workouta');
        })
    }

    useEffect(() => {
        server.get('intensities').then(response => {
            console.log(response.data);
            setIntensities(response.data.data);
        }).catch(error => {
            console.error(error);
        })
    }, []);


    const [chartData, setChartData] = useState([
        [
            'Vezba',
            'Broj pojavljivanja'
        ]
    ]);

    useEffect(() => {
        server.get('graph').then(response => {
            console.log(response.data);
            const podaci = response.data.data;

            let temp = [
                [
                    'Vezba',
                    'Broj pojavljivanja'
                ]
            ];
            podaci.forEach(podatak => {
                temp.push([podatak.name, podatak.total]);
            });
            setChartData(temp);
        }).catch(error => {
            console.error(error);
            setPoruka('Doslo je do greske prilikom ucitavanja podataka');
        });
    }, []);


    const dodajDeoWorkouta = () => {
        console.log(formData);

        let data = {
            workout_id: parseInt(formData.workout_id),
            exercise_id: parseInt(formData.exercise_id),
            sets: parseInt(formData.sets),
            reps: parseInt(formData.reps),
            rest: parseInt(formData.rest),
            info: formData.info
        }

        console.log(data);

        server.post('workout-parts', data).then(response => {
            console.log(response.data);
            if(response.data.success === true){
                setPoruka('Uspesno ste dodali deo workouta');
            }else{
                setPoruka('Doslo je do greske prilikom dodavanja dela workouta');
            }
        }).catch(error => {
            console.error(error);
            setPoruka('Doslo je do greske prilikom dodavanja dela workouta');
        });
    }

    //paginataion

    const [workoutParts, setWorkoutParts] = useState([]);
    const [url, setUrl] = useState('parts-paginate');
    const [links, setLinks] = useState([]);

    useEffect(() => {
        server.get(url).then(response => {
            console.log(response.data);
            setWorkoutParts(response.data.data.data);
            setLinks([]);
            let linksFromServer = [];
            console.log(response.data.links);
            for (let key in response.data.data.links) {
                console.log('tu sam');
                console.log(response.data.data.links[key].url);
                linksFromServer.push({
                    key: key,
                    url: response.data.data.links[key].url,
                    label: response.data.data.links[key].label.replace('&laquo;','').replace('&raquo;', '')
                });
            }

            console.log(linksFromServer);

            setLinks(linksFromServer);
        }).catch(error => {
            console.error(error);
            setPoruka('Doslo je do greske prilikom ucitavanja workout delova');
        });
    }, [url, forceUpdate]);

    return (
        <>
            <Naslov title="Panel za administraciju" subtitle={poruka} />

            <Row>
                <Col md={12}>
                    <h1 className="text-center">Graficki prikaz podataka</h1>
                    <Chart
                        chartType="Histogram"
                        width="100%"
                        height="400px"
                        data={chartData}
                        options={{
                            title: "Broj pojavljivanja vezbi u workoutima",
                            legend: { position: "none" },
                        }}
                    />
                </Col>

                <Col md={6}>
                    <h1 className="text-center">Unos novog workouta</h1>

                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" onChange={handleChange} type="text" placeholder="My new workout" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="workout_date">
                        <Form.Label>Workout date</Form.Label>
                        <Form.Control name="workout_date" onChange={handleChange} type="date" placeholder="2024-08-22" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="intensity">
                        <Form.Label>Intensity</Form.Label>
                        <Form.Select name="intensity_id" onChange={handleChange} aria-label="Intenzitet select">
                            {
                                intensities && intensities.map(intensity => {
                                    return (
                                        <option key={intensity.id} value={intensity.id}>{intensity.level}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>
                    <hr />
                    <button onClick={dodaj} type="button" className="btn btn-dark">Dodaj workout</button>
                </Col>
                <Col md={6}>

                    <h1 className="text-center">Unos novog dela workouta</h1>

                    <Form.Group className="mb-3" controlId="workout">
                        <Form.Label>Workout</Form.Label>
                        <Form.Select name="workout_id" onChange={handleChange} aria-label="Workout select">
                            {
                                workouts && workouts.map(workout => {
                                    return (
                                        <option key={workout.id} value={workout.id}>{workout.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exercise">
                        <Form.Label>Exercise</Form.Label>
                        <Form.Select name="exercise_id" onChange={handleChange} aria-label="Exercise select">
                            {
                                exercises && exercises.map(exercise => {
                                    return (
                                        <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="sets">
                        <Form.Label>Sets</Form.Label>
                        <Form.Control name="sets" onChange={handleChange} type="number" placeholder="3" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="reps">
                        <Form.Label>Reps</Form.Label>
                        <Form.Control name="reps" onChange={handleChange} type="number" placeholder="12" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="rest">
                        <Form.Label>Rest</Form.Label>
                        <Form.Control name="rest" onChange={handleChange} type="number" placeholder="60" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="info">
                        <Form.Label>Info</Form.Label>
                        <Form.Control name="info" onChange={handleChange} type="text" placeholder="Napomena" />
                    </Form.Group>

                    <hr />

                    <button onClick={dodajDeoWorkouta} type="button" className="btn btn-dark">Dodaj deo workouta</button>

                </Col>

            </Row>

            <Row className="m-3">
                <Col md={12}>
                    <Table hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Workout</th>
                                <th>Exercise</th>
                                <th>Sets</th>
                                <th>Reps</th>
                                <th>Rest</th>
                                <th>Info</th>
                                <th>Obrisi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                workoutParts && workoutParts.map(workoutPart => {
                                    return (
                                        <tr key={workoutPart.id}>
                                            <td>{workoutPart.id}</td>
                                            <td>{workoutPart.workout_name}</td>
                                            <td>{workoutPart.exercise_name}</td>
                                            <td>{workoutPart.sets}</td>
                                            <td>{workoutPart.reps}</td>
                                            <td>{workoutPart.rest}</td>
                                            <td>{workoutPart.info}</td>
                                            <td><button type="button" onClick={
                                                () => {
                                                    server.delete('workout-parts/' + workoutPart.id).then(response => {
                                                        console.log(response.data);
                                                        if(response.data.success === true){
                                                            setPoruka('Uspesno ste obrisali deo workouta');
                                                            setForceUpdate(!forceUpdate);
                                                        }else{
                                                            setPoruka('Doslo je do greske prilikom brisanja dela workouta');
                                                        }
                                                    }).catch(error => {
                                                        console.error(error);
                                                        setPoruka('Doslo je do greske prilikom brisanja dela workouta');
                                                    });
                                                }
                                            } className="btn btn-danger">Obrisi</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    {
                        links.map(link => {
                            return (
                                <button key={link.key} onClick={() => setUrl(link.url)} className="btn btn-dark m-1" disabled={
                                    link.url === null
                                }>{link.label}</button>
                            )
                        })
                    }
                </Col>
            </Row>
        </>
    );
};

export default Admin;
