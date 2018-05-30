import React, { Component } from 'react';
import './Searchindex.css';
import Axios from 'axios';

class Searchindex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchlist: []
        }
    }
    render() {
        return (
            <div className="search-content">
                <p>大家都在搜</p>
                <div>
                    {
                        this.state.searchlist.map((item, index) => {
                            return <span onClick={this.hotsearch.bind(this)} key={index}>{item}</span>
                        })
                    }
                </div>
            </div>
        )
    }
    hotsearch(ev){
        this.props.do(ev.target.innerText)
    }
    componentDidMount() {
        Axios.post("http://www.cm233.com/Api/Search/getRecWords").then((data) => {
            this.setState({
                searchlist: data.data.data.list
            })
        })
    }
    backHandle() {
        this.props.history.go(-1);
    }
    searchHandle(ev) {
        var text = ev.target.value;
        console.log(text);
        var formData = new FormData();
        formData.append('client', 'h5');
        formData.append('appVer', '1.7.0');
        formData.append('appChannel', '');
        formData.append('keyword', text)
        Axios.post("http://search.cm233.com/Api/Search/suggestion", formData).then((data) => {
            console.log(data);
        })
    }

}

export default Searchindex;