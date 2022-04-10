import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import "./Home.css";

export function RadioFormat(props){
    //props = [buttonChecked,value, alt, src]
    
    if(!props[0]){
        // if no button is selected
        return(
            <div className='Logo-wrapper'>
                <input type='radio' className = 'Color-Radio' name='platform' value={props[1]}/>
                <img alt={props[2]} src={props[3]}/>  
            </div>
        )
    }
    else{
        return(
            <div className='Logo-wrapper'>
                <input type='radio' className = 'Icon-Radio' name='platform' value={props[1]}/>
                <img alt={props[2]} src={props[3]}/>  
            </div>
        )
    }
}

export default RadioFormat;