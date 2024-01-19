'use client';
import Image from 'next/image';
import { FaQuoteRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import { sliderProps } from '@/Types/route';

import Styles from '@/app/styles/home/Slider.module.css';

export default function Slider({ slide, visibleSlide, nextSlide, prevSlide }: sliderProps) {
    return(
        <div key={slide.id} id={`${slide.id}`} className={visibleSlide === slide.id ? Styles.slider_card : Styles.hidden_slider_card}>
            <Image src={slide.imgSrc} alt={slide.name +' depoiment'} width={250} height={250}></Image>
            <div className={Styles.description}>
                <FaQuoteRight className={Styles.quotation}/>
                <blockquote>
                    <i>{slide.text}</i>
                </blockquote>
                <br />
                <h2>- {slide.name}</h2>
                <div>
                    <button onClick={() => prevSlide()}>
                        <FaArrowLeft className="text-4xl text-black"/>
                    </button>
                    <button onClick={() => nextSlide()}>
                        <FaArrowRight className="text-4xl text-black"/>
                    </button>
                </div>
            </div>
        </div>
    )
}