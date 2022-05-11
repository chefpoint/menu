import useSWR from 'swr';
import Image from 'next/image';
import Day from '../components/day/Day';
import IconButton from '../components/iconButton/IconButton';
import Loading from '../components/loading/Loading';
import styles from '../styles/Home.module.css';

export default function Home() {
  //

  const { data: menu } = useSWR('/api/*');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <theme-light>
          <Image src={'/brand/chefpoint-logo-light.svg'} width={250} height={50} alt={'Chef Point - Leading Food & Beverages Solutions'} />
        </theme-light>
        <theme-dark>
          <Image src={'/brand/chefpoint-logo-dark.svg'} width={250} height={50} alt={'Chef Point - Leading Food & Beverages Solutions'} />
        </theme-dark>
        <div className={styles.toolbar}>
          <IconButton icon={'envelopefill'} label={'Contact Us'} href={'mailto:support@chefpoint.pt'} />
        </div>
      </div>
      <div className={styles.list}>{menu ? menu.map((item, index) => <Day key={index} content={item}></Day>) : <Loading />}</div>
    </div>
  );
}
