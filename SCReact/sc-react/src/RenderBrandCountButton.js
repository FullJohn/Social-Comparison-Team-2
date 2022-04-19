import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import './Home.css';

export function RenderBrandCountButton(props){
    
    
    if(props.numBrands === 1){
        return(
            <div className='Add-Brands-Wrapper'>                
                <br></br>
                <br></br>
                <input className='Brand-button' type='button' name='numBrands' value= ' - '/>
                <input className='Brand-button' type='button' name='numBrands' value=' + ' onClick={props.addButtonChange}/>
            </div>
        )

    }
    if(props.numBrands === 2){
        return(
            <div className='Add-Brands-Wrapper'>                
                <br></br>
                <br></br>
                <input className='Brand-button' type='button' name='numBrands' value= ' - ' onClick={props.subtractButtonChange}/>
                <input className='Brand-button' type='button' name='numBrands' value=' + ' onClick={props.addButtonChange}/>
            </div>
        )

    }

    if(props.numBrands === 3){
        return(
            <div className='Add-Brands-Wrapper'>                
                <br></br>
                <br></br>
                <input className='Brand-button' type='button' name='numBrands' value= ' - ' onClick={props.subtractButtonChange}/>
                <input className='Brand-button' type='button' name='numBrands' value=' + ' />
            </div>
        )

    }
    
}

export default RenderBrandCountButton;