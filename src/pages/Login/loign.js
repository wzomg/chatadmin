import React, {Component} from 'react'
import {Input, Button, Icon, message} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {adminApi} from './../../api'
import {saveToken} from './../../utils'
import {actionCreators} from './../../store/modules/app'

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      password: ''
    }
  }

  handlerNameChange = (e) => {
    this.setState({account: e.target.value})
  }

  handlerPwdChange = (e) => {
    this.setState({password: e.target.value})
  }

  login = () => {
    const {account, password} = this.state
    if (account === '' || password === '') {
      message.error('账号或密码不能为空！', 1)
      return
    }
    const params = {
      account, password
    }
    adminApi.login(params).then(res => {
      const data = res.data || {}
      if (data.code === 1000) {
        console.log("返回的登录信息为：", data)
        message.success('登录成功！', 1)
        this.props.setCurrAdmin(data.data.userInfo)
        saveToken(data.data.token)
        this.props.history.push('/home')
      } else {
        message.error(data.message, 1)
      }
    })
  }

  render() {
    return (
        <div className="login-form">
          <div className="form-item">
            <Input
                onChange={this.handlerNameChange}
                prefix={<Icon type="user"/>}
            />
          </div>
          <div className="form-item">
            <Input.Password
                onChange={this.handlerPwdChange}
                prefix={<Icon type="lock"/>}
            />
          </div>
          {/* <div className="form-item cvcode">
          <Input prefix={<Icon type="lock" />} />
          <div>验证码</div>
        </div> */}
          <div className="form-item">
            <Button onClick={this.login} type="primary" block>登录</Button>
          </div>
        </div>
    )
  }
}

function mapDispatch(dispatch) {
  return {
    setCurrAdmin(adminInfo) {
      const action = actionCreators.setCurrAdmin(adminInfo)
      dispatch(action)
    }
  }
}

export default connect(null, mapDispatch)(withRouter(LoginForm))
