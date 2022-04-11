import FacebookFormat from "./ResultsFormat/FacebookFormat";
import InstagramFormat from "./ResultsFormat/InstagramFormat";
import PinterestFormat from "./ResultsFormat/PinterestFormat";
import TiktokFormat from "./ResultsFormat/TiktokFormat";
import TwitterFormat from "./ResultsFormat/TwitterFormat";
import YouTubeFormat from "./ResultsFormat/YouTubeFormat";


export function renderposts(props){

    
    const posts = []
    const platform = props.platform
    
    if(platform == 'Facebook'){
        for(var i = 0; i < props.brand.length; i++){
            posts.push(FacebookFormat(props.brand[i]))
        }
    }
    else if(platform == 'Instagram'){
        for(var i = 0; i < props.brand.length; i++){
            posts.push(InstagramFormat(props.brand[i]))
        }
    }

    else if(platform == 'Pinterest'){
        for(var i = 0; i < props.brand.length; i++){
            posts.push(PinterestFormat(props.brand[i]))
        }
    }

    else if(platform == 'TikTok'){
        for(var i = 0; i < props.brand.length; i++){
            posts.push(TiktokFormat(props.brand[i]))
        }
    }

    else if(platform == 'Twitter'){
        for(var i = 0; i < props.brand.length; i++){
            posts.push(TwitterFormat(props.brand[i]))
        }
    }

    else if(platform == 'YouTube'){
        for(var i = 0; i < props.brand.length; i++){
            posts.push(YouTubeFormat(props.brand[i]))
        }
    }
    
    return(posts)
}
export default renderposts