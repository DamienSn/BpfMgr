import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';

export default function Banner() {
    const [display, setDisplay] = useState(true);

    const history = useHistory();

    useEffect(() => {
        return history.listen((location) => { 
           console.log(`You changed the page to: ${location.pathname}`) 
           if(location.pathname.includes('/map') || location.pathname === '/search') {
               setDisplay(false)
           } else {
               setDisplay(true);
           }
        }) 
     },[history])

     useEffect(() => {
         if (window.location.pathname.includes('/map') || location.pathname === '/search') {
             setDisplay(false);
         }
     }, [])

    return (
        display &&
            <section id="banner">
                <style>
                    {`#banner {
                        background-image: url(${randomImage()})
                    }`}
                </style>
            </section>
    )
}

function randomImage() {
    // Get all banners files
    const range = 7; // Modify this value to change the number of images
    const files = [];
    for (let i = 1; i <= range; i++) {
        files.push(`/img/banners/banner-${i < 10 ? '0' + i.toString() : i}.jpg`);
    }

    let random = Math.floor(Math.random() * range);
    return files[random];
}