import styles from './header.module.css'
function Header(){
return(
<div className={styles.containerHeader}>
    <div className={styles.titleHeader}>
        <h1 className={styles.headerTitle}>TLS</h1>
    </div>
</div>
);
}
export default Header;