import { useForm } from 'react-hook-form'

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
  return (
    <div>
      <h1>LoginPage</h1>
      <div></div>
    </div>
  )
}
