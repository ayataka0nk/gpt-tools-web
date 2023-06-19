import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../../services/profile/getProfile'
import { Button } from '../../common/Button'
import styles from './styles.module.scss'
import { tokenManager } from '../../../services/tokenManager'
import { postClearToken } from '../../../services/auth/postClearToken'
import { useRouter } from 'next/router'
import { getRequestReply } from '../../../services/conversation/postRequestReply'
import { useState } from 'react'

export const ProfilePage = () => {
  const router = useRouter()
  const profileQuery = useQuery({
    queryKey: ['/profile'],
    queryFn: () => getProfile(),
  })

  //TODO ReactQueryはSuspenseモードで使ってるから、ここがundefinedになるときはアプリ故障ですよというのを示す例外クラスを作る
  if (typeof profileQuery.data === 'undefined') {
    throw new Error()
  }

  const handleLogout = async () => {
    await postClearToken({ refreshToken: tokenManager.getRefreshToken() })
    tokenManager.clearAllToken()
    router.push('/login')
  }

  const profile = profileQuery.data
  const [text, setText] = useState('')
  return (
    <div>
      <h1>Profile</h1>
      <p>{profile.email}</p>
      <p>{profile.name}</p>
      <div className={styles['logout-button']}>
        <Button onClick={handleLogout}>ログアウト</Button>
      </div>
      <div>
        <h2>出力サンプル</h2>
        <Button
          onClick={async () => {
            for await (const word of getRequestReply()) {
              setText((prev) => prev + word)
            }
          }}
        >
          ストリーム受信
        </Button>
        <div>{text}</div>
      </div>
    </div>
  )
}
