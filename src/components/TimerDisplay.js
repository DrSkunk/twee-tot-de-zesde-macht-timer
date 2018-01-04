import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TimerDisplay extends Component {

    static propTypes = {
        timeRemaining: PropTypes.number.isRequired,
        size: PropTypes.number
    }

    static defaultProps = {
        size: 800
    };
    
    render() {
        const size = this.props.size;
        const strokeWidth = 20;
        const trueSize = size - strokeWidth;
        const half = size/2;
        
        const x1 = half;
        const x2 = trueSize;
        const x3 = half;
        const x4 = strokeWidth;
        const y1 = strokeWidth;
        const y2 = half;
        const y3 = trueSize;
        const y4 = half;

        return <div className="timer">
            <svg height={size} width={size}>
                <polyline
                points={x1+','+y1+ ' ' + x2+','+y2+ ' ' + x3+','+y3+ ' ' + x4+','+y4+' '+x1+','+y1+' '+x2+','+y2}
                fill='#fefdf4'
                stroke='#bf3227'
                strokeWidth={strokeWidth}
                />
            <text 
                className='timer-text'
                y={half+140}
                transform={'translate('+half+')'}
                fontSize='420'>
                <tspan x="0" textAnchor="middle">{this.props.timeRemaining}</tspan>
            </text>
            </svg>
        </div>
    }
}

export default TimerDisplay;
