import React,{Component} from 'react';
import {Link} from 'react-router-dom';

import './Pay.css';
import './Home.css';
class Pay extends Component {
    render(){
        return (
            <div className='index-wrapperr'>
                <div className='main-header-bar'>
                    <i className='icon-source-index icon-return' onClick={this.backHandle.bind(this)}></i>
                    <p className='title'>充值</p>
                    <div className='btn-bar'>
                        <Link to='/' className='icon-source-index icon-index'></Link>
                        <Link to='/pay' className='icon-source-index icon-pay'></Link>
                    </div>
                </div>
                <div className=''>

                </div>
            </div>
        )
    }
    componentDidMount(){

    }
    backHandle(){
        this.props.history.go(-1)
    }
}
export default Pay;