import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

export class Post extends Component{
    
    constructor(props){
        super(props);
        let search= window.location.search.substring(9)
        this.state={queryId: search, posts:[]}
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
            //alert(this.state.posts[0].channel);
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    render(){
        const {posts} = this.state;
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
        // loading brand name subheader titles
        if (brand1name && brand2name && brand3name && (brand1name != brand2name) && (brand2name != brand3name)) {
            document.getElementById("B1").innerHTML=brand1name;
            document.getElementById("B2").innerHTML=brand2name;
            document.getElementById("B3").innerHTML=brand3name;
        }

        return(
            <div className='container-fluid'>
            <br></br>
            <br></br>
            <div class="row">
                <div class="table-responsive col-sm">
                <h2 id="B1">{brand1name}</h2>
                <Table className="table-responsive" striped bordered hover size="sm">
                    
                    <thead>
                        <tr>
                            <th>PostId</th>
                            <th >url</th>
                            <th>title</th>
                            <th>description</th>
                            <th>thumbnail</th>
                            <th>channel</th>
                            <th>date</th>
                            <th>views</th>
                            <th>comments</th>
                            <th>likes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brand1.map(post=>
                            <tr key={post.PostId}>
                                <td>{post.PostId}</td>
                                <td>{post.url}</td>
                                <td>{post.title}</td>
                                <td>{post.description}</td>
                                <td>{post.thumbnail}</td>
                                <td>{post.channel}</td>
                                <td>{post.date}</td>
                                <td>{post.views}</td>
                                <td>{post.comments}</td>
                                <td>{post.likes}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
            <div class="table-responsive col-sm">
                <h2 id="B2"></h2>
                <Table className="table-responsive" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>PostId</th>
                            <th>url</th>
                            <th>title</th>
                            <th>description</th>
                            <th>thumbnail</th>
                            <th>channel</th>
                            <th>date</th>
                            <th>views</th>
                            <th>comments</th>
                            <th>likes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brand2.map(post=>
                            <tr key={post.PostId}>
                                <td>{post.PostId}</td>
                                <td>{post.url}</td>
                                <td>{post.title}</td>
                                <td>{post.description}</td>
                                <td>{post.thumbnail}</td>
                                <td>{post.channel}</td>
                                <td>{post.date}</td>
                                <td>{post.views}</td>
                                <td>{post.comments}</td>
                                <td>{post.likes}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
            <div class="table-responsive col-sm">
                <h2 id="B3"></h2>
                <Table className="table-responsive" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>PostId</th>
                            <th>url</th>
                            <th>title</th>
                            <th>description</th>
                            <th>thumbnail</th>
                            <th>channel</th>
                            <th>date</th>
                            <th>views</th>
                            <th>comments</th>
                            <th>likes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brand3.map(post=>
                            <tr key={post.PostId}>
                                <td>{post.PostId}</td>
                                <td>{post.url}</td>
                                <td>{post.title}</td>
                                <td>{post.description}</td>
                                <td>{post.thumbnail}</td>
                                <td>{post.channel}</td>
                                <td>{post.date}</td>
                                <td>{post.views}</td>
                                <td>{post.comments}</td>
                                <td>{post.likes}</td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
            </div>
            </div>    
        )
    }
}