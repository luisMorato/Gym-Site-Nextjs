'use client';
import { useState } from 'react';

import Styles from '@/app/styles/home/CalculateBMI.module.css';

export default function CalculateBMI() {
  const [height, setHeight] = useState(0);
  const [wheight, setWheight] = useState(0.0);
  const [bmi, setBmi] = useState(0);
  
  const calculate = (height:number, wheight:number) => {
    if(!height || !height) return;
    else{setBmi((wheight)/(Math.pow(height,2)))};
  }

  return (
    <div className={Styles.calculate_bmi}>
        <div className={Styles.calculate_bmi_container}>
          <h1>Calculate Your BMI</h1>
          <p>Get to Know your Body Mass Index With Our Tool.</p>
          <div className='flex gap-3'>
            <input
              type="number"
              name="wheight"
              value={wheight ? wheight : ''}
              placeholder='Wheight / Kg'
              step="0.01"
              onChange={(e) => setWheight(parseFloat(e.target.value))}
            />
            <input
              type="number"
              name="height"
              value={height ? height : ''}
              placeholder='Height / Meters'
              step="0.01"
              onChange={(e) => setHeight(parseFloat(e.target.value))}
            />
          </div>
          <p>Your BMI is:</p>
          <span>{bmi ? `Your BMI is ${bmi.toFixed(2)}` : ''}</span>
          <br />
          <button type='button' onClick={() => {calculate(height, wheight)}}>Calculate</button>
        </div>
        <div className={Styles.man_exercising}></div>
    </div>
  )
}
