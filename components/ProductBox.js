import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/Cart";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Link from "next/link";
const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 200px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
  /* padding: 0rem 1rem; */
  /* background-color: #fff; */
`;

const PriceRow = styled.div`
  display: block;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;

  @media screen and (min-width: 1120px) {
    display: flex;
    gap: 10px;
  }
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: right;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: bold;
    text-align: left;
  }
  @media (min-width: 769px) and (max-width: 1119px) {
    text-align: right;
  }
`;
export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="image" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}> {title}</Title>
        <PriceRow>
          <Price>₹{price}</Price>
          <Button block primary outline onClick={() => addProduct(_id)}>
            <CartIcon />
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
