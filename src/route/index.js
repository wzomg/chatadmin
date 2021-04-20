import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ContentMain from './../layout/ContentMain'

import MyRoute from "../pages/MyRoute/MyRote"

import Login from './../pages/Login'
import Home from './../pages/Home'
/**用户管理相关 */
import { StatisticsUser, EditUser } from './../pages/User'

import { StatisticsGroup, EditGroup } from './../pages/Group'
// import AdminManage from './../pages/Admin'
import Feedback from './../pages/Message/feedback'
import Sensitive from './../pages/Message/sensitive'

/**系统静态资源 */
import AvatarStatics from './../pages/Statics/avatar'

import NoMatch from "../pages/NoMatch";

class RouterDom extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <ContentMain>
            <Switch>
              {/*<MyRoute exact path="#/" render={() => <Redirect replace to='/home'/>}/>*/}
              {/*<MyRoute exact path="/" render={() => <Redirect replace to='/home'/>}/>*/}
              <MyRoute exact path="/home" component={Home} />

              <MyRoute exact path="/home/user" render={() => <Redirect replace to='/home/user/statistics' />} />
              <MyRoute exact path="/home/user/statistics" component={StatisticsUser} />
              <MyRoute exact path="/home/user/edit" component={EditUser} />

              <MyRoute exact path="/home/group" render={() => <Redirect replace to='/home/group/statistics' />} />
              <MyRoute exact path="/home/group/statistics" component={StatisticsGroup} />
              {/*<Route exact path="/home/group/edit" component={EditGroup}></Route>*/}

              {/*<Route exact path="/home/admin/manage" component={AdminManage}></Route>*/}
              <MyRoute exact path="/home/message/feedback" component={Feedback} />
              <MyRoute exact path="/home/message/sensitive" component={Sensitive} />
              <MyRoute exact path="/home/statics/avatars" component={AvatarStatics} />
              {/* 没有匹配到的路由则跳转到404 页面，这里不需要添加  exact */}
              <MyRoute path="*" component={NoMatch} />
              {/*<Redirect to="/login"/>*/}
            </Switch>
          </ContentMain>
        </Switch>
      </Router>
    )
  }
}

export default RouterDom
