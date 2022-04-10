import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import "./ResultsFormat/Post.css";
import renderposts from './RenderPosts';
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
        for (var i = 0; i < postsLength; i++) {
            if (posts[i].channel == brand1name) {
                brand1.push(posts[i]);
            }
            else if (posts[i].channel == brand2name) {
                brand2.push(posts[i]);
            }
            else {
                brand3.push(posts[i]);
            }
        }
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
                        {renderposts({brand: brand1, platform: platform})}
                    </div>
                    <div className='Row-Wrapper'>
                        <br></br>
                        <br></br>
                        <h2 id="B2">{brand2name}</h2>
                        {renderposts({brand: brand2, platform: platform})}
                    </div>
                    <div className='Row-Wrapper'>
                        <br></br>
                        <br></br>
                        <h2 id="B3">{brand3name}</h2>
                        {renderposts({brand: brand3, platform: platform})}
                    </div>
                </div>
            </div>
        )
    }
}