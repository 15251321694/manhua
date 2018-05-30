import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import Axios from 'axios';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [],
            getHot: [],
            getRank: [],
            getHot1: [],
            getHot2: [],
            getHot3: [],
            getHot4: [],
            getLimitFree: [],
            getSpread: [],
            getSpread1: [],
            getByUpdate: [],
            rise: [],
        }
    }
    render() {
        return (
            <div className="index-wrapper">
                <div className="main-header-bar">
                    <p className="title">发现漫画</p>
                    <div className="btn-bar">
                        <Link to='/search' className='icon-source-index icon-search'></Link>
                        <Link to='/pay' className='icon-source-index icon-pay'></Link>
                    </div>
                </div>
                <section className="shuffing-wrapper">
                    <Carousel autoplay>
                        {
                            this.state.getList.map((item, index, arr) => {
                                return <Link key={item.id} className="img" to={'/book/' + item.link}>
                                    <img src={item.imgUrl} alt="" />
                                </Link>
                            })
                        }
                    </Carousel>
                </section>
                <div className="nav-bar">
                    <Link to="/category" className="nav-item nav-category">
                        <i className="icon-nav"></i>
                    </Link>
                    <Link to="/update" className="nav-item nav-update">
                        <i className="icon-nav"></i>
                    </Link>
                    <Link to="/booking" className="nav-item nav-booking">
                        <i className="icon-nav"></i>
                    </Link>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span className="name">✧倾情推荐✧</span>
                            <Link to="/recommend" className="icon-source-index to-more"></Link>
                        </h2>
                        <div className="content">
                            <dl className="four-item-list">
                                {
                                    this.state.getHot.map((item, index, arr) => {
                                        return <dd key={item.bookId} className="item">
                                            <Link className="link" to={'/book/' + item.bookId}>
                                                <div className="img-bar">
                                                    <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                </div>
                                                <p className="title">{item.bookName}</p>
                                                <p className="desc">{item.resume}</p>
                                            </Link>
                                        </dd>
                                    })
                                }
                            </dl>
                        </div>
                    </section>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span className="name">一周热度榜</span>
                            <Link to="" className="icon-source-index to-more"></Link>
                        </h2>
                        <div className="content">
                            <div className="cross-content">
                                <dl className="cross-list">
                                    {
                                        this.state.getRank.map((item, index, arr) => {
                                            return <div key={item.bookId} className="item">
                                                <Link className="link" to={'/book/' + item.bookId}>
                                                    <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                    <div className="text">
                                                        <p className="_title">{item.bookName}</p>
                                                    </div>
                                                    <div className="ranking-num"></div>
                                                    <p className="view-count">
                                                        <i className="hot"></i>{item.readCount > 10000 ? (item.readCount / 10000).toFixed(1) + '万' : item}
                                                    </p>
                                                </Link>
                                            </div>
                                        })
                                    }
                                    <dd className="ranking-item">
                                        <a className="ranking-link"></a>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </section>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span className="name">共赏♔绝美佳作</span>
                            <Link to="/recommend" className="icon-source-index to-more"></Link>
                        </h2>
                        <div className="content">
                            <dl className="six-item-list">
                                {
                                    this.state.getHot1.map((item, index, arr) => {
                                        return <dd key={item.bookId} className="item">
                                            <Link className="link" to={'/book/' + item.bookId}>
                                                <div className="img-bar">
                                                    <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                </div>
                                                <p className="title">{item.bookName}</p>
                                                <p className="desc">{item.resume}</p>
                                            </Link>
                                        </dd>
                                    })
                                }
                            </dl>
                        </div>
                    </section>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span>限时免费看</span>
                        </h2>
                        <div className="content">
                            <dl className="three-item-list">
                                {
                                    this.state.getLimitFree.map((item, index, arr) => {
                                        return <dd key={item.bookId} className="item">
                                            <Link className="link" to={'/book/' + item.bookId}>
                                                <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                <p className="title">{item.bookName}</p>
                                                <p className="desc">{item.resume}</p>
                                                <div className="tag-bar">
                                                    {/* <span className='tag-item'>
                                                        <span className='tag-name'>{item.tags[0].tagName}</span>
                                                    </span>
                                                    <span className='tag-item'>
                                                        <span className='tag-name'>{item.tags[1].tagName}</span>
                                                    </span>
                                                    <span className='tag-item'>
                                                        <span className='tag-name'>{item.tags[2].tagName}</span>
                                                    </span> */}
                                                    {
                                                        item.tags.slice(0, 3).map((i) => {
                                                            return <span className='tag-item' key={i.tagId}>
                                                                <span className='tag-name'>{i.tagName}</span>
                                                            </span>
                                                        })
                                                    }
                                                </div>
                                            </Link>
                                        </dd>
                                    })
                                }
                            </dl>
                        </div>
                    </section>
                </div>
                <div>
                    <div className="single-item-list">
                        <Link className="link" to={'/book/' + this.state.getSpread.link}>
                            <img src={this.state.getSpread.imgUrl} alt="" className="img" />
                        </Link>
                    </div>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span className="name">作者更新啦</span>
                            <Link to="/update" className="icon-source-index to-more"></Link>
                        </h2>
                        <div className="content">
                            <dl className="six-item-list">
                                {
                                    this.state.getByUpdate.map((item, index, arr) => {
                                        return <dd key={item.bookId} className="item">
                                            <Link className="link" to={'/book/' + item.bookId}>
                                                <div className="img-bar">
                                                    <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                </div>
                                                <p className="title">{item.bookName}</p>
                                                <p className="desc">更新到第{item.chapterCount}话</p>
                                            </Link>
                                        </dd>
                                    })
                                }
                            </dl>
                        </div>
                    </section>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span className="name">独家·专享首发</span>
                            <Link to="/list" className="icon-source-index to-more"></Link>
                        </h2>
                        <div className="content">
                            <dl className="six-item-list">
                                {
                                    this.state.getHot2.map((item, index, arr) => {
                                        return <dd key={item.bookId} className="item">
                                            <Link to={'/book/' + item.bookId} className="link">
                                                <div className="img-bar">
                                                    <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                </div>
                                                <p className="title">{item.bookName}</p>
                                                <p className="desc">{item.resume}</p>
                                            </Link>
                                        </dd>
                                    })
                                }
                            </dl>
                        </div>
                    </section>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span className="name">浪漫少女心</span>
                            <Link to="/list" className="icon-source-index to-more"></Link>
                        </h2>
                        <div className="content">
                            <dl className="six-item-list">
                                {
                                    this.state.getHot3.map((item, index, arr) => {
                                        return <dd key={item.bookId} className="item">
                                            <Link to={'/book/' + item.bookId} className="link">
                                                <div className="img-bar">
                                                    <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                </div>
                                                <p className="title">{item.bookName}</p>
                                                <p className="desc">{item.resume}</p>
                                            </Link>
                                        </dd>
                                    })
                                }
                            </dl>
                        </div>
                    </section>
                </div>
                <div>
                    <div className="single-item-list">
                        <Link className="link" to={'/book/' + this.state.getSpread.link}>
                            <img src={this.state.getSpread1.imgUrl} alt="" className="img" />
                        </Link>
                    </div>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span className="name">唯美古风情</span>
                            <Link to="/list" className="icon-source-index to-more"></Link>
                        </h2>
                        <div className="content">
                            <dl className="six-item-list">
                                {
                                    this.state.getHot4.map((item, index, arr) => {
                                        return <dd key={item.bookId} className="item">
                                            <Link to={'/book/' + item.bookId} className="link">
                                                <div className="img-bar">
                                                    <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                </div>
                                                <p className="title">{item.bookName}</p>
                                                <p className="desc">{item.resume}</p>
                                            </Link>
                                        </dd>
                                    })
                                }
                            </dl>
                        </div>
                    </section>
                </div>
                <div>
                    <section className="list-wrapper">
                        <h2 className="single-title">
                            <span className="name">热度上升榜</span>
                            <Link to="/list" className="icon-source-index to-more"></Link>
                        </h2>
                        <div className="content">
                            <dl className="five-item-list">
                                {
                                    this.state.rise.map((item, index, arr) => {
                                        return <dd key={item.bookId} className="item">
                                            <Link to={'/book/' + item.bookId} className="link">
                                                <img src={item.coverList.bookCoverBig} alt="" className="img" />
                                                <p className="title">{item.bookName}</p>
                                                <p className="up"><i className="icon-source-index icon-up"></i>{item.percentage}%</p>
                                                <p className="desc">{item.resume}</p>
                                                <i className="icon-rank"></i>
                                            </Link>
                                        </dd>
                                    })
                                }
                            </dl>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

    componentDidMount() {
        var formData = new FormData();
        formData.append('pos', 1);
        formData.append('max', 5);
        formData.append('client', 'h5');
        formData.append('appVer', '1.7.0');
        formData.append('appChannel', '');
        Axios.post('http://www.cm233.com/Api/Banners/getList', formData)
            .then((res) => [
                this.setState({
                    getList: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        formData.append('moduleId', 6);
        formData.append('count', 4);
        formData.append('cursor', 1);
        Axios.post('http://www.cm233.com/Api/Recommend/getHot', formData)
            .then((res) => [
                this.setState({
                    getHot: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        Axios.post('http://www.cm233.com/Api/Recommend/getRank', formData)
            .then((res) => [
                this.setState({
                    getRank: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        var formData1 = new FormData();
        formData1.append('moduleId', 16);
        formData1.append('count', 6);
        formData1.append('cursor', 1);
        Axios.post('http://www.cm233.com/Api/Recommend/getHot', formData1)
            .then((res) => [
                this.setState({
                    getHot1: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        var formData2 = new FormData();
        formData2.append('count', 3);
        Axios.post('http://www.cm233.com/Api/Recommend/getLimitFree', formData2)
            .then((res) => [
                this.setState({
                    getLimitFree: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        var formData3 = new FormData();
        formData3.append('moduleId', 24);
        formData3.append('cursor', '');
        Axios.post('http://www.cm233.com/Api/Recommend/getSpread', formData3)
            .then((res) => [
                this.setState({
                    getSpread: res.data.data.list[0]
                }),
                console.log(res.data.data.list[0])
            ])
        var formData4 = new FormData();
        formData4.append('count', 6);
        Axios.post('http://www.cm233.com/Api/Recommend/getByUpdate', formData4)
            .then((res) => [
                this.setState({
                    getByUpdate: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        var formData5 = new FormData();
        formData5.append('moduleId', 34);
        formData5.append('count', 6);
        Axios.post('http://www.cm233.com/Api/Recommend/getHot', formData5)
            .then((res) => [
                this.setState({
                    getHot2: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        var formData6 = new FormData();
        formData6.append('moduleId', 17);
        formData6.append('count', 6);
        Axios.post('http://www.cm233.com/Api/Recommend/getHot', formData6)
            .then((res) => [
                this.setState({
                    getHot3: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        var formData7 = new FormData();
        formData7.append('moduleId', 25);
        formData7.append('count', 1);
        Axios.post('http://www.cm233.com/Api/Recommend/getSpread', formData7)
            .then((res) => [
                this.setState({
                    getSpread1: res.data.data.list[0]
                }),
                console.log(res.data.data.list[0])
            ])
        var formData13 = new FormData();
        formData13.append('moduleId', 26);
        formData13.append('count', 6);
        Axios.post('http://www.cm233.com/Api/Recommend/getHot', formData13)
            .then((res) => [
                this.setState({
                    getHot4: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
        var formData8 = new FormData();
        formData8.append('count', 5);
        Axios.post('http://www.cm233.com/Api/Rank/rise', formData8)
            .then((res) => [
                this.setState({
                    rise: res.data.data.list
                }),
                console.log(res.data.data.list)
            ])
    }
}

export default Home;