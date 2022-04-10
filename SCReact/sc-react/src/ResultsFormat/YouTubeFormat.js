import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import "./Post.css";

export function YouTubeFormat(props){
    var numPosts = props.metrics.totalPosts;
    var numImpressions = props.metrics.totalImpressions;
    var avgImpressions = numImpressions/numPosts;
    var avgEngagements = props.metrics.totalEngagements/numPosts;

    return(
            <div className = "Post-Wrapper">
                impressions = {numImpressions}
                avgImpressions = {avgImpressions}
                avgEngagements = {avgEngagements}
                        <div className='Post-Image-Title-Wrapper'> 
                            <p>
                                <a href = {props.url}>
                                    <img className ="Post-Image" src={props.thumbnail} alt = "new">
                                    </img>
                                    <div className='Post-Title'> 
                                        {props.title}
                                    </div>
                                </a>    
                                <div className='Post-Date'>
                                    {props.date}
                                </div>
                            </p>    
                        </div>
    
                        
                            <div className='Post-Metrics'>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Views</th>
                                            <th>Comments</th>
                                            <th>Likes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>{props.views}</td>
                                        <td>{props.comments}</td>
                                        <td>{props.likes}</td>       
                                    </tbody>
                                </Table>
                                <div className='Post-Description'>
                                    {props.description}
                                </div>    
                            </div>                          
                                
                       
                   
                    </div>
            )
    }
export default YouTubeFormat;