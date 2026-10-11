import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/templates';

  if (isAuthenticated) return <Navigate to={redirectTo} replace />;

  return (
    <AuthForm
      title="Welcome back"
      submitLabel="Login"
      fields={[
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password', type: 'password' },
      ]}
      onSubmit={async ({ email, password }) => {
        await login(email, password);
        navigate(redirectTo, { replace: true });
      }}
      footer={{ text: "Don't have an account?", to: '/register', link: 'Register' }}
    />
  );
}
