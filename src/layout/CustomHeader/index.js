import React, {Component} from 'react'
import {Layout, Avatar, Icon, Menu, Dropdown, Button, message} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {entryFullScreen, exitFullScreen, getGreetings} from './../../utils'
import {actionCreators} from './../../store/modules/app'
import {cleanToken, isDev} from './../../utils'
import './index.scss'

const {Header} = Layout


const IMG_BASE_URL = isDev ? 'http://localhost:5555/chat/' : 'https://xxxxx.cn/manage/'
// todo：打包的时候换成下面这个 url，因为 isDev 不生效，后面需要重新修改下
// const IMG_BASE_URL = 'https://xxxxx.cn/manage/'


class CustomHeader extends Component {
  state = {
    isFullscreen: document.fullscreen
  }
  logout = () => {
    this.props.history.push('/login')
    // this.props.history.replace({pathname: 'login'})
    this.props.logout()
    message.success('退出成功')
  }
  toggleFullscreen = () => {
    const {isFullscreen} = this.state
    if (isFullscreen) {
      exitFullScreen()
      this.setState({
        isFullscreen: false
      })
    } else {
      entryFullScreen()
      this.setState({
        isFullscreen: true
      })
    }
  }
  renderFullOption = () => {
    const {isFullscreen} = this.state
    return <Icon
        className="header-icon"
        onClick={this.toggleFullscreen}
        type={isFullscreen ? "fullscreen-exit" : "fullscreen"}
    />
  }

  render() {
    const {collapsed, toggle, data} = this.props
    const currAdminInfo = data.currAdminInfo || ''
    return (
        <Header className="custom-header" style={{background: '#fff'}}>
          <Icon
              style={{'marginLeft': '-30px', 'marginRight': '30px'}}
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              className="header-icon"
              onClick={() => toggle()}
          />
          <Dropdown overlay={
            <Menu>
              <Menu.Item>
                <Button type="link" onClick={() => {
                  this.logout()
                }}>退出登录</Button>
              </Menu.Item>
            </Menu>
          }>
            <Avatar className="avatar" size="large"
                    src={IMG_BASE_URL + currAdminInfo.avatar}/>
          </Dropdown>
          <span>{currAdminInfo.nickname}，{getGreetings()}</span>
          <span className="full-screen">
          {this.renderFullOption()}
        </span>
        </Header>
    )
  }
}

function mapState(state) {
  return {
    data: state.toJS().app
  }
}

function mapDispatch(dispatch) {
  return {
    logout() {
      cleanToken()
      const action = actionCreators.setCurrAdmin({})
      dispatch(action)
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(CustomHeader))
