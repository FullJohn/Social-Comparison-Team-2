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

export function TwitterMetrics(brandMetrics, post){
    brandMetrics.totalPosts++;
    brandMetrics.totalImpressions += parseInt(post.views);
    brandMetrics.totalEngagements += parseInt(post.comments);
    brandMetrics.totalEngagements += parseInt(post.likes);
	brandMetrics.totalEngagements += parseInt(post.retweets);
    return brandMetrics;
}

export function RenderMetrics(metrics){

    return(
        <Table>
            
            <thead className="Table-Display">
                <tr>
                    <th>Total Impressions</th>
                    <th>Average Impressions</th>
                    <th>Average Engagements</th>
                </tr>
            </thead>
            <tbody className="Table-Display">
                <td>{metrics.totalImpressions}</td>
                <td>{metrics.avgImpressions}</td>
                <td>{metrics.avgEngagements}</td>       
            </tbody>
            
        </Table>
    )
}

export default RenderMetrics