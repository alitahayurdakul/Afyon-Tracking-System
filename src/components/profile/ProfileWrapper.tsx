
import styles from '@/styles/components/profile/ProfileWrapper.module.scss';

import PasswordForm from './sections/PasswordForm';
import ProfileInfoForm from './sections/ProfileInfoForm';

const ProfileWrapper = () => {
  return (
    <div className={styles["profile-wrapper"]} >
        <ProfileInfoForm />
        <PasswordForm />
    </div>
  )
}

export default ProfileWrapper
