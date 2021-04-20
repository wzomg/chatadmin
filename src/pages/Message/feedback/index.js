import React, {useState, useEffect} from 'react'
import {Icon, Table} from 'antd'
import {systemApi} from './../../../api'

import {formatDate} from "../../../utils";

const columns = [
  {
    title: '反馈编号ID',
    dataIndex: 'id',
    key: 'id',
    width: 230,
  },
  {
    title: '反馈人id',
    dataIndex: 'userId',
    key: 'userId',
    width: 230,
  },
  {
    title: '反馈人账号',
    dataIndex: 'username',
    key: 'username',
    width: 120,
  },
  {
    title: '反馈时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 200,
    render: (text) => (
        <span><Icon type="clock-circle"/> {formatDate(new Date(text), "YYYY-MM-DD HH-MM-SS")}</span>
    )
  },
  {
    title: '反馈内容',
    dataIndex: 'feedBackContent',
    key: 'feedBackContent',
  },
];

export default function Feedback(props) {
  const [feedbackList, setFeedbackList] = useState([])

  useEffect(() => {
    ;(async () => {
      const {data = {}} = await systemApi.getFeedbackList()
      console.log(data)
      if (data.code === 2000) {
        setFeedbackList(data.data.feedbackList)
      }
    })()
  }, [])

  return (
      <div>
        <p>当前管理员</p>
        <Table rowKey={record => record.id} dataSource={feedbackList} columns={columns}/>
      </div>
  )
}
