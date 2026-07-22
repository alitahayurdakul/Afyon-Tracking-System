"use client";
import { useSelector } from "react-redux";

import { useGetUserDetailDataQuery } from "@/api/queries/useGetUsersQueries";
import { RootState } from "@/redux/store";

import PasswordForm from "./sections/PasswordForm";
import ProfileInfoForm from "./sections/ProfileInfoForm";

import styles from "@/styles/components/profile/ProfileWrapper.module.scss";

const ProfileWrapper = () => {
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const id = userInfo?.id ?? "";

  const { data, isLoading, isError } = useGetUserDetailDataQuery(id, true);

  return (
    <div className={styles["profile-wrapper"]}>
      {!isLoading && (
        <>
          <ProfileInfoForm userInfo={data} isLoading={isLoading} isError={isError} />
          <PasswordForm  isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default ProfileWrapper;
