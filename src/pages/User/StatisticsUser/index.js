import React, {Component} from 'react'
import {systemApi} from './../../../api'
import {Card, Row, Col, Alert, DatePicker, Statistic} from 'antd'
import moment from 'moment'
import {formatDate, lastMonth} from './../../../utils'
import MapGeo from './components/Map'
import PieChar from './../../../components/BizChart/Pie'
import Histogram from './../../../components/BizChart/Histogram'
import LineChart from './../../../components/BizChart/Line'
import {pieChartData, pieChartCols, histogramCols, lineChartCols} from './../../../const/bizChart'
import {genderSource, ageSource, lastLoginTimeSource, browserSource} from './const'
import './index.scss'

const {MonthPicker} = DatePicker
const defaultMonth = formatDate(new Date(), 'YYYY-MM')
const spaceBetweenStyle = {
  'display': 'flex',
  "justifyContent": "space-between"
}

class StatisticsUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderData: [],
      ageData: [],
      signUpTimeData: [],
      lastLoginTimeData: [],
      browserData: [],
      userNumTotal: 0,
      onlineUser: {},
      selectMonth: defaultMonth
    }
  }

  signUserCardTitle = () => (
      <div style={spaceBetweenStyle}>
        <span>用户在【{this.state.selectMonth}】的注册趋势</span>
        <MonthPicker placeholder="Select Month" defaultValue={moment(defaultMonth)}
                     onChange={(moment, date) => this.handlerMonthChange(date)}/>
      </div>
  )

  alertMessage = () => {
    const {userNumTotal} = this.state
    const onlineuserNum = this.state.onlineUserCount || 0
    const onlineRatio = onlineuserNum === 0 ? "0.00%" : (((onlineuserNum / userNumTotal) * 100).toFixed(2) + "%")
    return (
        <div style={spaceBetweenStyle}>
          <Statistic title="当前用户总量" value={userNumTotal + "人"}/>
          <Statistic title="当前在线用户" value={onlineuserNum + "人"}/>
          <Statistic title="用户在线比例" value={onlineRatio}/>
        </div>
    )
  }

  handlerMonthChange = (e) => {
    this.setState({
      selectMonth: e
    }, () => {
      this.getUserBySignTime()
    })
  }

  getUserBySignTime = () => {
    const {getUserBySignTime} = systemApi
    const {selectMonth} = this.state
    const nextmonth = selectMonth.split('-')
    const lt = nextmonth[1] === '12' ? Number(nextmonth[0]) + 1 + '-' + 1 : Number(nextmonth[0]) + '-' + (Number(nextmonth[1]) + 1)
    const params = {
      lt: selectMonth, // 大于等于
      rt: lt // 小于等于
    }
    // console.log("params:", params)
    getUserBySignTime(params).then(res => {
      const {data, code} = res.data
      if (code === 2000) {
        //console.log("根据注册时间获取用户信息的列表为：", data.userList)
        const signUpTimeList = data.userList.map(item => {
          return formatDate(new Date(item.signUpTime), 'YYYY-MM-DD')
        })
        const thisMonthList = lastMonth(selectMonth)
        signUpTimeList.forEach(item => {
          const index = thisMonthList.findIndex(y => {
            return y.time === item
          })
          index >= 0 && thisMonthList[index].count++
        })
        this.setState({
          signUpTimeData: thisMonthList
        })
      }
    })
  }

  render() {
    const {genderData, ageData, signUpTimeData, lastLoginTimeData, browserData} = this.state
    const genderPieChartData = pieChartData(genderData)
    const browserPieChartData = pieChartData(browserData)
    return (
        <div className="user-statistics-page">
          <Alert message={this.alertMessage()} type="success"/>
          <Row gutter={10}>
            <Col span={12}>
              <Card title="用户性别分布图" className='card-item'>
                <PieChar data={genderPieChartData} scale={pieChartCols}/>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="用户年龄分布图" className="card-item">
                <Histogram data={ageData} scale={histogramCols}/>
              </Card>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <Card title="用户访问浏览器统计" className='card-item'>
                <PieChar data={browserPieChartData} scale={pieChartCols}/>
              </Card>
            </Col>
            {/* <Col span={12}>
            <Card title="用户年龄分布图" className="card-item">
              <Histogram data={ageData} scale={histogramCols} />
            </Card>
          </Col> */}
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <Card title={this.signUserCardTitle()} className="card-item">
                <LineChart data={signUpTimeData} scale={lineChartCols}/>
              </Card>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={24}>
              <Card title="用户登录时间段分布" className="card-item">
                <LineChart data={lastLoginTimeData} scale={lineChartCols}/>
              </Card>
            </Col>
          </Row>
          {/* <Row gutter={10}>
          <Col span={12}>
            <Card title="用户地图分布" className="card-item">
              <MapGeo></MapGeo>
            </Card>
          </Col>
        </Row> */}
        </div>
    )
  }

  componentDidMount() {
    const {getAllUser, getOnlineUser} = systemApi
    getAllUser().then(res => {
      if (res.data.code === 2000) {
        const browserTemplate = browserSource(res.data.data.userList)
        const genderTemplate = genderSource(res.data.data.userList)
        const ageTemplate = ageSource(res.data.data.userList)
        const lastloginTimeTemplate = lastLoginTimeSource(res.data.data.userList)

        this.setState({
          genderData: genderTemplate,
          ageData: ageTemplate,
          browserData: browserTemplate,
          lastLoginTimeData: lastloginTimeTemplate,
          userNumTotal: res.data.data.userList.length
        })
      }
    })
    getOnlineUser().then(res => {
      const {data, code} = res.data
      // console.log("在线用户数量为：", data)
      if (code === 2000 && res.status < 400) {
        this.setState({
          onlineUserCount: data.onlineUserCount
        })
      }
    })
    this.getUserBySignTime()
  }
}

export default StatisticsUser
