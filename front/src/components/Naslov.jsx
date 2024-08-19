import React from 'react';
import PropTypes from 'prop-types';
import {Row} from "react-bootstrap";

const Naslov = props => {
    return (
        <>
            <Row className="naslov mt-3">
                <h1 className="text-center naslov-h p-3">{props.title}</h1>
                <p className="text-center naslov-p p-1">{props.subtitle}</p>
            </Row>
        </>
    );
};

Naslov.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
};

export default Naslov;