import { useState, useEffect, useContext } from "react";
import {
  Flex,
  Spinner,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import Products from "./Products";
import Searchbar from "./Searchbar";
import Filters from "./Filters";
import { productData } from "../utils/productData";
import FilterContext from "../store/filter-context";
import {
  getProductsByColor,
  getProductsByGender,
  getProductsByPrice,
  getProductsByType,
} from "../utils/productFilterHandlers";

const ProductListing = () => {
  const toast = useToast();
  const [data, setData] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { color, gender, price, type } = useContext(FilterContext);

  const isMobileView = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url: string =
          "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        toast({
          title: "error while loading the products",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      }
    };
    getProducts();
  }, [toast]);

  const searchHandler = (value: any, productData: any) => {
    if (value.length > 0) {
      let valueArr = value.toLowerCase().split(" ");
      // eslint-disable-next-line
      let searchedProducts: any[] = productData.filter((item: any) => {
        if (
          valueArr.includes(item.color.toLowerCase()) &&
          valueArr.includes(item.type.toLowerCase())
        ) {
          return item;
        } else if (
          (item.name || item.color || item.type)
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          return item;
        }
      });
      return searchedProducts;
    } else {
      return productData;
    }
  };

  const handleSearchClick = (value: string) => {
    setSearchTerm(value);
  };

  const filteredColorItems: any = getProductsByColor(data, color);
  const filteredGenderItems: any = getProductsByGender(
    filteredColorItems,
    gender
  );
  const filteredPriceItems: any = getProductsByPrice(
    filteredGenderItems,
    price
  );
  const filteredTypeItems: any = getProductsByType(filteredPriceItems, type);

  const filteredSearchedData: any = searchHandler(
    searchTerm,
    filteredTypeItems
  );

  return (
    <Stack direction="row" gap="16">
      {!isMobileView && <Filters />}
      <Flex
        w="100%"
        my="8"
        px="4"
        gap="12"
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Searchbar searchedTermHandler={handleSearchClick} />
        {isLoading ? (
          <Spinner
            mt="12"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Flex
            direction="row"
            flexWrap="wrap"
            gap={{ base: "40px", lg: "70px" }}
            justifyContent="start"
          >
            {filteredSearchedData.length > 0 ? (
              filteredSearchedData?.map((data: productData, index: any) => (
                <Products key={index} product={data} />
              ))
            ) : (
              <Text fontWeight="bold" mt="32" fontSize="26px">
                No products found.
              </Text>
            )}
          </Flex>
        )}
      </Flex>
    </Stack>
  );
};

export default ProductListing;
