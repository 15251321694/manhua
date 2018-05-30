import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './Recommend.css';
import './Home.css';
class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getHot: [],
        }
    }
    render() {
        return (
            <div data-v-661eaaa2 className='list-wrapper'>
                <div className='main-header-bar'>
                    <i className='icon-source-index icon-return' onClick={this.backHandle.bind(this)}></i>
                    <p className='title'>✧倾情推荐✧</p>
                    <div className='btn-bar'>
                        <Link to='search' className='icon-source-index icon-search'></Link>
                        <Link to='/' className='icon-source-index icon-index'></Link>
                        <Link to='/pay' className='icon-source-index icon-pay'></Link>
                    </div>
                </div>
                <div className='subject-list'></div>
                <div className="results">
                    {
                        this.state.getHot.map((item, index, arr) => {
                            return <Link key={item.bookId} to={'/book/' + item.bookId} className="item">
                                <div className="img-bar">
                                    <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                </div>
                                <div className="text-bar">
                                    <p className="title key-name">{item.bookName}</p>
                                    <p className="author">{item.author}</p>
                                    <p className="author">更新到第{item.chapterCount}话</p>
                                    <div className="tag-bar">
                                        <span className='tag-item'>
                                            <span className='tag-name'>{item.tags[0].tagName}</span>
                                        </span>
                                        <span className='tag-item'>
                                            <span className='tag-name'>{item.tags[1].tagName}</span>
                                        </span>
                                        <span className='tag-item'>
                                            <span className='tag-name'>{item.tags[2].tagName}</span>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        })
                    }
                </div>
            </div >
        )
    }
    componentDidMount() {
        var formData = new FormData();
        formData.append('moduleId', 6);
        formData.append('count', 10);
        formData.append('cursor', '');
        formData.append('client', 'h5');
        formData.append('appVer', '1.7.0');
        formData.append('appChannel', '');
        Axios.post('http://www.cm233.com/Api/Recommend/getHot', formData)
            .then((res) => [
                this.setState({
                    getHot: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
    }
    backHandle() {
        this.props.history.go(-1)
    }
}
export default Recommend;