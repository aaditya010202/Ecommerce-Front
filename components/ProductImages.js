import { useState } from "react";
import { styled } from "styled-components";

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageButtons = styled.div`
  display: flex;
  flex-grow: 0;
  gap: 10px;
  margin-top: 10px;
`;
const ImageButton = styled.div`
  border: 2px solid #aaa;
  height: 60px;
  width: 80px;
  padding: 0;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 10px; */
  cursor: pointer;
  border-radius: 3px;

  ${(props) =>
    props.active
      ? `
  border-color: #aaa;
  `
      : `
  border-color: transparent;
  opacity: 0.6;
  `}
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 250px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="image" />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
