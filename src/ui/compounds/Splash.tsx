import React from "react";

import { ReactComponent as Logo } from "assets/logo.svg";

export default function Splash() {
  return (
    <div className="Splash">
      <Logo className="Splash-icon" />
      <div className="Splash-label">[MINES]</div>
    </div>
  );
}
