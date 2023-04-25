import Modal from "react-bootstrap/Modal";
import styles from "./ModalWindow.module.scss";
export default function ModalWindow(props) {
  return (
    <Modal {...props} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
      {/* <Modal.Header closeButton>
            
            </Modal.Header> */}
      <Modal.Body>
        <span className={styles.sureText}>Are you sure?</span>
        <br></br>
        <span>{props.text} </span>
      </Modal.Body>
      <Modal.Footer>
        <button className={styles.modalDeleteBtn} onClick={props.deleteclick}>
          Delete
        </button>
        <button className={styles.modalCancelBtn} onClick={props.onHide}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}
