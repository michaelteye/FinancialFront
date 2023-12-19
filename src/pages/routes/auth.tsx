import { showGetStarted } from '@/hooks/show-get-started';
import { useAuthStore } from '@/store/auth';
import { Navigate, useNavigate } from 'react-router-dom';

export const RequiresAuth: React.FC<{}> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  // if user is not authenticated, return redirect to login routes.

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export const RequiresNoAuth: React.FC<{}> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const showGS = showGetStarted();

  if (isAuthenticated()) {
    return <Navigate to={showGS ? '/dashboard/welcome' : '/dashboard/home'} replace />;
  }

  return <>{children}</>;
};
