import React from 'react';
import anime1 from '../assets/img/welcome/anime1.png'
import anime2 from '../assets/img/welcome/anime2.png'
import anime3 from '../assets/img/welcome/anime3.png'
import anime4 from '../assets/img/welcome/anime4.png'
import anime5 from '../assets/img/welcome/anime5.png'
import anime6 from '../assets/img/welcome/anime6.jpg'
import anime7 from '../assets/img/welcome/anime7.jpg'
import anime8 from '../assets/img/welcome/anime8.png'
import anime9 from '../assets/img/welcome/anime9.png'

const images = [
    { src: anime1, alt: "Anime 1" },
    { src: anime2, alt: "Anime 2" },
    { src: anime3, alt: "Anime 3" },
    { src: anime4, alt: "Anime 4" },
    { src: anime5, alt: "Anime 5" },
    { src: anime6, alt: "Anime 6" },
    { src: anime7, alt: "Anime 7" },
    { src: anime8, alt: "Anime 8" },
    { src: anime9, alt: "Anime 9" },
];

const groups = [
    images.slice(0, 3).concat(images[0]),
    images.slice(3, 6).concat(images[3]),
    images.slice(6, 9).concat(images[6])
];

const ImageGrid: React.FC = () => (
    <div className="wrapper">
        {Array.from({length: 6}).map((_, divIndex) => (
            <div key={divIndex}>
                {groups[divIndex % 3].map((image, imgIndex) => (
                    <div className="film-image" key={imgIndex}>
                        <img src={image.src} alt={image.alt}/>
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export default ImageGrid;
