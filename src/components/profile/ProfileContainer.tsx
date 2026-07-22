import { useTranslations } from "next-intl";

import ProfileWrapper from "./ProfileWrapper";

import styles from "@/styles/components/common/TableListBody.module.scss";

const ProfileContainer = () => {
  const t = useTranslations("profile");

  return (
    <section className={styles["pipeline-page"]}>
      <div className={styles["page-top"]}>
        <div>
          <h2>{t("title")}</h2>
          <p>{t("description")}</p>
        </div>
      </div>
      <ProfileWrapper />
    </section>
  );
};

export default ProfileContainer;
