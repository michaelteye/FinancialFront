import { useAuthStore } from '@/store/auth';
import React from 'react';
import useGoals from './fetch-goal';

export const showGetStarted = () => {
  const { goals } = useGoals();
  const { stats, userProfile } = useAuthStore();

  if (goals && (goals?.length === 0 || stats?.totalDeposits === 0 || userProfile?.user?.level === 'beginner')) {
    return true;
  } else {
    return false;
  }
};
