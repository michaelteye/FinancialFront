import Login from '@/pages/auth/login/login';
import { RequiresAuth, RequiresNoAuth } from './auth';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { SetPassword } from '../auth/register/set-password';
import { LoginPassword } from '../auth/login/login-password';
import { Registration } from '../auth/register/registration';
import { ResetPassword } from '../auth/login/reset-password';
import { Terms } from '../auth/register/personal-details-form/terms';
import LoginVerification from '@/pages/auth/login/login-verification';
import { Survey } from '../auth/register/personal-details-form/survey';
import { RegisterVerification } from '../auth/register/register-verification';
import { ProfileSetup } from '../auth/register/personal-details-form/profile-setup';
import { SuccessRegistration } from '../auth/register/personal-details-form/success-regitration';
import { LoginSetup } from '../auth/login/login-setup';
import React from 'react';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard/home" replace />} />
      <Route
        path="survey"
        element={
          <RequiresNoAuth>
            <Survey />
          </RequiresNoAuth>
        }
      />
      <Route
        path="terms"
        element={
          <RequiresNoAuth>
            <Terms />
          </RequiresNoAuth>
        }
      />
      <Route path="auth">
        <Route
          path="login"
          element={
            <RequiresNoAuth>
              <LoginSetup />
            </RequiresNoAuth>
          }
        />

        <Route
          path="register"
          element={
            <RequiresNoAuth>
              <Registration />
            </RequiresNoAuth>
          }
        />
        <Route path="register">
          <Route
            path="verify"
            element={
              <RequiresNoAuth>
                <RegisterVerification />
              </RequiresNoAuth>
            }
          />
          <Route path="personal-details" element={<ProfileSetup />} />
          <Route path="password" element={<SetPassword />} />
        </Route>
        <Route
          path="success"
          element={
            <RequiresAuth>
              <SuccessRegistration />
            </RequiresAuth>
          }
        />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
