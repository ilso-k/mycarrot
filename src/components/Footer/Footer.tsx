import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.links}>
                    <span>이용약관</span>
                    <span>개인정보처리방침</span>
                    <span>운영정책</span>
                </div>
                <div className={styles.copyright}>
                    &copy; Daangn Market Inc.
                </div>
            </div>
        </footer>
    );
}
