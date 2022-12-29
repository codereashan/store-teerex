import { Button, Flex, HStack, Image, Text, useToast } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import CartContext from "../store/cart-context";

const Products = (props: any) => {
  const { id, name, imageURL, price, quantity, type, gender } = props.product;

  const toast = useToast();
  const { addItem, items }: any = useContext(CartContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    items.forEach((item: any) => {
      if (
        item.id === props.product.id &&
        item.quantity === item.availableQuantity
      ) {
        setIsDisabled(true);
      }
    });
    // eslint-disable-next-line
  }, [addingToCart]);

  const handleAddToCart = () => {
    setAddingToCart(true);
    addItem({
      id: id,
      name: name,
      image: imageURL,
      price: price,
      availableQuantity: quantity,
      type: type,
      gender: gender,
      quantity: 1,
    });
    toast({
      title: "item added to cart successfully",
      status: "success",
      duration: 7000,
      isClosable: true,
    });
  };

  if (items.length > 0) {
    let cartItems = JSON.stringify(items);
    localStorage.setItem("cartItems", cartItems);
  }

  return (
    <Flex
      w={{ base: "100%", lg: "255px" }}
      h={{ base: "310px", lg: "260px" }}
      gap="3"
      direction="column"
      alignItems="flex-start"
      justifyContent="center"
      borderRadius="5px"
      boxShadow="2px 2px 8px 2px lightgray"
    >
      <Text
        as="span"
        ml="4"
        fontWeight="bold"
        fontSize={{ base: "22px", lg: "18px" }}
      >
        {name}
      </Text>
      <Image
        ml={{ base: "12", lg: "4" }}
        w={{ base: "75%", lg: "220px" }}
        h={{ base: "200px", lg: "160px" }}
        src={imageURL}
        alt={name}
      />
      <HStack w="90%" ml="4" justifyContent="space-between">
        <Text fontWeight="bold" fontSize={{ base: "20px", lg: "16px" }}>
          Rs. {price}
        </Text>
        <Button
          disabled={isDisabled}
          _hover={{ bg: "blackAlpha.800" }}
          bg="blackAlpha.700"
          color="#FFF"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </HStack>
    </Flex>
  );
};

export default Products;
