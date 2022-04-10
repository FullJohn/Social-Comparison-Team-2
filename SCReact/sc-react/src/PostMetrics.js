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
            
            <thead className="Table-Grid">
                <tr>
                    <th className="Table-Grid">Total Impressions</th>
                    <th className="Table-Grid">Average Impressions</th>
                    <th className="Table-Grid">Average Engagements</th>
                </tr>
            </thead>
            <tbody className="Table-Display">
                <td className="Table-Grid">{metrics.totalImpressions}</td>
                <td className="Table-Grid">{metrics.avgImpressions}</td>
                <td className="Table-Grid">{metrics.avgEngagements}</td>       
            </tbody>
            
        </Table>
    )
}

export default RenderMetrics