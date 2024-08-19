import React, {useState} from 'react';
import Naslov from "../components/Naslov";
import {Button, Col, Form, Row} from "react-bootstrap";
import useForm from "../useForm";
import server from "../server";

const Login = () => {

    const [prikaziRegistraciju, setPrikaziRegistraciju] = useState(false);
    const [poruka, setPoruka] = useState('');
    const title = prikaziRegistraciju ? "Registracija" : "Login";

    const {formData, handleChange} = useForm({
        email: '',
        password: '',
        name: ''
    });

    const login = () => {
        console.log('login');
        server.post('login', formData)
            .then(response => {
                console.log(response.data);
                if(response.data.success === true){
                    window.sessionStorage.setItem('token', response.data.data.token);
                    window.sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
                    window.location.href = '/';
                }else{
                    setPoruka("Pogresan email ili password");
                }
            })
            .catch(error => {
                console.error(error);
                setPoruka("Doslo je do greske, pokusajte ponovo");
            });
    }

    const registracija = () => {
        console.log('registracija');
        server.post('register', formData)
            .then(response => {
                console.log(response.data);
                if(response.data.success === true){
                    setPoruka("Uspesno ste se registrovali, sada se ulogujte");
                    setPrikaziRegistraciju(false);
                }else{
                    setPoruka("Doslo je do greske, pokusajte ponovo");
                }
            })
            .catch(error => {
                console.error(error);
                setPoruka("Doslo je do greske, pokusajte ponovo");
            });
    }

    return (
        <>
            <Naslov title={title} subtitle={poruka}/>

            <Row className="m-3">

                {
                    !prikaziRegistraciju && (
                        <>
                            <Col>
                            <Form.Group className="mb-3" controlId="loginemail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control name="email" onChange={handleChange} type="email" placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="loginpassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={handleChange} name="password" type="password" />
                            </Form.Group>
                            <hr/>
                            <a href="#" onClick={() => setPrikaziRegistraciju(true)}>Nemate nalog, registrujte se</a>
                            <br/>
                            <Button type="button" onClick={login} className="btn btn-dark">Login</Button>
                            </Col>
                        </>
                    )
                }

                {
                    prikaziRegistraciju && (
                        <>
                            <Col>
                                <Form.Group className="mb-3" controlId="regemail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control name="name" onChange={handleChange} type="text" placeholder="Toske Toskovic" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="regemail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control name="email" onChange={handleChange} type="email" placeholder="name@example.com" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="regpassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={handleChange} name="password" type="password" />
                                </Form.Group>
                                <hr/>
                                <a href="#" onClick={() => setPrikaziRegistraciju(false)}>Imate nalog, ulogujte se</a>
                                <br/>
                                <Button type="button" onClick={registracija} className="btn btn-dark">Registracija</Button>
                            </Col>
                        </>
                    )
                }

            </Row>
        </>
    );
};

export default Login;