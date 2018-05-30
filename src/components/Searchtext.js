import React, { Component } from 'react';
import $ from 'jquery';
import './Searchtext.css'

class Searchtext extends Component {
    render() {
        return (
            <div className="searchtext">
                {this.props.textlist.map((item,index)=>{
                    return <p key={index}></p>
                })}
            </div>
        )
    }
    componentDidMount(){
        var that = this
        $('p').each(function(){
            $(this).html(that.props.textlist[$(this).index()])
        })
    }
}

export default Searchtext;