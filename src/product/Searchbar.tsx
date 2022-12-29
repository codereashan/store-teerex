import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Input,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiFilter } from "react-icons/fi";
import Filters from "./Filters";

const Searchbar = (props: any) => {
  const [searchedValue, setSearchedValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack mt="10" w={{ base: "100%", lg: "50%" }}>
      <Input
        variant="flushed"
        size="lg"
        value={searchedValue}
        placeholder="Search for products ..."
        onChange={(e: any) => setSearchedValue(e.target.value)}
      />
      <Box bg="blackAlpha.500" w={12} h={10} p={2} borderRadius="5px">
        <SearchIcon
          boxSize="6"
          color="white"
          cursor="pointer"
          onClick={() => props.searchedTermHandler(searchedValue)}
        />
      </Box>
      <Box
        display={{ lg: "none" }}
        bg="blackAlpha.500"
        w={12}
        h={10}
        p={2}
        borderRadius="5px"
      >
        <Icon
          as={FiFilter}
          color="white"
          boxSize="6"
          cursor="pointer"
          onClick={onOpen}
        />
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize="28">Filters</DrawerHeader>
            <DrawerBody>
              <Filters />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </HStack>
  );
};
export default Searchbar;
