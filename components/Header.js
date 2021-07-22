import styles from './header.module.css'
import Link from 'next/link';
function Header(){
return(
<div className={styles.containerHeader}>
    <div>
        <img src= "https://i.ibb.co/ZMj9gXT/TLS-LOGO.png"></img>
    </div>
</div>
);
}
export default Header;
