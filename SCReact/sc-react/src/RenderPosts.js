import FacebookFormat from "./ResultsFormat/FacebookFormat";
import InstagramFormat from "./ResultsFormat/InstagramFormat";
import PinterestFormat from "./ResultsFormat/PinterestFormat";
import TiktokFormat from "./ResultsFormat/TiktokFormat";
import TwitterFormat from "./ResultsFormat/TwitterFormat";
import YouTubeFormat from "./ResultsFormat/YouTubeFormat";


export function renderposts(props){

    const platform = "YouTube"

    const posts = []

    
    alert(props.platform)
    if(platform == 'Facebook'){
        for(var i = 0; i < props[1].length; i++){
            posts.push(FacebookFormat(props[1][i]))
        }
    }

    else if(platform == 'Instagram'){
        for(var i = 0; i < props[1].length; i++){
            posts.push(InstagramFormat(props[1][i]))
        }
    }

    else if(platform == 'Pinterest'){
        for(var i = 0; i < props[1].length; i++){
            posts.push(PinterestFormat(props[1][i]))
        }
    }

    else if(platform == 'TikTok'){
        for(var i = 0; i < props[1].length; i++){
            posts.push(TiktokFormat(props[1][i]))
        }
    }

    else if(platform == 'Twitter'){
        for(var i = 0; i < props[1].length; i++){
            posts.push(TwitterFormat(props[1][i]))
        }
    }

    else if(platform == 'YouTube'){
        for(var i = 0; i < props.length; i++){
            posts.push(YouTubeFormat(props[i]))
        }
    }
    
    return(posts)
}
export default renderposts