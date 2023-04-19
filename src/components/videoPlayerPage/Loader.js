import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import styles from "./Loader.module.scss";

const Loader = () => {

  return (
    <div className={styles.loaderContainer}>
      <Spinner className = {styles.loading} animation="grow" variant="dark" />
    </div>
  )
};

export default Loader;
