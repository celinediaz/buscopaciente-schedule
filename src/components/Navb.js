import React from 'react'
import { Navbar, Nav, Image } from 'react-bootstrap';
import logo from './logo.jpeg'

const Navb = () => {
  return (
    <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand href="#home">
            <Image src={logo} width="50" height="50" className="icononav d-inline-block align-center" />
          </Navbar.Brand>
          <Navbar.Brand href="#home">BuscoPaciente</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
            <Nav.Link href="#regresar">Regresar</Nav.Link>
            <Nav.Link href="#logout">Cerrar Sesión</Nav.Link>
          </Navbar.Collapse>
    </Navbar>
  )
}

export default Navb
