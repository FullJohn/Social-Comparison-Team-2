import FacebookFormat from "./ResultsFormat/FacebookFormat";
import InstagramFormat from "./ResultsFormat/InstagramFormat";
import PinterestFormat from "./ResultsFormat/PinterestFormat";
import TiktokFormat from "./ResultsFormat/TiktokFormat";
import TwitterFormat from "./ResultsFormat/TwitterFormat";
import YouTubeFormat from "./ResultsFormat/YouTubeFormat";


export function renderposts(props){
    const posts = []
    switch(props.platform){
        case 'Facebook':{
            for(var i = 0; i < props.length; i++){
                posts.push(FacebookFormat(props[i]))
            }
        }
        case 'Instagram':{
            for(var i = 0; i < props.length; i++){
                posts.push(InstagramFormat(props[i]))
            }
        }
        case 'Pinterest':{
            for(var i = 0; i < props.length; i++){
                posts.push(PinterestFormat(props[i]))
            }
        }
        case 'TikTok':{
            for(var i = 0; i < props.length; i++){
                posts.push(TiktokFormat(props[i]))
            }
        }
        case 'Twitter':{
            for(var i = 0; i < props.length; i++){
                posts.push(TwitterFormat(props[i]))
            }
        }
        case 'YouTube':{
            for(var i = 0; i < props.length; i++){
                posts.push(YouTubeFormat(props[i]))
            }
        }
        default:
            for(var i = 0; i < props.length; i++){
                posts.push(YouTubeFormat(props[i]))
            }
    }
    
    return(posts)
}
export default renderposts