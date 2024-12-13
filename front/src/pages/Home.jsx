import React from 'react';
import Naslov from "../components/Naslov";
import {Carousel, Image} from "react-bootstrap";
import rambo from "../slike/rambo.jpg";
import traktorskaguma from "../slike/traktorskaguma.jpg";
import fitness from "../slike/fitness-ai.png";
import TemperatureDecider from "../components/TemperatureDecider";
import IskustvoKorisnika from "../components/IskustvoKorisnika";

const Home = () => {

    const slike = [
        {
            id: 1,
            naslov: "Povezite um i telo",
            opis: "Sa nama uvek mozete pronaci vezbe za sve delove tela",
            slika: fitness
        },
        {
            id: 2,
            naslov: "Um klade valja ali telo je zakon",
            opis: "Najbolje vezbe za vas",
            slika: traktorskaguma
        },
        {
            id: 3,
            naslov: "Vezbajte sa nama",
            opis: "Najjace zene i muskarci vezbaju sa nama",
            slika: rambo
        }
    ];

    return (
        <>
            <Naslov title="Dobrodosli na Fitnes stranicu" subtitle="Ovde mozete pronaci sve vezano za fitnes"/>

            <Carousel className="m-3">
                {
                    slike.map(slika => {
                        return (
                            <Carousel.Item key={slika.id}>
                                <Image className="moja-slika" src={slika.slika} alt={slika.naslov}  />
                                <Carousel.Caption>
                                    <h3>{slika.naslov}</h3>
                                    <p>{slika.opis}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
            <IskustvoKorisnika />
            <TemperatureDecider />
        </>
    );
};

export default Home;