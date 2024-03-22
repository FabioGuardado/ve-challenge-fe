import styles from './UserInfoElement.module.css';

export default function UserInfoElement({ title, info }) {
  return(
    <div className={styles.userInfoElementContainer}>
      <span className={styles.userInfoElementTitle}>{title}</span>
      <span className={styles.UserInfoElementInfo}>{info}</span>
    </div>
  );
};