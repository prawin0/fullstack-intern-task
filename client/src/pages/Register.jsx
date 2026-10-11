import { Navigate, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/templates" replace />;

  return (
    <AuthForm
      title="Create your account"
      submitLabel="Register"
      fields={[
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'password', label: 'Password (min 6 chars)', type: 'password', minLength: 6 },
      ]}
      onSubmit={async ({ name, email, password }) => {
        await register(name, email, password);
        navigate('/templates', { replace: true });
      }}
      footer={{ text: 'Already have an account?', to: '/login', link: 'Login' }}
    />
  );
}
