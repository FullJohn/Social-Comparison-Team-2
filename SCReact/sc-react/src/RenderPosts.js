import FacebookFormat from "./ResultsFormat/FacebookFormat";
import InstagramFormat from "./ResultsFormat/InstagramFormat";
import PinterestFormat from "./ResultsFormat/PinterestFormat";
import TiktokFormat from "./ResultsFormat/TiktokFormat";
import TwitterFormat from "./ResultsFormat/TwitterFormat";
import YouTubeFormat from "./ResultsFormat/YouTubeFormat";


export function renderposts(props){

    const platform = props[0]

    const posts = []
    switch(props.platform){
        case 'Facebook':{
            for(var i = 0; i < props[1].length; i++){
                posts.push(FacebookFormat(props[1][i]))
            }
        }
        case 'Instagram':{
            for(var i = 0; i < props[1].length; i++){
                posts.push(InstagramFormat(props[1][i]))
            }
        }
        case 'Pinterest':{
            for(var i = 0; i < props[1].length; i++){
                posts.push(PinterestFormat(props[1][i]))
            }
        }
        case 'TikTok':{
            for(var i = 0; i < props[1].length; i++){
                posts.push(TiktokFormat(props[1][i]))
            }
        }
        case 'Twitter':{
            for(var i = 0; i < props[1].length; i++){
                posts.push(TwitterFormat(props[1][i]))
            }
        }
        case 'YouTube':{
            for(var i = 0; i < props[1].length; i++){
                posts.push(YouTubeFormat(props[1][i]))
            }
        }
        default:
            for(var i = 0; i < props[1].length; i++){
                posts.push(YouTubeFormat(props[1][i]))
            }
    }
    
    return(posts)
}
export default renderposts