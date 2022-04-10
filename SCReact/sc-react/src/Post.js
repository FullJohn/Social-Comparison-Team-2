import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import "./ResultsFormat/Post.css";
import renderposts from './RenderPosts';
import { YouTubeMetrics } from './PostMetrics';
export class Post extends Component{
    
    constructor(props){
        super(props);
        let search= window.location.search.substring(9)
        this.state={queryId: search, posts:[], platform:''}
    }

    initial(){
        const {queryId } = this.state
        
        fetch('http://54.144.107.206:8000/getQuery/', {
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
        .then(data=>{
            this.setState({platform:data.platform})
            
        });
    }
    
    refreshList(){
        const { queryId } = this.state
        fetch('http://54.144.107.206:8000/post/', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                getPosts:true,
                queryId:queryId
            })
        })
        .then(response=>response.json())
        .then(data=>{
            
            this.setState({posts:data});
          
        });
        
    }

    componentDidMount(){
        this.initial();
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    

    render(){
        const {posts} = this.state;
        const {platform} = this.state;
        const postsLength = posts.length;
        const brand1 = [];
        const brand2 = [];
        const brand3 = [];
        var brand1name = '';
        var brand2name = '';
        var brand3name = '';
        
        // populate brand names
        for (var i = 0; i < postsLength; i++) {
            if (brand1name === "") {
                brand1name = posts[i].channel;
            }
            else if (brand2name === "" && posts[i].channel != brand1name){
                brand2name = posts[i].channel;
            }
            else if (brand3name === "" && posts[i].channel != brand1name && posts[i].channel != brand2name){
                brand3name = posts[i].channel;
            }
        }
        // push posts to corresponding brand table
        
        var brand1Metrics = {totalPosts: 0, totalImpressions: 0, totalEngagements: 0}
        var brand2Metrics = {totalPosts: 0, totalImpressions: 0, totalEngagements: 0}
        var brand3Metrics = {totalPosts: 0, totalImpressions: 0, totalEngagements: 0}
        for (var i = 0; i < postsLength; i++) {
            if (posts[i].channel == brand1name) {
                brand1Metrics = YouTubeMetrics(brand1Metrics, posts[i]);
                brand1.push(posts[i]);
            }
            
            else if (posts[i].channel == brand2name) {
                brand2Metrics = YouTubeMetrics(brand2Metrics, posts[i]);
                brand2.push(posts[i]);
            }
            else {
                brand3Metrics = YouTubeMetrics(brand3Metrics, posts[i]);
                brand3.push(posts[i]);
            }
        }
        
        // metrics = impressions, average impressions, average engagements
        
        const platform1 = []
        // loading brand name subheader titles
        if (brand1name && brand2name && brand3name && (brand1name != brand2name) && (brand2name != brand3name)) {
            document.getElementById("B1").innerHTML=brand1name;
            document.getElementById("B2").innerHTML=brand2name;
            document.getElementById("B3").innerHTML=brand3name;
        }
 
        return(
            <div className='Table-Wrapper'>
                <br></br>
                <br></br>
                <div className='Table-Wrapper'>
                    <div className='Row-Wrapper'>
                        <br></br>
                        <br></br>
                        <h2 id="B1">{brand1name}</h2>
                        {renderposts({brand: brand1, platform: platform, metrics:brand1Metrics})}
                    </div>
                    <div className='Row-Wrapper-Center'>
                        <br></br>
                        <br></br>
                        <h2 id="B2">{brand2name}</h2>
                        {renderposts({brand: brand2, platform: platform, metrics:brand2Metrics})}
                    </div>
                    <div className='Row-Wrapper'>
                        <br></br>
                        <br></br>
                        <h2 id="B3">{brand3name}</h2>
                        {renderposts({brand: brand3, platform: platform, metrics:brand3Metrics})}
                    </div>
                </div>
            </div>
        )
    }
}