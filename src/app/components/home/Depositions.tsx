'use client';
import Slider from './Slider';
import { useState } from 'react';

import data from '@/../public/data/Data.json';
const { slides } = data;

import Styles from '@/app/styles/home/Deposition.module.css';

export default function Deposition() {
    const [visibleSlide, setVisibleSlide] = useState(0);

    const nextSlide = () => {
        setVisibleSlide(visibleSlide === slides.length-1 ?  0 : visibleSlide + 1);
    }

    const prevSlide = () => {
        setVisibleSlide(visibleSlide === 0 ? slides.length-1 : visibleSlide - 1);
    }
    
    return(
    <div className={Styles.depositions}>
        
        <div className={Styles.title}>
            <h1>Depositions</h1>
        </div>
        <div className={Styles.slider_container}>
            {slides.map((slide) => (
                <Slider 
                    key={slide.id} 
                    slide = {slide} 
                    visibleSlide = {visibleSlide} 
                    nextSlide={nextSlide} 
                    prevSlide={prevSlide}
                />
            ))}
        </div>
    </div>
   ) 
}