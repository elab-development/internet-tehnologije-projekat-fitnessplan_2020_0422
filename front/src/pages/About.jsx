import React from 'react';
import Naslov from "../components/Naslov";
import mira from "../slike/mira.jpeg";
import toske from "../slike/toske.jpeg";
import {Card, Col, Row} from "react-bootstrap";

const About = () => {

    const treneri = [
        {
            id: 1,
            ime: "Mira",
            prezime: "Kostic",
            slika: mira,
            opis: "Mira je nas trenerka koja je zavrsila fakultet za sport i fizicko vaspitanje. Ona je najbolji trener za zene."
        },
        {
            id: 2,
            ime: "Nikola",
            prezime: "Tosic",
            slika: toske,
            opis: "Toske je nas trener koji je zavrsio fakultet za sport i fizicko vaspitanje. On je najbolji trener za muskarce."
        }
        ];

    return (
        <>
            <Naslov title="Nesto o nama" subtitle="Vasi treneri"/>

            <Row className="m-3">
                {
                    treneri.map(trener => {
                        return (
                            <Col key={trener.id} md={6}>
                                <Card>
                                    <Card.Img variant="top" src={trener.slika} height="800px"  />
                                    <Card.Body>
                                        <Card.Title>{trener.ime } {trener.prezime}</Card.Title>
                                        <Card.Text>
                                            {trener.opis}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>

        </>
    );
};

export default About;