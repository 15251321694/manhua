import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Search.css';
import Searchindex from './Searchindex'
import Searchtext from './Searchtext'
import Searchimg from './Searchimg'
class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: 1,
            textlist: [],
            key: '',
            booklist: [],
            bookIdslist: []
        }
    }
    render() {
        return (
            <div data-v-674a25ec className="wrapper">
                <div data-v-674a25ec className="search-bar search-active">
                    <i data-v-674a25ec className="icon-source-index icon-return" onClick={this.backHandle.bind(this)}></i>
                    <i data-v-674a25ec className="icon-source-index icon-search"></i>
                    <input type="text" className="search" placeholder="输入漫画名 | 作者 | 关键字" value={this.state.key} onChange={this.searchHandle.bind(this)} />
                </div>
                <div className="search-wrapper">
                    {this.state.show === 1 && <Searchindex do={this.childtoparent.bind(this)}></Searchindex>}
                    {this.state.show === 2 && <Searchtext textlist={this.state.textlist}></Searchtext>}
                    {this.state.show === 3 && <Searchimg booklist={this.state.booklist} bookIdslist={this.state.bookIdslist}></Searchimg>}
                </div>
            </div>
        )
    }
    componentDidMount() {

    }
    backHandle() {
        this.props.history.go(-1)
    }
    searchHandle(ev) {
        var text = ev.target.value;
        this.setState({
            key: text
        })
        if (text === '') {
            this.setState({
                show: 1
            })
            return
        }
        var formData = new FormData();
        formData.append('client', 'h5');
        formData.append('appVer', '1.7.0');
        formData.append('appChannel', '');
        formData.append('keyword', text)
        axios.post("http://search.cm233.com/api/Search/suggestion", formData).then((data) => {
            if (data.data.data.list) {
                this.setState({
                    textlist: data.data.data.list,
                    show: 2
                })
                console.log(this.state.textlist)
            } else {
                this.setState({
                    show: 4
                })
            }
        })
    }
    searchimg1() {
        this.setState({
            show: 3
        })
        // console.log(2, this.state.key)
        var p1 = new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append('client', 'h5');
            formData.append('appVer', '1.7.0');
            formData.append('count', 10);
            formData.append('keyword', this.state.key)
            formData.append('cursor', 1)
            formData.append('appChannel', '')
            axios.post("http://search.cm233.com/api/Search/books", formData).then((data) => {
                this.setState({
                    booklist: data.data.data.list,
                })
                resolve(data.data.data.list)
            })
        }.bind(this))
        p1.then((data) => {
            // console.log(data);
            var bookidlist = data.map((item,index)=>{
                return item.bookId
            })
            var formData1 = new FormData();
            formData1.append('client', 'h5');
            formData1.append('appVer', '1.7.0');
            formData1.append('appChannel', '');
            formData1.append('bookIds', JSON.stringify(bookidlist));
            axios.post("http://www.cm233.com/api/Book/getStatistics", formData1).then((res) => {
                this.setState({
                    bookIdslist:res.data.data.list
                })
            })
        })
    }
    childtoparent(a) {
        console.log(a)
        var p = new Promise((resolve, reject) => {
            this.setState({
                key: a
            })
            resolve()
        })
        p.then(() => {
            this.searchimg1()
        })
    }
}


export default Search;