import styles from './header.module.css'
import Link from 'next/link';
function Header() {
    return (
        <div className={styles.containerHeader}>
            <div>
                <Link href='/'><a><img src="https://i.ibb.co/ZMj9gXT/TLS-LOGO.png"></img></a></Link>
            </div>
            <nav>
                    <ul className={styles.links}>
                        <li><Link href='#'><a className={styles.headerTitle}>About Us</a></Link></li>
                        <li><Link href='#'><a className={styles.headerTitle}>FAQ</a></Link></li>
                        <li><Link href='#'><a className={styles.headerTitle}>Donate</a></Link></li>
                    </ul>
            </nav>
        </div>
    );
}
export default Header;
