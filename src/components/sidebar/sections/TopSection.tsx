
import styles from '@/styles/components/sidebar/sections/TopSection.module.scss';
import { SidebarHeader } from './SidebarHeader';
import { SidebarMenu } from './sidebarMenu/SidebarMenu';

export const TopSection = () => {
    return(
        <section className={styles["top-section"]}>
            <SidebarHeader />
            <SidebarMenu />
        </section>
    )
}