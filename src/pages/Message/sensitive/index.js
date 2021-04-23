import React, {useState, useEffect} from 'react'
import {Icon, Table} from 'antd'
import {systemApi} from './../../../api'

import {formatDate} from "../../../utils";

const rowHeight = 90
const columns = [
  {
    title: '消息编号Id',
    dataIndex: 'id',
    key: 'id',
    width: 230,
  },
  {
    title: '消息房间号',
    dataIndex: 'roomId',
    key: 'roomId',
    width: 430,
  },
  {
    title: '发送者Id',
    dataIndex: 'senderId',
    key: 'senderId',
    width: 230,
  },
  {
    title: '发送者账号',
    dataIndex: 'senderName',
    key: 'senderName',
    width: 120,
  },
  {
    title: '消息发送时间',
    dataIndex: 'time',
    key: 'time',
    width: 200,
    render: (text) => (
        <span><Icon type="clock-circle"/> {formatDate(new Date(text), "YYYY-MM-DD HH-MM-SS")}</span>
    )
  },
  {
    title: '消息类型',
    dataIndex: 'type',
    key: 'type',
    width: 100,
  },
  {
    title: '消息内容',
    dataIndex: 'message',
    key: 'message',
    ellipsis: true,
  },
];

export default function Sensitive(props) {
  const [sensitiveList, setSensitiveList] = useState([])
  const [pagination, setPagination] = useState({})


  useEffect(() => {
    ;(async () => {
      const {data = {}} = await systemApi.getSensitiveMessageList()
      // console.log(data)
      if (data.code === 2000) {
        setSensitiveList(data.data.sensitiveMessageList)
        //处理分页显示的参数
        const layouContent = document.querySelector('.ant-layout-content')
        const layouContentHeight = layouContent ? layouContent.offsetHeight : '600'
        const pageSize = Math.round(layouContentHeight / rowHeight)
        const tmp = {
          pageSize,
          total: data.data.sensitiveMessageList.length,
          showTotal: total => `共 ${total} 条数据`
        }
        setPagination(tmp)
      }
    })()
  }, [])

  return (
      <div className="admin-manage-page">
        <p>敏感词消息列表</p>
        <Table pagination={pagination} rowKey={record => record.id} dataSource={sensitiveList} columns={columns}
               scroll={{x: 1000, y: 0}}/>
      </div>
  )
}
