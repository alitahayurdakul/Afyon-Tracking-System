import { Topbar } from "@/components/common/Topbar";
import { ProjectsListBody } from "@/components/projects/ProjectsListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function ProjectsPage() {
  return (
    <div className={styles["trains-container"]}>
      <Topbar />
      <ProjectsListBody />
    </div>
  );
}
