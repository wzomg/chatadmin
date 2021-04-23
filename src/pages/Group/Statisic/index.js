import React, {useState, useEffect} from 'react'
import {Icon, Table} from 'antd'
import {groupApi} from './../../../api'

import {formatDateToZH} from "../../../utils";

const rowHeight = 90
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
  const [pagination, setPagination] = useState({})

  useEffect(() => {
    ;(async () => {
      const {data = {}} = await groupApi.getAllGroup()
      console.log(data)
      if (data.code === 2000) {
        setGroupList(data.data.allGroup)
        //处理分页显示的参数
        const layouContent = document.querySelector('.ant-layout-content')
        const layouContentHeight = layouContent ? layouContent.offsetHeight : '600'
        const pageSize = Math.round(layouContentHeight / rowHeight)
        const tmp = {
          pageSize,
          total: data.data.allGroup.length,
          showTotal: total => `共 ${total} 条数据`
        }
        setPagination(tmp)
      }
    })()
  }, [])

  return (
      <div>
        <p>群组列表</p>
        <Table pagination={pagination} rowKey={record => record.id} dataSource={groupList} columns={columns}
               scroll={{x: 1000, y: 0}}/>
      </div>
  )
}
