import React, {Component} from 'react';
import {Route} from 'react-router-dom';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                {/* <Route path="/" component={navbar}/>*/}
            </div>
        )
    }
}
//Export The Main Component
export default Main;