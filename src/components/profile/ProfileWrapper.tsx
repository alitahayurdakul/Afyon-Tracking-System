"use client";
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import styles from '@/styles/components/profile/ProfileWrapper.module.scss';

import PasswordForm from './sections/PasswordForm';
import ProfileInfoForm from './sections/ProfileInfoForm';

const ProfileWrapper = () => {
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const params = useParams();
  const id = params.userId;
  
  return (
    <div className={styles["profile-wrapper"]} >
        <ProfileInfoForm />
        <PasswordForm />
    </div>
  )
}

export default ProfileWrapper
