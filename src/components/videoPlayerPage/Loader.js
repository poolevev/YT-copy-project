import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import styles from "./Loader.module.scss";

const Loader = () => {

  return (
    <div className={styles.loaderContainer}>
      <Spinner animation="grow" variant="primary" />
      <div classNmae={styles.loading}>Loading...</div>
    </div>
  )
};

export default Loader;
