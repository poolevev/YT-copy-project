import Toast from 'react-bootstrap/Toast';
import styles from "./ToastAlert.module.scss"

export default function ToastAlert({ close, text, show }) {
    return (
        <div className={styles.toastContainer}>
            <Toast onClose={close} show={show} delay={2000} autohide>

                <Toast.Body style={{ wordWrap: "break-word" }}>{text}</Toast.Body>
            </Toast>
        </div>
    )
}