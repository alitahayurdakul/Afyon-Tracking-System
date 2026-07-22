
import { SidebarMenu } from './sidebarMenu/SidebarMenu';
import { SidebarHeader } from './SidebarHeader';

import styles from '@/styles/components/sidebar/sections/TopSection.module.scss';

export const TopSection = () => {
    return(
        <section className={styles["top-section"]}>
            <SidebarHeader />
            <SidebarMenu />
        </section>
    )
}