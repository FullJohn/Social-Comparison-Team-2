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
        
        var brand1Metrics = {totalPosts: 0, totalImpressions: 0, totalEngagements: 0, avgImpressions: 0, avgEngagements: 0}
        var brand2Metrics = {totalPosts: 0, totalImpressions: 0, totalEngagements: 0, avgImpressions: 0, avgEngagements: 0}
        var brand3Metrics = {totalPosts: 0, totalImpressions: 0, totalEngagements: 0, avgImpressions: 0, avgEngagements: 0}
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
        
        brand1Metrics.avgImpressions = Math.floor(brand1Metrics.totalImpressions/brand1.totalPosts);
        brand1Metrics.avgEngagements = brand1Metrics.totalEngagements/brand1.totalPosts;

        brand2Metrics.avgImpressions = brand2Metrics.totalImpressions/brand2.totalPosts;
        brand2Metrics.avgEngagements = brand2Metrics.totalEngagements/brand2.totalPosts;

        brand3Metrics.avgImpressions = brand3Metrics.totalImpressions/brand3.totalPosts;
        brand3Metrics.avgEngagements = brand3Metrics.totalEngagements/brand3.totalPosts;

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
                        impressions: {brand1Metrics.totalImpressions}
                        <br></br>
                        avgImpressions: {brand1Metrics.avgImpressions}
                        <br></br>
                        avgEngagements: {brand1Metrics.avgEngagements}
                        <br></br>
                        {renderposts({brand: brand1, platform: platform})}
                    </div>
                    <div className='Row-Wrapper-Center'>
                        <br></br>
                        <br></br>
                        <h2 id="B2">{brand2name}</h2>
                        impressions: {brand2Metrics.totalImpressions}
                        <br></br>
                        avgImpressions: {brand2Metrics.avgImpressions}
                        <br></br>
                        avgEngagements: {brand2Metrics.avgEngagements}
                        <br></br>
                        {renderposts({brand: brand2, platform: platform})}
                    </div>
                    <div className='Row-Wrapper'>
                        <br></br>
                        <br></br>
                        <h2 id="B3">{brand3name}</h2>
                        impressions: {brand3Metrics.totalImpressions}
                        <br></br>
                        avgImpressions: {brand3Metrics.avgImpressions}
                        <br></br>
                        avgEngagements: {brand3Metrics.avgEngagements}
                        <br></br>
                        {renderposts({brand: brand3, platform: platform})}
                    </div>
                </div>
            </div>
        )
    }
}