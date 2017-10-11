
import React from 'react';
/*
class Images extends React.Component{
    render(){
        return(
          <img style={{width: 256, height: 320}} src= {this.props.source} alt=""/>
        );
    }
}
export default Images;
*/
export default function Images(props){
 
        return(
          <img src= {props.source} alt=""/>
        );
    
}

