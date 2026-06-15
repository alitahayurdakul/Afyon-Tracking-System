import { useTranslations } from 'next-intl';
import React from 'react'

const HomePage = () => {
  const t = useTranslations("example");
  return (
    <>
      <h1>{t("welcome")}</h1>
    </>
  );
}

export default HomePage;
