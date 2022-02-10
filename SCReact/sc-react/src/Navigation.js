import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{
    render(){
        return(
            <Navbar className='Nav-bar' expand = "lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id = "basic-navbar-nav">
                <Nav>
                <NavLink className = "Nav-bar" to= "/home">
                    Home
                </NavLink> 
                </Nav>
                </Navbar.Collapse>
            </Navbar>

        )
    }
}