import { useForm } from 'react-hook-form'
import styles from './styles.module.scss'
import { Input } from '../../common/Form/Input'
import { Button } from '../../common/Button'
import { Header } from '../../common/Header'
import { postToken } from '../../../services/auth/postToken'
import { useRouter } from 'next/router'

type LoginFormValues = {
  email: string
  password: string
}

export const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()
  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      // ログイン処理を実装する
      await postToken({
        email: data.email,
        password: data.password,
      })
      alert('ログインに成功しました。')
      router.push('/profile')
    } catch (e) {
      // まともなエラーハンドリングを実装する
      alert('ログインに失敗しました。')
      throw e
    }
  })

  return (
    <div>
      <Header />
      <div className={styles['root']}>
        <div className={styles['login-card']}>
          <form className={styles['card-content']} onSubmit={handleSubmit}>
            <h1 className={styles['h1']}>ログイン</h1>
            <div className={styles['form']}>
              <div className={styles['form-element']}>
                <div>
                  <label htmlFor="input-email">メールアドレス </label>
                </div>
                <Input
                  id="input-email"
                  type="email"
                  {...form.register('email')}
                  required
                />
              </div>
              <div className={styles['form-element']}>
                <div>
                  <label htmlFor="input-password">パスワード </label>
                </div>
                <Input
                  id="input-password"
                  type="password"
                  {...form.register('password')}
                  required
                />
              </div>
              <div className={styles['login-button']}>
                <Button>ログイン</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
