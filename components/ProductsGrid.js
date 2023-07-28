import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductGrid = styled.div`
  display: grid;
  gap: 70px;
  padding-top: 70px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 769px) and (max-width: 1119px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media screen and (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
export default function ProductsGrid({ products }) {
  return (
    <StyledProductGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
    </StyledProductGrid>
  );
}
