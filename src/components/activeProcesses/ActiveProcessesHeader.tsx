"use client";
import styles from '@/styles/components/activeProcesses/ActiveProcessesHeader.module.scss';
import { SelectBox } from '../formElements/SelectBox';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

export const ActiveProcessesHeader = () => {
  const { control } = useForm();

  const onChangeProjectSelect = useCallback(
    (selectedProject: string | null) => {
      console.log('Selected Project:', selectedProject);
    },
    [],
  );

  return (
    <section className={styles["active-processes-header"]}>
  <div className={styles["title"]}>
    <h2>Depo Gösterge Paneli</h2>
    <p>Anlık Lokomotif Bakım ve İkmal Durumu</p>
  </div>

  <div className={styles["right-side"]}>
    <div>
      <SelectBox
      key="project-select"
                name="project"
                options={[
                  { value: 'project1', label: 'Proje 1' },
                  { value: 'project2', label: 'Proje 2' }
                ]}
                control={control}
                placeholder={`Proje seçiniz`}
                formLabelClassName={styles["form-label"]}
                isSearchable
                isClearable
                // loading={isLoading}
                changeExtraFn={onChangeProjectSelect}
              />
    </div>
    <div className={styles["stat-box"]}>
      <div className={styles["stat-item"]}>
        <span className={styles["label"]}>Aktif Birim</span>
        <span className={styles["value"]}>12</span>
      </div>
    </div>
  </div>
</section>
  )
}
