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
        <div className='max-w-md w-full h-full mx-auto p-8 bg-white rounded-lg'>
          <div className='text-4xl text-black mb-4'>QinTechBoard</div>
          <Auth supabaseClient={supabase} providers={['github']} />
        </div>
      </Container>
    </Auth.UserContextProvider>
  )
}