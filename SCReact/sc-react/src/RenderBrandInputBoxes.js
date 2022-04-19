import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import './Home.css';

export function RenderBrandInputBoxes(props){

    var numBrands = props.numBrands;
    var brand1 = props.brand1;
    var brand2 = props.brand2;
    var brand3 = props.brand3;

    if(numBrands=== 1){
        return(
            <div className='Brand-wrapper'>

                <div className='Brand-field'>
                    <label htmlFor='brand1'>Brand 1</label>
                    <input type="text" name="brand1" value={brand1} onChange={props.change}/>
                </div>

            </div>
        )
        
    }

    if(numBrands === 2){
        return(
            <div className='Brand-wrapper'>

                <div className='Brand-field'>
                    <label htmlFor='brand1'>Brand 1</label>
                    <input type="text" name="brand1" value={brand1} onChange={props.change}/>
                </div>

                <div className='Brand-field'>
                    <label htmlFor='brand1'>Brand 2</label>
                    <input type="text" name="brand2" value={brand2} onChange={props.change}/>
                </div>

                

            </div>
        )
    }

    if(numBrands === 3){
        return(
            <div className='Brand-wrapper'>

                <div className='Brand-field'>
                    <label htmlFor='brand1'>Brand 1</label>
                    <input type="text" name="brand1" value={brand1} onChange={props.change}/>
                </div>

                <div className='Brand-field'>
                    <label htmlFor='brand2'>Brand 2</label>
                    <input type="text" name="brand2" value={brand2} onChange={props.change}/>
                </div>

                <div className='Brand-field'>
                    <label htmlFor='brand3'>Brand 3</label>
                    <input type="text" name="brand3" value={brand3} onChange={props.change}/>
                </div>

            </div>
        )
    }

}

export default RenderBrandInputBoxes;