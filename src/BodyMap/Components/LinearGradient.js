import React from "react"

const LinearGradient = () => {
    return (
        <svg>
            <defs>
                <linearGradient id="spam_color">
                    <stop offset="0.05" stopColor="#93278f"/>
                    <stop offset="1" stopColor="#662193"/>
                </linearGradient>
                <linearGradient id="spam_hover">
                    <stop offset="0.05" stopColor="#DCDCDC"/>
                    <stop offset="1" stopColor="#A3A2A2"/>
                </linearGradient>
                <linearGradient id="spam_selected">
                    <stop offset="0.05" stopColor="#E30B0B"/>
                    <stop offset="1" stopColor="#932139"/>
                </linearGradient>
                {/* <filter id="shadow">
                    <feGaussianBlur dx="4" dy="8" stdDeviation="0" />
                </filter> */}
            </defs>
        </svg>
    )
}

export default LinearGradient