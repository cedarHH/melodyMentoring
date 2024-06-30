import React from 'react';

interface FilmImageProps {
    src: string;
    alt: string;
}

const FilmImage: React.FC<FilmImageProps> = ({ src, alt }) => (
    <div className="film-image">
        <img src={src} alt={alt} />
    </div>
);

export default FilmImage;
