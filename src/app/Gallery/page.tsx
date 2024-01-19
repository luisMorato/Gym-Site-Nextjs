'use client';
import Image from 'next/image';
import { useState } from 'react';
import { BiX } from 'react-icons/bi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

import data from '@/../public/data/Data.json';
const { galleryImgs } = data;

import Styles from '@/app/styles/gallery/Gallery.module.css';

export default function Gallery() {
    const [itsClicked, setItsClicked] = useState(false);
    const [imgClicked, setImgClicked] = useState({
        src: '/imgs/woman-doing-squats-smith-machine.jpg',
        id: 0
    });
    

    const getImg = (src:string, id:number) => {
        setItsClicked(true);
        setImgClicked({src, id});
    }

    const close = () => {
        setItsClicked(false);
    }

    const nextImg = (id:number) => {
        if(!id) return;
        if(id === galleryImgs.length)id = 0;

        const search = galleryImgs.find((img) => img.id === id+1);
        if(search){
            setImgClicked({src: search.src, id: search.id});
        }
    }

    const PrevImg = (id:number) => {
        if(!id) return;
        if(id === 1){id = galleryImgs.length + 1};

        const search = galleryImgs.find((img) => img.id === id - 1);
        if(search){
            setImgClicked({src: search.src, id: search.id});
        }
    }

    return(
        <>
            <div className={itsClicked === true ? `${Styles.visible} ${Styles.model}` : `${Styles.not_visible} ${Styles.model}`}>
                <BiX className='text-4xl cursor-pointer absolute right-0 m-3' onClick={close}/>
                <div className='flex'>
                    <button className={`${Styles.arrowButton} ${Styles.leftButton }`} onClick={() => PrevImg(imgClicked.id)}><FaArrowLeft/></button>
                    <Image src={imgClicked.src} alt='gallery image' width={400} height={300}></Image>
                    <button className={`${Styles.arrowButton} ${Styles.rightButton}`} onClick={() => nextImg(imgClicked.id)}><FaArrowRight/></button>
                </div>
            </div>

            <div>
                <div className={Styles.galleryLayout}>
                    <h1>Gallery</h1>
                </div>
                <div className={Styles.gallery}>
                    <div className={Styles.content}>
                        {galleryImgs.map((img) => (
                                <Image key={img.id} src={img.src} alt={img.alt} width={150} height={100} onClick={() => getImg(img.src, img.id)} priority></Image>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}