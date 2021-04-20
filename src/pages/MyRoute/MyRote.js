import React, { Component } from 'react'
import { Redirect, Route } from "react-router-dom"

export default class MyRote extends Component {
  render() {
    let adminInfo = window.localStorage.getItem('adminInfo') || '{}'
    // console.log(adminInfo, typeof adminInfo)
    return (
      <div>
        {
          adminInfo !== '{}' && JSON.parse(adminInfo).account !== '' ? <Route {...this.props} /> :
            <Redirect to="/login" />
        }
      </div>
    )
  }
}
