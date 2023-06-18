import { useQuery } from '@tanstack/react-query'
import { getProfile } from '../../../services/profile/getProfile'

export const ProfilePage = () => {
  const profileQuery = useQuery({
    queryKey: ['/profile'],
    queryFn: () => getProfile(),
  })
  //TODO ReactQueryはSuspenseモードで使ってるから、ここがundefinedになるときはアプリ故障ですよというのを示す例外クラスを作る
  if (typeof profileQuery.data === 'undefined') {
    throw new Error()
  }
  const profile = profileQuery.data
  return (
    <div>
      <h1>Profile</h1>
      <p>{profile.email}</p>
      <p>{profile.name}</p>
    </div>
  )
}
