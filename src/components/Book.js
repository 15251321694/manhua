import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import './Home.css';
import './Book.css';
class Book extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: [],
            getDetail: [],
            getStatistics: [],
            hot: [],
            chapterCount: '',
            show: true
        }
    }
    render() {
        var isFinish = this.state.getDetail.isFinish,
            updateType;
        if (isFinish === true) {
            updateType = <span className='update-type'>完结</span>
        } else {
            updateType = <span className='update-type'>连载中</span>
        }


        var i = 1;
        var chapterCountList1 = [];
        while (i <= 6 && i <= parseInt(this.state.chapterCount)) {
            chapterCountList1.push(i);
            i++
        }
        console.log(chapterCountList1)

        var n = parseInt(this.state.chapterCount);
        var chapterCountList2 = [];
        while (n >= parseInt(this.state.chapterCount) - 5 && n > 0) {
            chapterCountList2.push(n);
            n--
        }
        console.log(chapterCountList2)
        return (
            <div className='wrapper'>
                <div className='main-header-bar'>
                    <i className='icon-source-index icon-return' onClick={this.backHandle.bind(this)}></i>
                    <p className='title'>{this.state.getDetail.bookName}</p>
                    <div className='btn-bar'>
                        <Link to='/' className='icon-source-index icon-index'></Link>
                        <Link to='/pay' className='icon-source-index icon-pay'></Link>
                    </div>
                </div>
                <section className='top-wrapper'>
                    <img src={this.state.getDetail.bookCover} className='banner-img' alt="" />
                    <div className='text-bar'>
                        <div className='bottom-text-bar'>
                            <h1 className='title'>{this.state.getDetail.bookName}</h1>
                            <p className='author'>{this.state.getDetail.author}</p>
                            <p className='hot'>
                                <i className='icon-source-list-rem icon-hot'></i>
                                <span className='inline'>{this.state.getStatistics.read > 10000 ? (this.state.getStatistics.read / 10000).toFixed(1) + '万' : this.state.getStatistics.read}</span>
                            </p>
                        </div>
                    </div>
                </section>
                <div className="resume-bar">
                    <p className="title">
                        <span className="inline">作品简介</span>
                        {updateType}
                    </p>
                    <p className="text">
                        <span id="resumeText" className="inlines">{this.state.getDetail.resume}</span>
                    </p>
                    <div className="tag-bar1 resume-much resume-hide">
                        <i className="show-much" onClick={this.muchHandle.bind(this)}></i>
                        {
                            this.state.tags.slice(0, 3).map((item) => {
                                return <span className='tag-item' key={item.tagId}>
                                    <span className='tag-name'>{item.tagName}</span>
                                </span>
                            })
                        }
                    </div>
                </div>
                <div className="chapter-bar">
                    <p className="title">
                        剧情章节
                        <i className="icon-source-list icon-order" onClick={this.setHandle.bind(this)}></i>
                    </p>
                    <div className="list">
                        {
                            this.state.show === true && chapterCountList1.map((item, index) => {
                                return <li className="item" key={index}>第{item}话</li>
                            })
                        }
                    </div>
                    <div className="lists">
                        {
                            this.state.show === false && chapterCountList2.map((item, index) => {
                                return <li className="item" key={index}>第{item}话</li>
                            })
                        }
                    </div>
                    <span className="btn">还有更多章节O(∩_∩)O~~</span>
                </div>
                <div className="comment-wrapper">
                    <div id="hotComment" className="comment-bar">
                        <p className="title"><span className="inline">精彩书评</span></p>
                        <div className="comment-list">
                            {
                                this.state.hot.map((item, index, arr) => {
                                    return <div key={item.commentId} className="item">
                                        <div className="basic">
                                            <div className="head-bar">
                                                <img src={item.userIcon} className="head" alt="" />
                                                <span className="offical">官方</span>
                                                <span className="level level level-01">LV{item.level}</span>
                                                <i className="icon-source-list icon-tuhao is-tuhao-0100"></i>
                                            </div>
                                            <p className="offical-name">{item.userName}</p>
                                            <p className="time">{item.commentTime}</p>
                                        </div>
                                        <p className="text-bar">
                                            <span className="text">{item.content}</span>
                                        </p>
                                        <span className="like">
                                            <i className="icon-source-list icon-like"></i>
                                            <span className="num">{item.praiseCount}</span>
                                        </span>
                                        <div className="btn-bar">
                                            <span className="show-all">展开</span>
                                            <a className="to-comments">相关评论 . {item.replyCount} ></a>
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                        <p className="load-more">
                            <span className="inline">点击加载更多评论哦～</span>
                        </p>
                    </div>
                </div>
                <div className="footer-btn">
                    <span className="btn-item btn-sub">加入书架</span>
                    <span className="btn-item btn-read">开始阅读</span>
                </div>
            </div>
        )
    }
    componentDidMount() {
        var formData = new FormData();
        formData.append('bookId', this.props.match.params.id);
        formData.append('client', 'h5');
        formData.append('appVer', '1.7.0');
        formData.append('appChannel', '');
        axios.post('http://www.cm233.com/Api/Book/getDetail', formData)
            .then((res) => [
                this.setState({
                    getDetail: res.data.data,
                    tags: res.data.data.tags,
                    chapterCount:res.data.data.chapterCount
                }),
                console.log(res.data.data)
            ])
        let bookId = this.props.match.params.id
        console.log(bookId)
        var formData10 = new FormData();
        formData10.append('bookIds', JSON.stringify([bookId]));
        axios.post('http://www.cm233.com/Api/Book/getStatistics', formData10).then((res) => {
            console.log(res.data.data.list[0])
            this.setState({
                getStatistics: res.data.data.list[0]
            })
        })
        var formData11 = new FormData();
        formData11.append('bookId', this.props.match.params.id);
        formData11.append('appVer', '2.4.0');
        formData11.append('count', 10);
        axios.post('http://www.cm233.com/Api/Bookcomment/hot', formData11)
            .then((res) => [
                this.setState({
                    hot: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
    }
    backHandle() {
        this.props.history.go(-1);
    }
    muchHandle() {
        $(".resume-bar i").toggleClass("show-much");
        $(".resume-bar i").toggleClass("show-muchs");
        $(".resume-bar .text span").toggleClass("inliness");
        $(".resume-bar .text span").toggleClass("inlines");
    }
    setHandle() {
        $(".title i").toggleClass("icon-order");
        $(".title i").toggleClass("icon-desc");
        this.setState((prestate) => {
            return {
                show: !prestate.show
            }
        })
    }
}
export default Book;
