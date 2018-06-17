import React, { Component } from 'react'
import MUtil from 'util/mm.jsx'
import User from 'service/user-service.jsx'
import './index.scss';

const _mm = new MUtil();
const _user = new User();

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/',
        }
    }
    componentWillMount() {
        document.title = '登录 - MMALL ADMIN';
    }
    // 当用户名发生改变,受控组件
    onInputChange(e) {
        let inputValue = e.target.value;
        let inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }
    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
    }
    onSubmit() {
        const loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let checkResult = _user.checkLoginInfo(loginInfo);
        // 验证通过
        if (checkResult.status) {
            _user.login(loginInfo).then((res) => {
                // 将用户信息保存到localStorage里面
                _mm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        } else {
            // 验证不通过
            _mm.errorTips(checkResult.msg);
        }
    }
  render() {
    return (
      <div>
        <div className='col-md-4 col-md-offset-4'>
          <div className='panel panel-default login-panel'>
            <div className='panel-heading'>欢迎登录 - MMALL管理系统</div>
            <div className='panel-body'>
              <div>
                <div className='form-group'>
                  <input type='text'
                    name='username'
                    className='form-control'
                    placeholder='请输入用户名'
                    onKeyUp={e => this.onInputKeyUp(e)}
                    onChange={e => this.onInputChange(e)} />
                </div>
                <div className='form-group'>
                  <input type='password'
                    name='password'
                    className='form-control'
                    placeholder='请输入密码'
                    onKeyUp={e => this.onInputKeyUp(e)}
                    onChange={e => this.onInputChange(e)} />
                </div>
                <button className='btn btn-lg btn-primary btn-block'
                  onClick={e => { this.onSubmit(e) }}>登录</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
