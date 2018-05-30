import React, { Component } from 'react';
import './Searchimg.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class Searchimg extends Component {
    render() {
        return (
            <div className="searchimg">
                {
                    this.props.booklist.map((item, index) => {
                        return <Link to={'/book/' + item.bookId} key={index} className="searchimg-content">
                            <div className="searchimg-content-img">
                                <img src={item.coverList.bookCoverBig} alt="" />
                            </div>
                            <div className="searchimg-content-p">
                                <p className="p-title">{item.bookName.split("<font color='red'>").join("").split("</font>").join("")}</p>
                                <p className="p-author">{item.author}</p>
                                <div className="searchimg-content-tags">
                                    <div className="tags">
                                        {item.tags.slice(0, 3).map((i, index) => {
                                            return <span key={index}>{i.tagName}</span>
                                        })}
                                    </div>
                                    <div className="read">
                                        <i className="read-eyes"></i>
                                        {
                                            this.props.bookIdslist.filter((a) => {
                                                return a.bookId === item.bookId
                                            }).map((b, index) => {
                                                return <span key={index}>{((b.read).toString()).charAt(0) + '万'}</span>
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </Link>
                    })
                }
            </div>
        )
    }
    componentDidMount() {
        
    }
}

export default Searchimg;