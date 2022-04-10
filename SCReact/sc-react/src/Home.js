import Button from '@restart/ui/esm/Button';
import React, {Component, useEffect, useState} from 'react';
import { Tab } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { Navigate } from 'react-router';
import fblogo from './Icons/fblogo.png';
import instalogo from './Icons/instalogo.png';
import tiktoklogo from './Icons/tiktoklogo.png';
import pinterestlogo from './Icons/pinterestlogo.png';
import youtubelogo from './Icons/youtube-circ-modified.png';
import twitterlogo from './Icons/twitterlogo.png';
import './Home.css';
import RadioFormat from './RadioButtonIcons';


export class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {queryId: '', platform: '', brand1: '', brand2: '', brand3: '', startDate: new Date(), endDate: new Date(), 
        redirect: false, queryId: '', buttonChecked: false};
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
        this.platformChange = this.platformChange.bind(this);
      }
      
      startDateChange(date) {this.setState({startDate:date}); }
      platformChange(event) {
          this.setState({platform:event.target.value})
          this.setState({buttonChecked:true});
        }
      endDateChange(date) {this.setState({endDate: date}); }
      handleChange(event) {this.setState({[event.target.name]: event.target.value}); }

      handleSubmit(event) {
        const { platform, brand1, brand2, brand3, startDate, endDate} = this.state;


        event.preventDefault();
        fetch('http://54.144.107.206:8000/query/', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                platform:platform,
                brand1:brand1,
                brand2:brand2,
                brand3:brand3,
                startDate:startDate,
                endDate:endDate
            })
        })
        .then(response=>response.json())

        .then((result)=>{
            
        
            if(result['redirect'] == true){
                
                this.state.queryId = result['queryId']
                this.setState([this.state.queryId])
                
                this.state.redirect = true
                this.setState([this.state.redirect])
                
            }
            else{
                alert(result['message']);
                }
            })
        }
    
    render(){
        if(this.state.redirect){
            const url = "/loading?queryId=" + this.state.queryId
            return(
            <Navigate to={url}></Navigate>)
        }
        return(
            <div className='container'> 
                <form onSubmit={this.handleSubmit}>
                   <br></br>
                   <br></br>
                   <div className='Instruction-Text'>Select a Platform</div>       
                    <br></br>
                    <div className='Icon-wrapper' onChange={this.platformChange}>
                        <label>
                            {RadioFormat([this.state.buttonChecked, 'Facebook', 'fblogo', fblogo])}
                        </label>

                        <label>
                            {RadioFormat([this.state.buttonChecked, 'Instagram', 'instalogo', instalogo])}
                        </label>

                        <label>
                            {RadioFormat([this.state.buttonChecked, 'YouTube', 'youtubelogo', youtubelogo])}
                        </label>

                        <label>
                            {RadioFormat([this.state.buttonChecked, 'Twitter', 'twitterlogo', twitterlogo])}
                        </label>

                        <label>
                            {RadioFormat([this.state.buttonChecked, 'Pinterest', 'pinterestlogo', pinterestlogo])}                   
                        </label>

                        <label>
                            {RadioFormat([this.state.buttonChecked, 'TikTok', 'tiktoklogo', tiktoklogo])}
                        </label>
                    </div>
                    
                    <br></br>
                    <br></br>
                   
                    
                    <div className='Date-wrapper'>
                        <div className='Date-field'>
                            <label className='Date-text' htmlFor="startDate">Start Date</label>
                            <DatePicker type="date" name="startDate" value={this.state.startDate}
                            onChange={this.startDateChange} required={true} dayPlaceholder="dd" monthPlaceholder="mm" yearPlaceholder="yyyy"
                            clearIcon={null}></DatePicker>
                        </div>
                        <div className='Date-field'>
                            <label className='Date-text' htmlFor="endDate">End Date</label>
                            <DatePicker type="date" name="endDate" value={this.state.endDate}
                            onChange={this.endDateChange} required={true} dayPlaceholder="dd" monthPlaceholder="mm" yearPlaceholder="yyyy"
                            clearIcon={null}></DatePicker>
                        </div>
                        
                    </div>
                    <br></br>

                    <div className='Brand-wrapper'>

                        <div className='Brand-field'>
                        <label htmlFor='brand1'>Brand 1</label>
                        <input type="text" name="brand1" value={this.state.brand1} onChange={this.handleChange}/>
                   

                        </div>
                        <div className='Brand-field'>
                        <label htmlFor='brand2'>Brand 2</label>
                        <input type="text" name="brand2" value={this.state.brand2} onChange={this.handleChange}/>
                    
                            
                        </div>
                        <div className='Brand-field'>
                        <label htmlFor='brand3'>Brand 3</label>
                        <input type="text" name="brand3" value={this.state.brand3} onChange={this.handleChange}/>
                    
                            
                        </div>

                    </div>
                    <br></br>
                    <br></br>
                        
                    <input className='Submit-button' type='submit' value='Submit'></input>
                    
                     </form>
                    
                </div>
            );
    }
}
