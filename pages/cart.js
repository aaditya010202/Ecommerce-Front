import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 1120px) {
    grid-template-columns: 1.3fr 0.7fr;
  }

  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 20px 0;
`;

const ProductImageBox = styled.div`
  width: 220px;
  height: 220px;
  padding: 0px 10px;
  /* border: 1px solid #f0f0f0; */
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 200px;
    max-height: 200px;
  }
`;

const Holder = styled.div`
  display: flex;
  gap: 10px;
`;
const QuantityLabel = styled.span`
  padding: 0 17px;
  display: block;

  @media screen and (min-width: 1120px) {
    display: inline-block;
    padding: 0 20px;
  }
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    if (window.location.href.includes("success")) {
      setIsPaymentSuccess(true);
      clearCart(); // Optionally, you can also clear the cart here.
    }
  }, []);
  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      state,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isPaymentSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Your payment was successful!</h1>
              <p>We will email you when your order will be sent. </p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Cart</h1>
            {!cartProducts.length && <div>Your cart is empty</div>}

            {products.length > 0 && (
              <>
                {" "}
                <Table>
                  <thead>
                    <tr>
                      <td>Product</td>
                      <td>Quantity</td>
                      <td>Price</td>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          {product.title}
                          <ProductImageBox>
                            <img src={product.images[0]} alt="" />
                          </ProductImageBox>
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </Button>
                          <QuantityLabel>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </Button>
                        </td>
                        <td>
                          ₹
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                        </td>
                      </tr>
                    ))}

                    <tr>
                      <td></td>
                      <td>Total Amount :</td>
                      <td>₹{total}</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            )}
          </Box>
          {!!cartProducts.length && (
            <Box>
              <h2>Order information</h2>
              <Input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <Holder>
                <Input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  name="postalCode"
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                />
              </Holder>
              <Input
                type="text"
                placeholder="Street Address"
                name="streetAddress"
                value={streetAddress}
                onChange={(ev) => setStreetAddress(ev.target.value)}
              />
              <Holder>
                <Input
                  type="text"
                  placeholder="State"
                  name="state"
                  value={state}
                  onChange={(ev) => setState(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={country}
                  onChange={(ev) => setCountry(ev.target.value)}
                />
              </Holder>
              <input
                type="hidden"
                name="products"
                value={cartProducts.join(",")}
              />
              <Button onClick={goToPayment} primary block size="l">
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
