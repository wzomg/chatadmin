import React, {useEffect, useState} from 'react'

import './avatar.scss'

import {systemApi} from './../../api'
import {isDev} from './../../utils'

const IMG_BASE_URL = isDev ? 'http://localhost:5555/chat/' : 'https://xxxxx.cn/manage/'
// todo：打包的时候换成下面这个 url，因为 isDev 不生效，后面需要重新修改下
// const IMG_BASE_URL = 'https://xxxxx.cn/manage/'


export default function AvatarStatics() {

  const [avatarList, setAvatarList] = useState([])

  useEffect(() => {
    ;(async () => {
      const {data = {}} = await systemApi.getAvatar()
      if (data.code === 2000) {
        setAvatarList(data.data.files)
      }
    })()
  }, [])

  return (
      <div className="statics-avatar-page">
        <main className="avatar-list">
          {
            avatarList.map(item => {
              return <span className="avatar-item" key={item}>
              <img width="200" src={IMG_BASE_URL + 'face/' + item} alt="图片"/>
            </span>
            })
          }
        </main>
      </div>
  )
}
