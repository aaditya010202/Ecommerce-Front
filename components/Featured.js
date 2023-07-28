import Center from "./Center";
import { styled } from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/Cart";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Bg = styled.div`
  background-color: #222;
  padding: 50px 0;
  color: #fff;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 2.7rem;
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  align-items: center;
  img {
    max-width: 100%;
    max-height: auto;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <div>
            <Title>{product.title}</Title>
            <Desc>{product.description}</Desc>
            <ButtonsWrapper>
              <ButtonLink
                href={"/products/" + product._id}
                outline={1}
                white={1}
                size="l"
              >
                Read more
              </ButtonLink>
              <Button white={1} size="l" onClick={addFeaturedToCart}>
                <CartIcon />
                Add to cart
              </Button>
            </ButtonsWrapper>
          </div>
          <div>
            <img
              src="https://aaditya-next-ecommerce.s3.ap-south-1.amazonaws.com/1689533630223.png"
              alt=""
            />
          </div>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
