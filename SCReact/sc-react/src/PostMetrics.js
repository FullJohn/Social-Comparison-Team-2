import "./ResultsFormat/Post.css";
import {Table} from 'react-bootstrap';
import React, {Component} from 'react';


export function YouTubeMetrics(brandMetrics, post){
    brandMetrics.totalPosts++;
    brandMetrics.totalImpressions += parseInt(post.views);
    brandMetrics.totalEngagements += parseInt(post.comments);
    brandMetrics.totalEngagements += parseInt(post.likes);
    return brandMetrics;
}

export function RenderMetrics(metrics){

    return(
        <Table>
            <div className='Total-Metrics'>
            <thead>
                <tr>
                    <th>Total Impressions</th>
                    <th>Average Impressions</th>
                    <th>Average Engagements</th>
                </tr>
            </thead>
            <tbody>
                <td>{metrics.totalImpressions}</td>
                <td>{metrics.avgImpressions}</td>
                <td>{metrics.avgEngagements}</td>       
            </tbody>
            </div>
        </Table>
    )
}

export default RenderMetrics