import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigation = () => {

    const token = window.sessionStorage.getItem('token');
    const user = JSON.parse(window.sessionStorage.getItem('user'));

    const role = user ? user.role : null;

    const logout = () => {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('user');
        window.location.href = '/';
    }

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">MiTFit</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About us</Nav.Link>
                        <Nav.Link href="/exercises">Exercises</Nav.Link>
                        {
                            !token && (
                                <>
                                    <Nav.Link href="/login">Login</Nav.Link>
                                </>
                            )
                        }

                        {
                            token && (
                                <>
                                    <Nav.Link href="/workouts">Workouts</Nav.Link>
                                    {
                                        (role === 'admin' || role ==='trainer') && (
                                            <Nav.Link href="/admin">Admin</Nav.Link>
                                        )
                                    }
                                    <Nav.Link onClick={
                                        () => {
                                            logout();
                                        }
                                    } href="#">Logout</Nav.Link>
                                </>
                            )
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;
