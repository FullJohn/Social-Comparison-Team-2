export function YouTubeMetrics(brandMetrics, post){
    brandMetrics.totalPosts++;
    brandMetrics.totalImpressions += parseInt(post.views);
    brandMetrics.totalEngagements += parseInt(post.comments);
    brandMetrics.totalEngagements += parseInt(post.likes);
    return brandMetrics;
}