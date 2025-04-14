import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./slider.css"
import "./index.css"; // Asegúrate de tener un archivo CSS para estilos adicionales

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
    <h1 className="mt-5"><span>Mi primer añito</span> <span>Lorenzo</span></h1>
    <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: "75vh" }}>
      {/* 📸 Foto con marco */}
        
      <div style={{ position: "relative", width: "400px", height: "600px", }}>
        <img
          src={currentPhoto.imageUrl}
          alt="Foto proyectada"
          style={{
            position: "absolute",
            top: "5%",
            left: "10%",
            width: "80%",
            height: "95%",
            objectFit: "cover",
            borderRadius: "10px",
            zIndex: 1,
          }}
        />
        <img className="border border-2 border-primary rounded-3"
          src="../public/ChatGPT Image 10 abr 2025, 19_08_59.png" // Ajustá la ruta según corresponda
          alt="Marco decorativo"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "105%",
            zIndex: 2,
          }}
        />
      </div>
      {currentPhoto.comment && (
          <div
          className="comentario border border-2 border-primary rounded-3"
            style={{
              position: "absolute",
              bottom: "400px",
              left: "956px",
              backgroundColor: "rgb(250, 219, 42)",
              padding: "6px 12px",
              borderRadius: "6px",
              fontSize: "20px",
              color: "rgb(0, 81, 255)",
              textAlign: "center",
              zIndex: 3
            }}
          >
            {currentPhoto.comment}
          </div>
        )}
      {/* 💬 Comentario */}
    </Container>
    </>
  );
};

export default PhotoSlideshow;
