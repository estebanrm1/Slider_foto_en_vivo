import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./slider.css"
import "./index.css"; 
import marco from "../src/assets/img/marcoplinplin.png"// Asegúrate de tener un archivo CSS para estilos adicionales

const PhotoSlideshow = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔄 Fetch cada 10 segundos
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch("https://backend-fv.onrender.com/api/photos");
        const data = await response.json();

        setPhotos((prevPhotos) => {
          if (prevPhotos.length === 0) return data;

          const currentImageUrl = prevPhotos[currentIndex]?.imageUrl;
          const newIndex = data.findIndex(photo => photo.imageUrl === currentImageUrl);

          if (newIndex !== -1) setCurrentIndex(newIndex);
          else setCurrentIndex(0);

          return data;
        });
      } catch (error) {
        console.error("Error al obtener las fotos:", error);
      }
    };

    fetchPhotos();
    const fetchInterval = setInterval(fetchPhotos, 10000);
    return () => clearInterval(fetchInterval);
  }, [currentIndex]);

  // 🎞 Slide automático cada 3 segundos
  useEffect(() => {
    if (photos.length === 0) return;

    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 8000);

    return () => clearInterval(slideInterval);
  }, [photos]);

  if (photos.length === 0) return <p>Cargando imágenes...</p>;

  const currentPhoto = photos[currentIndex];

  return (
    <>
    <h1 className="my-5"><span>Mi primer añito</span> <span>Lorenzo</span></h1>
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: "75vh" }}>
      {/* 📸 Foto con marco */}

<div className="slider-container">
  <img
    src={currentPhoto.imageUrl}
    alt="Foto proyectada"
    className="slider-image"
  />
  <img
    src={marco}
    alt="Marco decorativo"
    className="slider-frame rounded-3"
  />
</div>

{currentPhoto.comment && (
  <div className="comment-box">
    {currentPhoto.comment}
  </div>
)}
      {/* 💬 Comentario */}
    </Container>
    </>
  );
};

export default PhotoSlideshow;
