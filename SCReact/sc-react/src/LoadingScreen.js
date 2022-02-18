import React, {Component, useState} from 'react';
import { Navigate } from 'react-router';

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
            <div class="Label1">
                <img class="Img1" src="/Logo.gif"></img>
                <label>Loading your results. Page will redirect upon completion. This may take a few minutes...</label>
                {this.runQuery}
            </div>
            
        )
        }
    }
