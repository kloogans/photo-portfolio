import React from 'react'

const Blur = p => {
  return <svg version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xlink="http://www.w3.org/1999/xlink"
              className="blur-svg">
      <defs>
          <filter id="blur-filter">
              <feGaussianBlur stdDeviation={p.amount}></feGaussianBlur>
          </filter>
      </defs>
  </svg>
}

export default Blur
