import styles from './page.module.css';
import Bar from '@/components/Bar/Bar';
import MainNav from '@/components/MainNavigation/mainNavigation';
import CenterBlock from '@/components/CenterBlock/centerBlock';
import MainSidebar from '@/components/MainSidebar/mainSidebar';

export default function Home() {
  return (
    <>
      {/* // <div className={styles.wrapper}>
    //   <div className={styles.container}>
    //     <main className={styles.main}>
    //       <MainNav /> */}
      <CenterBlock />
      {/* <MainSidebar /> */}
      {/* </main>
        <Bar />
        <footer className={styles.footer}></footer>
      </div>
    </div> */}
    </>
  );
}
