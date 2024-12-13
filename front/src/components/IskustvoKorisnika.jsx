import React, {useEffect, useState} from 'react';
import server from "../server";
import {Col, Row} from "react-bootstrap";

const IskustvoKorisnika = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        server.get('https://randomuser.me/api/')
            .then(response => {
                console.log(response.data);
                setUser(response.data.results[0]);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <>
            <Row>
                <Col md={12}>
                    <h1 className={"text-center"}>Iskustva korisnika</h1>
                </Col>
                <Col md={3} className="text-center">
                    <h2>{user.name?.first} {user.name?.last}</h2>
                    <img src={user.picture?.large} alt="user"/>
                </Col>
                <Col md={9}>
                    <p>
                        Od momenta kada sam zakoračio u ovu teretanu, znao sam da sam napravio pravi izbor. Prostor je izuzetno čist i moderan, sa svim potrebnim spravama za različite vrste treninga. Bez obzira na to da li ste početnik ili iskusni vežbač, ovde ćete pronaći sve što vam je potrebno za kvalitetan trening.

                        Osoblje je neverovatno ljubazno i uvek spremno da pomogne. Treneri su izuzetno profesionalni i posvećeni, pružajući savete koji su prilagođeni svakom pojedincu. Atmosfera u teretani je motivišuća, a ostali članovi su prijateljski nastrojeni, što dodatno podstiče na napredak.

                        Jedna od stvari koje me posebno oduševljavaju je raznolikost grupnih treninga koji su dostupni. Od aerobika do joge, svako može pronaći nešto što mu odgovara. Oprema je moderna i dobro održavana, a tu je i sauna koja je savršena za opuštanje nakon napornog treninga.

                        Cene su prilično pristupačne s obzirom na kvalitet usluga koje dobijate. Članstvo nudi odličan odnos cene i kvaliteta, a često imaju i promotivne ponude koje dodatno olakšavaju odluku.

                        Sve u svemu, ovo je teretana koju bih bez oklevanja preporučio svima. Ne samo da ćete postići svoje fitness ciljeve, već ćete uživati u svakom trenutku provedenom ovde.


                    </p>
                </Col>
            </Row>
        </>
    );
};

export default IskustvoKorisnika;