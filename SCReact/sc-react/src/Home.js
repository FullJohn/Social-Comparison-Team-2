import Button from '@restart/ui/esm/Button';
import React, {Component, useEffect, useState} from 'react';
import { Tab } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import { Navigate } from 'react-router';
import bluemarblelogo from './bluemarble.png';
import fblogo from './fblogo.png';
import instalogo from './instalogo.png';
import tiktoklogo from './tiktoklogo.png';
import pinterestlogo from './pinterestlogo.png';
import youtubelogo from './youtube-circ-modified.png';
import twitterlogo from './twitterlogo.png';








export class Home extends Component{

    constructor(props) {
        super(props);

        this.state = {queryId: '', platform: 'YouTube', brand1: '', brand2: '', brand3: '', startDate: new Date(), endDate: new Date(), redirect: false, queryId: ''};
  
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
        this.platformChange = this.platformChange.bind(this);
      }
      
      startDateChange(date) {this.setState({startDate:date}); }
      platformChange(event) {this.setState({platform:event.target.value})}
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
                    <div className='Icon-wrapper' onChange={this.platformChange}>
                        <label>
                            <div className='Logo-wrapper'>
                                <input type='radio' name='platform' value="Facebook"/>   
                                <img alt='fblogo' src={fblogo}/>

                            </div>
                        </label>
                        <label>
                            <div className='Logo-wrapper'>
                                <input type='radio' name='platform' value='Instagram'/>   
                                <img alt='instalogo' src={instalogo}></img>
                            </div>
                        </label>
                        <label>
                            <div className='Logo-wrapper'>
                                <input type='radio' name='platform' value='YouTube'/>   
                                <img alt='youtubelogo' src={youtubelogo}></img>
                            </div>
                        </label>
                        <label>
                            <div className='Logo-wrapper'>
                                <input type='radio' name='platform' value='Twitter'/>   
                                <img alt='twitterlogo' src={twitterlogo}></img>
                            </div>
                        </label>
                        <label>
                            <div className='Logo-wrapper'>
                                <input type='radio' name='platform' value='Pinterest'/>   
                                <img alt='pinterestlogo' src={pinterestlogo}></img>
                            </div>
                        </label>
                        <label>
                            <div className='Logo-wrapper'>
                                <input type='radio' name='platform' value='TikTok'/>   
                                <img alt='tiktoklogo' src={tiktoklogo}></img>
                            </div>
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
                    
                        
                    <input className='Submit-button' type='submit' value='Submit'></input>
                    
                     </form>
                    
                </div>
            );
    }
}
