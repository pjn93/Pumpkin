import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import "./games.css";

const CallofDuty = ({ data }) => {
  const [imageData, setImageData] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      showPreviousImage();
    } else if (event.key === "ArrowRight") {
      showNextImage();
    }
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageData.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageData.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (data) {
      setImageData(data?.titles);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [data, handleKeyDown]);

  const { title_icon, title, cover_image, background_image } =
    imageData?.[currentImageIndex] || {};
  console.log(
    "title_icon, title, cover_image, background_image:",
    title_icon,
    title,
    cover_image,
    background_image
  );

  return (
    <div
      style={{
        backgroundImage: `url(${background_image})`,
        backgroundSize: "cover",
        height:'100vh', backgroundRepeat:'no-repeat', backgroundPosition:'69%'
      }}
    >
      <div className="container">
        <div className="flex-container">
          <div className="flex-item-left">
            <div className="flexleft1">
              {data?.titles?.map((value) => {
                return (
                  <div key={value.cover_image} style={{ marginLeft: "5px" }}>
                    <img
                      className={`${
                        cover_image === value.cover_image ? "zoomhover" : "zoom"
                      }`}
                      src={value.cover_image}
                      alt="butterfly"
                    />
                  </div>
                );
              })}
            </div>
            <span>
              {title && <p className="text1">Call of duty: {title}</p>}
            </span>
          </div>

          {/* <div>
            <img src={cover_image} alt={title} />
          </div>
          <div>
            <h2>{title}</h2>
          </div> */}

          <div className="flex-item-right">
            {title_icon && (
              <img src={title_icon} height="100" width="100" alt={title} style={{marginLeft:'60px'}} />
            )}
            <button className="btn">Buy now</button>
          </div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
          <button style={{width:'100px',height:'50px'}} className="btn"><Link style={{color:'#fff'}} to='/'>Pre</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallofDuty;