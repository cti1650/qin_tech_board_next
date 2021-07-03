import 'tailwindcss/tailwind.css';
import { Auth, Typography, Button } from '@supabase/ui'
import { supabase } from '../../util/supabase';

const Container = (props) => {
  const { user } = Auth.useUser()
  const { Content } = props;
  if (user)
    return (
      <>
        <div className="flex flex-row w-full pl-auto pr-0">
          <div className="ml-auto px-2">
            <Typography.Text>{user.email}</Typography.Text>
          </div>
          <div className="w-20">
            <Button block onClick={() => props.supabaseClient.auth.signOut()}>
              Sign out
            </Button>
          </div>
        </div>
        {Content}
      </>
    )
  return props.children
}

export default function AuthBasic(props) {
  const { children } = props;
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase} Content={children}>
        <div className='absolute left-0 top-0 w-full sm:h-full p-2 flex items-center justify-center bg-cover bg-center bg-black'>
          <div className='sticky top-0 max-w-md min-h-full my-full p-4 sm:p-8 bg-white rounded-lg space-y-2'>
            <div className='text-2xl sm:text-4xl text-black whitespace-pre-wrap'>QinTechBoard</div>
            <div className='text-sm text-gray-800 whitespace-pre-wrap'>Qin Salon内に流れる膨大な情報をストックするためのサービス</div>
            <Auth supabaseClient={supabase} providers={['github','google']} />
          </div>
        </div>
      </Container>
    </Auth.UserContextProvider>
  )
}