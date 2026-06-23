import { Topbar } from "@/components/common/Topbar";
import { ProjectsListBody } from "@/components/projects/ProjectsListBody";
import styles from "@/styles/pages/PageCommonContainer.module.scss";

export default function ProjectsPage() {
  return (
    <div className={styles["page-container"]}>
      <Topbar />
      <ProjectsListBody />
    </div>
  );
}
