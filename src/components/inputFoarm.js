import React from "react";

export default function InputFoarm(props) {
  return (
    <div className="inputForm" disabled={props.off}>
      <h3 className="mainLabel">{props.Label}</h3>
      <div className="Shapes">
        <div className="line">
          <input
          {...props.register}
            type="tel"
            value={new Intl.NumberFormat("ru").format(props.value)}
            inputMode="numeric"
            className="numberinput"
            onChange={(e) =>
              props.handlevalue(e, props.setValue, `${props.name}`)
            }
          />
          {props.current == "ruble" && <h2 className="number">₽</h2>}
          {props.current == "months" && <h2 className="number">мес.</h2>}
          {props.current == "percent" && (
            <div className="percent-box">
              <input
                className="percent"
                type="number"
                value={props.value}
                onChange={(e) => props.handlevalue(e, props.setValue, "term")}
              />
              <h2>%</h2>
            </div>
          )}
        </div>
        <input
          type="range"
          min={props.min}
          max={props.max}
          value={props.value}
          className="progress slider-progress"
          onChange={(e) => props.setValue(e.target.value.replace(/\s/g, ""))}
        />
      </div>
    </div>
  );
}
