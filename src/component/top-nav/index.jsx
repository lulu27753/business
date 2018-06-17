import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'
const _mm = new MUtil()
const _user = new User();

class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: _mm.getStorage('userInfo').username || ''
        }
    }
    // 退出登录
    onLogout() {
        _user.logout().then(res => {
            _mm.removeStorage('userInfo');
            // 用原生的方式处理路由跳转，会导致重新加载登陆页时，直接请求html文件，而不是组件的跳转
            window.location.href = '/login';
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    render() {
        return (
          <div className='navbar navbar-default top-navbar'>
            <div className='navbar-header'>
              <Link className='navbar-brand' to='/'><b>HAPPY</b>MMALL</Link>
            </div>

            <ul className='nav navbar-top-links navbar-right'>
              <li className='dropdown'>
                <a className='dropdown-toggle' href='javascript:;'>
                  <i className='fa fa-user fa-fw' />
                  {
                        this.state.username
                            ? <span>欢迎，{this.state.username}</span>
                            : <span>欢迎您</span>
                }
                  <i className='fa fa-caret-down' />
                </a>
                <ul className='dropdown-menu dropdown-user'>
                  <li>
                    <a onClick={() => { this.onLogout() }}>
                      <i className='fa fa-sign-out fa-fw' />
                      <span>退出登录</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )
    }
}

export default TopNav
