import React from 'react'

export default function Result(props) {
  return (
    <div className="result">
          <h3 className="title">{props.title}</h3>
          <h1 className="content">
            {new Intl.NumberFormat("ru").format(
              Math.round(props.value)
            )}{" "}
            ₽
          </h1>
        </div>
  )
}
