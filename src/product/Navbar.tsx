import { useContext, useEffect } from "react";
import { Flex, Button, Icon, Text, Stack, Box } from "@chakra-ui/react";
import { BsCart3 } from "react-icons/bs";
import CartContext from "../store/cart-context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    cartContext.getItemsOnload();
    // eslint-disable-next-line
  }, []);

  const cartCount = cartContext.items.length > 0 ? cartContext.items.length : 0;

  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      bg="lightgray"
      py="4"
      px={{ base: "6", lg: "10" }}
    >
      <Text
        onClick={() => navigate("/")}
        cursor="pointer"
        fontWeight="bold"
        fontSize="20px"
        textAlign="center"
      >
        TeeRex Store
      </Text>
      <Flex direction="row" alignItems="center" gap="7">
        <Box
          display={{ base: "none", lg: "block" }}
          _hover={{
            textDecor: "none",
            borderBottom: "2px solid black",
          }}
        >
          <Button
            onClick={() => navigate("/")}
            bg="none"
            _hover={{ bg: "lightgray" }}
            border="none"
            padding="5px"
          >
            Products
          </Button>
        </Box>
        <Stack direction="row" bg="blackAlpha.300" borderRadius="5px">
          <Box onClick={() => navigate("/cart")} py="1" pl="2" pr="3">
            <Icon as={BsCart3} boxSize="8" mt="7px" />
            <Text
              as="span"
              mt="-2px"
              fontWeight="bold"
              textAlign="start"
              position="absolute"
            >
              {cartCount}
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Navbar;
