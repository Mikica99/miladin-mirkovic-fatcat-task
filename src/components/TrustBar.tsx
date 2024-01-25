import React from 'react';
import Marquee from 'react-fast-marquee';


interface TrustBarProps {
    images: Array<any>
}

const TrustBar: React.FC<TrustBarProps> = ({ images }) => {
  return (
    <Marquee>
        {images.map((image) => (
            <img width={100} key={image} src={image} className="mx-10" />
        ))}
    </Marquee>
  );
};

export default TrustBar;
