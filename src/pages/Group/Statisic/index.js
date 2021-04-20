import React, {useState, useEffect} from 'react'
import {Icon, Table} from 'antd'
import {groupApi} from './../../../api'

import {formatDateToZH} from "../../../utils";

const columns = [
  {
    title: '群号',
    dataIndex: 'code',
    key: 'code',
    width: 100,
    fixed: 'left',
  },
  {
    title: '群名称',
    dataIndex: 'title',
    key: 'title',
    width: 200,
    fixed: 'left',
    ellipsis: true,
  },
  {
    title: '群人数',
    dataIndex: 'userNum',
    key: 'userNum',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    key: 'createDate',
    width: 200,
    render: (text) => (
        <span><Icon type="clock-circle"/> {formatDateToZH(text)}</span>
    )
  },
  {
    title: '群主账号',
    dataIndex: 'holderName',
    key: 'holderName',
    width: 200,
  },
  {
    title: '群描述',
    dataIndex: 'desc',
    key: 'desc',
    width: 300,
    ellipsis: true,
  },
];

export default function GroupStatics(props) {
  const [groupList, setGroupList] = useState([])

  useEffect(() => {
    ;(async () => {
      const {data = {}} = await groupApi.getAllGroup()
      console.log(data)
      if (data.code === 2000) {
        setGroupList(data.data.allGroup)
      }
    })()
  }, [])

  return (
      <div>
        <p>当前管理员</p>
        <Table rowKey={record => record.id} dataSource={groupList} columns={columns}/>
      </div>
  )
}
