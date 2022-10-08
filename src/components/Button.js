import React from "react";

export default function Button(props) {
  return (
    <button
      className="buttomsend"
      disabled={props.off}
      onClick={() => {
        props.onSubmit();
        props.setOff(true);
      }}
    >
      {props.off ? <div className="lds-dual-ring" /> : `Оставить заявку`}
    </button>
  );
}
