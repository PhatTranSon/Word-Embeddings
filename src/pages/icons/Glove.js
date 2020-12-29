import * as React from "react"

function GloveIcon(props) {
  return (
    <svg
      width={483}
      height={456}
      viewBox="0 0 483 456"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        stroke={props.color}
        strokeWidth={5}
        d="M2.5 6v449.015M0 3.5h38.15M0 452.515h38.15M226.65 450.015V1M229.15 452.515H191M229.15 3.5H191M254.291 5.905V264M251.791 3.405h20.568M251.791 261.5h20.568M480.068 259.095V1M482.568 261.595H462M482.568 3.5H462"
      />
      <path
        stroke={props.color}
        strokeWidth={2}
        d="M38.15 58.376h152.601M38.15 405.874h152.601M38.15 284.836h152.601M38.15 171.606h152.601M445.449 22.036V227.57M290.941 22.036V227.57M344.759 22.036V227.57M395.104 22.036V227.57"
      />
    </svg>
  )
}

export default GloveIcon;
