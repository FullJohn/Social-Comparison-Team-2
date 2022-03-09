import PostFormat from "./PostFormat";
export function renderposts(props){
    
    const posts = []
    for(var i = 0; i < props.length; i++){
        posts.push(PostFormat(props[i]))
    }
    return(posts)
}

export default renderposts