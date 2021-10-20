import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Banner() {
    const [display, setDisplay] = useState(true);
    const searchPage = useSelector(state => state.search.page)
    const banner = useSelector(state => state.banner)

    return (
        banner &&
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