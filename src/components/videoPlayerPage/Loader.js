import { CircularProgress } from "@mui/material";

import React from "react";
import "./Loader.module.scss";

const Loader = () => (
  <div className="loader">
    <div className="circular-progress">
      <CircularProgress />
    </div>
  </div>
);

export default Loader;
