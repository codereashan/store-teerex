import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Flex, Image, Text, Button, Input, Stack } from "@chakra-ui/react";

const CartItem = (props: any) => {
  const { image, name, price, quantity } = props.data;
  return (
    <Flex direction={{ base: "column", lg: "row" }} alignItems="center" gap="8">
      <Image
        src={image}
        w={{ base: "280px", lg: "150px" }}
        h={{ base: "220px", lg: "150px" }}
      />
      <Stack
        alignSelf="center"
        direction={{ base: "row", lg: "column" }}
        minW={{ lg: "20%" }}
      >
        <Text fontWeight="bold" mx="2">
          {name}
        </Text>
        <Text fontWeight="bold">Rs. {price}</Text>
      </Stack>
      <Stack alignItems="center" gap="2" direction={{ base: "row" }}>
        <MinusIcon cursor="pointer" onClick={props.onRemove} />
        <Input
          isDisabled
          w={{ base: "150px", lg: "90px" }}
          variant="filled"
          placeholder={`Qty: ${quantity}`}
        />
        <AddIcon cursor="pointer" onClick={props.onAdd} />
      </Stack>
      <Button
        w={{ base: "80%", lg: "100%" }}
        bg="none"
        px={{ lg: "12" }}
        ml={{ lg: "8" }}
        border="2px solid #333"
        onClick={props.onDelete}
      >
        Delete
      </Button>
    </Flex>
  );
};

export default CartItem;
