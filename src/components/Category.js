import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery'
import './Category.css';
import './Home.css';

var page
class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getList: [],
            getNews: [],
            getCount: [],
            id: '19',
            i:0
        }
    }
    render() {
        return (
            <div className='index-wrapper'>
                <div className='main-header-bar'>
                    <i className='icon-source-index icon-return' onClick={this.backHandle.bind(this)}></i>
                    <p className='title'>分类</p>
                    <div className='btn-bar'>
                        <Link to='/search' className='icon-source-index icon-search'></Link>
                        <Link to='/' className='icon-source-index icon-index'></Link>
                        <Link to='/pay' className='icon-source-index icon-pay'></Link>
                    </div>
                </div>
                <div className='top-bar'>
                    <div className='category-wrapper'>
                        <div className='category-bar category-slide' id='categoryBar'>
                            <div className='category-change'>
                                {/* <div className='item active-item'>
                                    <span className='name'>分类</span>
                                </div> */}
                                {/* <div className='item'>
                                    <span className='name' onClick={this.changeHandle.bind(this)}>完结</span>
                                </div> */}
                                {
                                    this.state.getList.map((item, index) => {
                                        return <div key={item.categoryId} className={this.state.i === index?'active':''} id={item.categoryId} onClick={this.changesHandle.bind(this)}>
                                            {item.categoryName}
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <div className='toggle-show' onClick={this.dropdown.bind(this)}>
                            <i className='icon-source-index icon-arrow'></i>
                        </div>
                    </div>
                </div>
                <dl className='list-bar'>
                    {
                        this.state.getNews.map((item, index, arr) => {
                            return <dd className='item' key={item.bookId}>
                                <Link to={'/book/' + item.bookId} className='link'>
                                    <img src={item.bookCover} className='img' alt="" />
                                    <p className='title'>{item.bookName}</p>
                                    <p className='dataume'>更新到{item.chapterCount}话</p>
                                    {
                                        this.state.getCount.filter((itemss) => {
                                            return itemss.bookId === item.bookId
                                        }).map((itemss, indexs) => {
                                            return <p className='view-count' key={itemss.bookId}>
                                                <i className='icon-source-index hot'></i>
                                                {itemss.read > 10000 ? (itemss.read / 10000).toFixed(1) + '万' : itemss.read}
                                            </p>
                                        })
                                    }
                                    <div className='tag-bar'>
                                        {
                                            item.tags.slice(0, 3).map((item) => {
                                                return <span className='tag-item' key={item.tagId}>
                                                    <span className='tag-name'>{item.tagName}</span>
                                                </span>
                                            })
                                        }
                                    </div>
                                    <i className='icon-source-index icon-subscribe'></i>
                                </Link>
                            </dd>
                        })
                    }
                </dl>
            </div>
        )
    };
    componentDidMount() {
        var formData17 = new FormData();
        formData17.append('client', 'h5');
        formData17.append('appVer', '1.7.0');
        formData17.append('appChannel', '');
        axios.post('http://www.cm233.com/Api/Category/getList',formData17)
            .then((data) => [
                this.setState({
                    getList: data.data.data.list
                }),
                console.log(data.data.data.list)
            ]);

        document.documentElement.scrollTop = 0
        page = 0
        this.getdata()
        $(window).bind('scroll', function () {
            var top = document.documentElement.scrollTop
            var max = document.documentElement.scrollHeight - document.documentElement.clientHeight
            if (top === max) {
                this.getdata()
            }
        }.bind(this))
        var getId = new Promise(function (dataolve, reject) {
            axios.post('http://www.cm233.com/Api/Book/getRecentlyIssue').then((data) => {
                this.setState({ getNews: data.data.data.list })
                dataolve(data.data.data.list)
            })
        }.bind(this))
        console.log(getId)
       
    }
    
    componentWillUnmount() {
        $(window).unbind('scroll')
    }
    backHandle() {
        this.props.history.go(-1);
    }
    dropdown() {

    }
    getdata() {
        page++
        var formData = new FormData();
        formData.append('categoryId', this.state.id);
        formData.append('cursor', page);
        formData.append('count', 10);
        formData.append('client', 'h5');
        formData.append('appVer', '1.7.0');
        formData.append('appChannel', '');
        var getId = new Promise(function (resolve, reject) {
            axios.post('http://www.cm233.com/Api/Category/getBookList',formData).then((data) => {
                this.setState((preState)=>{
                    return{
                        getNews: preState.getNews.concat(data.data.data.list)  
                    }
                })
                resolve(data.data.data.list)
            })
        }.bind(this))
        console.log(getId)
        getId.then((data) => {
            var bookIdList = data.map((item, index) => {
                return item.bookId
            })
            // console.log(bookIdList)
            var formData = new FormData();
            formData.append('bookIds', JSON.stringify(bookIdList));
            formData.append('client', 'h5');
            formData.append('appVer', '1.7.0');
            formData.append('appChannel', '');
            axios.post('http://www.cm233.com/Api/Book/getStatistics', formData).then((data) => {
                // console.log(data.data.data.list)
                this.setState((preState)=>{
                    return{
                        getCount: preState.getCount.concat(data.data.data.list)  
                    }
                })
            })
        })
    }
    changesHandle(event) {
        document.documentElement.scrollTop = 0
        console.log('执行点击事件')
        page = 1
        var formDatas = new FormData();
        this.setState({
            id: event.target.id,
            i: $(event.target).index()
        })
        var getId = new Promise(function (resolve, reject) {
            formDatas.append('categoryId', event.target.id);
            formDatas.append('cursor', 1);
            formDatas.append('count', 10);
            formDatas.append('client', 'h5');
            formDatas.append('appVer', '1.7.0');
            formDatas.append('appChannel', '');
            axios.post('http://www.cm233.com/Api/Category/getBookList', formDatas).then((data) => {
                this.setState({ getNews: data.data.data.list })
                resolve(data.data.data.list)
            })
        }.bind(this))
        getId.then((data) => {
            var bookIdList = data.map((item, index) => {
                return item.bookId
            })
            var formData = new FormData();
            formData.append('bookIds', JSON.stringify(bookIdList));
            formData.append('client', 'h5');
            formData.append('appVer', '1.7.0');
            formData.append('appChannel', '');
            axios.post('http://www.cm233.com/Api/Book/getStatistics', formData).then((data) => {
                this.setState({
                    getCount: data.data.data.list
                })
            })
        })
    }
}
export default Category;