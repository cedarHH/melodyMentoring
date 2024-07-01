import React from 'react';
import FilmImage from './FilmImage';

const images = [
    { src: "img/welcome/anime1.png", alt: "Anime 1" },
    { src: "img/welcome/anime2.png", alt: "Anime 2" },
    { src: "img/welcome/anime3.png", alt: "Anime 3" },
    { src: "img/welcome/anime4.png", alt: "Anime 4" },
    { src: "img/welcome/anime5.png", alt: "Anime 5" },
    { src: "img/welcome/anime6.png", alt: "Anime 6" },
    { src: "img/welcome/anime7.png", alt: "Anime 7" },
    { src: "img/welcome/anime8.png", alt: "Anime 8" },
    { src: "img/welcome/anime9.png", alt: "Anime 9" },
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
