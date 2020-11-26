import React, { Component } from 'react';
import { graphql } from 'react-apollo'

import {getLessonQuery} from '../query/queries'

class Lesson extends Component {
    render() {
       console.log(this.props.data)
       const data = this.props.data
       let lesson;
       if(data.loading){
           lesson = <h1>Loading...</h1>
       }else{
       lesson = data.lessons.map((val)=>{
           return (
           <li key={val.id}>{val.lesson}</li>
           )
        })
       }
        return (
            <div>
                <ul>
                {lesson}
                </ul>
            </div>
        );
    }
}

export default graphql(getLessonQuery)(Lesson);