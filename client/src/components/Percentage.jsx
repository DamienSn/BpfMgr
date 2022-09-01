import React from 'react'

function Percentage({bgColor, fgColor, percentage, children, className=""}) {
    return (
        <div className={className}>
                    <svg viewBox="0 0 36 36" class="circular-chart">
                        <path
                            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={bgColor}
                            strokeWidth={3.8}
                        />
                        <path
                            strokeDasharray={`${percentage}, 100`}
                            d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={fgColor}
                            strokeWidth={2.8}
                            strokeLinecap="round"
                        />
                    </svg>
                    {children}
                </div>
    )
}

export default Percentage
