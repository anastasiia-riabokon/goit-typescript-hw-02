import {useEffect, useRef} from "react";
import ImageCard from "../ImageCard/ImageCard";

const ImageGallery = ({photos,onClick}:ImageGalleryProps) => {
  const photoRef = useRef<HTMLLIElement>(null);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (photoRef.current) {
        const heightEl = photoRef.current.getBoundingClientRect().height;
        window.scrollBy({
          top: heightEl * 1.5,
          behavior: "smooth",
        });
      }
  }, [photos]);
  return (
    <ul className="flex gap-6 flex-wrap justify-center">
      {photos.map((item:Photo) => (
        <li key={item.id} className="w-[400px] h-[275px]" ref={photoRef}>
          <ImageCard {...item} onClick={onClick} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
