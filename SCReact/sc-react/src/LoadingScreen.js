import React, {Component, useState} from 'react';
import { Navigate } from 'react-router';
import logogif from './Icons/Logo.gif';
import qmark from './Icons/qmark.png';
import './LoadingScreen.css';

export class LoadScreen extends Component{

    constructor(props) {
        super(props);
        
        let search= window.location.search.substring(9)
        this.state = {queryId: search, redirect: false};
        
        this.handleLoad = this.handleLoad.bind(this);
        this.runQuery = this.runQuery.bind(this);
    }

    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        this.runQuery()
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad);
    }
    
    
    runQuery(){
        const {queryId} = this.state
        fetch('http://54.144.107.206:8000/run/', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                queryId:queryId
            })
        })
        .then(response=>response.json())
        .then((result)=>{

            if(result['redirect'] == true){

                this.state.redirect = true
                this.setState([this.state.redirect])
            }
        })
        }

    handleLoad(){
        
    }
    render(){
        if(this.state.redirect){
            const url = "/post?queryId=" + this.state.queryId
            return(
                <Navigate to={url}></Navigate>
            )
        }
        return(
            <div>
                <div class="Label1">
                    <img class="Img1" alt='Loading Icon' src={logogif}/>
                    <label>Loading your results. Page will redirect upon completion. This may take a few minutes...
                    <pre>&#9;</pre>
                    </label>
                </div>
                <div class="Label2">
                    <img class="Img2" alt='Question Mark' src={qmark}/>
                    <div>
                        <h2>Why is it taking so long?</h2>
                        <label>We only collect publicly available information from social media platforms. To gather a result takes time to crawl through the information. Patience, please. This could take up to 5 minutes per brand.</label>
                    </div>
                </div>
                {this.runQuery}
            </div>
            
            
        )
        }
    }
