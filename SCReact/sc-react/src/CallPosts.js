import PostFormat from "./PostFormat";
export function renderposts(props){
    
    const test = []
    for(var i = 0; i < props.length; i++){
        test.push(PostFormat(props[i]))
    }
    return(test)
}

export default renderposts