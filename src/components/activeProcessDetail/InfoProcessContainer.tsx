"use client";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faChevronDown,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import styles from "@/styles/components/activeProcessDetail/InfoProcessContainer.module.scss";

library.add(faChevronDown, faArrowRight, faComments);
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";

import { axiosInstance } from "@/api/axiosInstance";
import { ProcessOperationsQueryTypes } from "@/app/api/activeProcessOperations/route";
import DE22000 from "@/assets/images/DE-22000.jpg";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { URL_PAGES } from "@/consts/url";
import { addToastify } from "@/redux/slices/toastSlice";
import { IOptionType } from "@/types/formTypes";
import { ProcessResponse } from "@/types/processTypes";

export default function InfoProcessContainer({
  data,
  trainsOptions,
  refetch,
}: {
  data?: ProcessResponse;
  trainsOptions: IOptionType[];
  refetch: any;
}) {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const t = useTranslations("activeProcessDetail");

  const stageId = useMemo(() => {
    if (data && data?.entries.length !== data?.stages.length) {
      const activeStageOrder = data?.entries?.length;
      const nextStageId = data?.stages[activeStageOrder]._id;
      return nextStageId;
    }
  }, [data]);

  const time = () => {
    if (data?.process) {
      const startTime = new Date(
        data?.process?.startedAt ?? "2026-04-19T08:00:00Z",
      );
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    return "-";
  };

  const [currentTime, setCurrentTime] = useState(time());

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setCurrentTime(time());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [data]);

  const onCompleteProcess = async () => {
    try {
      const { data: responseData } = await axiosInstance.post(
        CLIENT_END_POINTS.activeProcessOperation.complete,
        {
          type: ProcessOperationsQueryTypes.completeProcess,
          id,
        },
      );

      if (responseData.success) {
        dispatch(
          addToastify({
            message:
              "Süreç tamamlandı. Aktif süreçler ekranına yönlendiriliyorsunuz.",
            type: "success",
            icon: "close",
            id: "contactePage" + Date.now(),
          }),
        );
        router.push(URL_PAGES.activeProcesses);
      }
    } catch (err) {
      dispatch(
        addToastify({
          message: (err as Error)?.message || "Hata oluştu",
          type: "error",
          icon: "close",
          id: "editTrainError" + Date.now(),
        }),
      );
    }
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fleetId = e.target.value;
    if (fleetId) {
      router.push(`${URL_PAGES.activeProcesses}/${fleetId}`);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles["sidebar-inner"]}>
        {/* Aktif Projeler */}
        <section>
          <label className={styles["section-label"]}>{t("active-projects")}</label>

          <div className={styles["select-wrap"]}>
            <select
              className={styles["train-select"]}
              onChange={onChangeSelect}
              value={id as string}
            >
              {trainsOptions &&
                trainsOptions.map((aTrain: IOptionType) => (
                  <option
                    key={aTrain.value as string | number}
                    value={aTrain.value as string}
                  >
                    {aTrain.label}
                  </option>
                ))}
            </select>

            <FontAwesomeIcon
              icon="chevron-down"
              className={styles["select-icon"]}
            />
          </div>

          <p className={styles["helper-text"]}>
            {t("active-projects-select-explaining")}
          </p>
        </section>

        {/* Train Card */}
        <section className={styles["train-card"]}>
          <div className={styles.hero}>
            <img src={DE22000.src} alt="Train" />

            <div className={styles["hero-overlay"]}></div>

            <div className={styles["hero-content"]}>
              <h2>{data?.process?.locomotiveNo ?? "-"}</h2>
              <p>
                {(data?.process?.workflowName as string) ??
                  data?.process?.fleetOwner ??
                  "-"}
              </p>
            </div>
          </div>

          <div className={styles["card-body"]}>
            <div className={styles["time-stage"]}>
              <span>{t("total-elapsed-time")}</span>
              <strong suppressHydrationWarning>{currentTime}</strong>
            </div>

            {/* <div className={styles["stats-grid"]}>
              <div className={styles["mini-box"]}>
                <span>Model</span>
                <p>Velaro D-700</p>
              </div>

              <div className={styles["mini-box"]}>
                <span>Yıl</span>
                <p>2023</p>
              </div>
            </div> */}
            <button
              className={styles["complete-btn"]}
              onClick={onCompleteProcess}
            >
              {t("complete-process")}
              <FontAwesomeIcon icon="arrow-right" />
            </button>
          </div>
        </section>

        {/* Teknik Ekip */}
        {/* <section>
          <h4 className={styles["section-label"]}>Teknik Ekip</h4>

          <div className={styles["crew-list"]}>
            <div className={styles["crew-card"]}>
              <div className={styles["crew-left"]}>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Mahmut"
                />

                <div>
                  <p className={styles["crew-name"]}>Mahmut Yılmaz</p>
                  <span className={styles["crew-role"]}>Baş Mekanik</span>
                </div>
              </div>

              <FontAwesomeIcon
                icon="comments"
                className={styles["chat-icon"]}
              /> 
            </div>

            <div className={styles["crew-card"]}>
              <div className={styles["crew-left"]}>
                <img
                  src="https://randomuser.me/api/portraits/women/15.jpg"
                  alt="Ayşecan"
                />

                <div>
                  <p className={styles["crew-name"]}>Ayşecan Demir</p>
                  <span className={styles["crew-role"]}>
                    Sistem Uzmanı
                  </span>
                </div>
              </div>

               <FontAwesomeIcon
                icon="comments"
                className={styles["chat-icon"]}
              />
            </div>
          </div>
        </section> */}
      </div>
    </aside>
  );
}
