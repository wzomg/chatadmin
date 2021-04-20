import React, {useEffect, useState} from 'react'
// import {Carousel} from 'antd'
import {systemApi} from './../../api'
import DashBoard from './../../components/BizChart/DashBoard'
import './index.scss'

function Home() {
  const [systemInfo, setSystemInfo] = useState({
    cpuUsage: 0,
    memUsage: 0
  })
  useEffect(() => {
    systemApi.getSystemInfo().then(res => {
      if (res.data.code === 2000) {
        setSystemInfo({
          cpuUsage: res.data.data.cpuUsage,
          memUsage: res.data.data.memUsage
        })
      }
    })
  }, [])
  return (
      <div className="home-page">
        <div className="system-info">
          <div className="item">
            <DashBoard source={systemInfo.cpuUsage} font="CPU使用率"/>
          </div>
          <div className="item">
            <DashBoard source={systemInfo.memUsage} font="内存使用率"/>
          </div>
        </div>
        {/* <Carousel autoplay>
        <div>
          <h3>4</h3>
        </div>
      </Carousel> */}
      </div>

  )
}

export default Home
