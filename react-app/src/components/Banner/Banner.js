import React, { useState } from 'react';
import './ImageBanner.css';

const ImageBanner = () => {

    const images = [
        'https://www.npd.com/wp-content/uploads/2021/05/fashion-banner-1440x480.jpg',
        'https://previews.123rf.com/images/fucsiya/fucsiya2009/fucsiya200900005/154899870-banner-with-pair-of-yellow-shoes-on-yellow-background-minimal-styled-shot-at-angle-.jpg',
        'https://www.alpine.com.au/wp-content/uploads/2019/03/Products-Group-Image-Banner.jpg',
        'https://i.pinimg.com/originals/bb/72/d6/bb72d6d9bd773b903b97ade5cb30a5f2.jpg',
        'https://cdn.shopify.com/s/files/1/0650/8609/files/rolex_preowned_Banner_1.jpg?v=1619813418',
]

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="banner-container">
            <div className="banner">
                <button className="prev-button" onClick={handlePrev}>Previous</button>
                <img src={images[currentIndex]} 
                alt="Banner"
                />
                <button className="next-button" onClick={handleNext}>Next</button>
            </div>
            {/* <div className="buttons">
            </div> */}
        </div>
    );
};

export default ImageBanner;