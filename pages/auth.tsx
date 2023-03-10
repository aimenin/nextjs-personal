import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import AuthForm from '../components/auth/auth-form';

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default AuthPage;
