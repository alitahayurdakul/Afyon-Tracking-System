"use client";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";

import { useGetUserDetailDataQuery } from "@/api/queries/useGetUsersQueries";
import { RootState } from "@/redux/store";
import styles from "@/styles/components/profile/ProfileWrapper.module.scss";

import PasswordForm from "./sections/PasswordForm";
import ProfileInfoForm from "./sections/ProfileInfoForm";

const ProfileWrapper = () => {
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const params = useParams();
  const id = (params.userId as string) ?? userInfo?.id;

  const { data, isLoading } = useGetUserDetailDataQuery(id, true);

  return (
    <div className={styles["profile-wrapper"]}>
      {!isLoading && (
        <>
          <ProfileInfoForm userInfo={data} />
          <PasswordForm />
        </>
      )}
    </div>
  );
};

export default ProfileWrapper;
