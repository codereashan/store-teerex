import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Text, Flex, useToast, Button, Stack } from "@chakra-ui/react";
import Navbar from "../product/Navbar";
import CartContext from "../store/cart-context";
import CartItem from "./CartItem";

const ShoppingCart = () => {
  const cartContext: any = useContext(CartContext);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    cartContext.getItemsOnload();
    // eslint-disable-next-line
  }, []);

  const addItemHandler = (item: any) => {
    if (item.quantity >= item.availableQuantity) {
      toast({
        title: "Sorry, product is not available",
        status: "warning",
        duration: 7000,
        isClosable: true,
      });
      return;
    }
    cartContext.addItem({ ...item, quantity: 1 });
  };

  const removeItemHandler = (id: any) => {
    cartContext.removeItem(id);
  };

  const deleteProductItemHandler = (id: any) => {
    cartContext.deleteProduct(id);
  };

  return (
    <>
      <Navbar />
      <Text fontWeight="bold" textAlign="center" fontSize="27px" m="12">
        Shopping Cart
      </Text>
      <Flex
        gap="4"
        direction="column"
        alignItems="center"
        pb="4"
        borderBottom="2px solid black"
        w={{ base: "100%", lg: "90%" }}
        ml={{ lg: "20" }}
      >
        {cartContext.items.length > 0 ? (
          cartContext.items.map((item: any, index: any) => (
            <CartItem
              key={index}
              data={item}
              onAdd={addItemHandler.bind(null, item)}
              onRemove={removeItemHandler.bind(null, item.id)}
              onDelete={deleteProductItemHandler.bind(null, item.id)}
            />
          ))
        ) : (
          <Text fontSize="32" my="20" textAlign="center">
            Cart is empty...
          </Text>
        )}
      </Flex>

      {cartContext.items.length > 0 && (
        <Text my="4" textAlign="center" fontSize="18px">
          <b>Total Amount:</b> Rs. {cartContext.totalAmount}
        </Text>
      )}
      <Stack
        direction={{ base: "column", lg: "row" }}
        my="8"
        justifyContent="space-between"
        px="12"
        gap="4"
      >
        <Button bg="none" border="2px solid #333" onClick={() => navigate("/")}>
          Continue shopping
        </Button>
        <Button disabled bg="none" border="2px solid #333">
          Checkout
        </Button>
      </Stack>
    </>
  );
};

export default ShoppingCart;
