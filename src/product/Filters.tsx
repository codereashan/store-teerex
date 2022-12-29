import { Flex, VStack, Text, CheckboxGroup, Checkbox } from "@chakra-ui/react";
import { useContext } from "react";
import { filters } from "../utils/filters";
import FilterContext from "../store/filter-context";

const Filters = () => {
  const filterContext = useContext(FilterContext);

  const handleColorFilters = (e: any, value: string) => {
    let checked = e.target.checked;
    filterContext.colorFilter(value, checked);
  };

  const handleGenderFilters = (e: any, value: string) => {
    let checked = e.target.checked;
    filterContext.genderFilter(value, checked);
  };

  const handlePriceFilters = (e: any, value: string) => {
    let checked = e.target.checked;
    filterContext.priceFilter(value, checked);
  };

  const handleTypeFilters = (e: any, value: string) => {
    let checked = e.target.checked;
    filterContext.typeFilter(value, checked);
  };

  return (
    <Flex
      ml={{ lg: "8" }}
      mt={{ base: "0", lg: "138px" }}
      mb="8"
      w={{ base: "100%", lg: "30%" }}
      h="100%"
      px="8"
      py="4"
      boxShadow="2px 2px 8px 2px lightgray"
      direction="column"
      alignItems="flex-start"
      gap="6"
    >
      <VStack alignItems="flex-start">
        <Text fontWeight="bold" fontSize="20px">
          Color
        </Text>
        <CheckboxGroup>
          <Flex direction="column" ml="10" gap="1">
            {filters["Color"].map((color: any, key: any) => (
              <Checkbox
                key={key}
                size="lg"
                value={color.value}
                onChange={(e: any) => handleColorFilters(e, color.value)}
              >
                {color.value}
              </Checkbox>
            ))}
          </Flex>
        </CheckboxGroup>
        <Text fontWeight="bold" fontSize="20px" pt={{ base: "4", lg: "2" }}>
          Gender
        </Text>
        <CheckboxGroup>
          <Flex direction="column" ml="10" gap="1">
            {filters["Gender"].map((gender: any, key: any) => (
              <Checkbox
                key={key}
                size="lg"
                value={gender.value}
                onChange={(e: any) => handleGenderFilters(e, gender.value)}
              >
                {gender.value}
              </Checkbox>
            ))}
          </Flex>
        </CheckboxGroup>
        <Text fontWeight="bold" fontSize="20px" pt={{ base: "4", lg: "2" }}>
          Price
        </Text>
        <CheckboxGroup>
          <Flex direction="column" ml="10" gap="1">
            {filters["Price"].map((price: any, key: any) => (
              <Checkbox
                key={key}
                size="lg"
                value={price.value}
                onChange={(e: any) => handlePriceFilters(e, price.value)}
              >
                {price.value}
              </Checkbox>
            ))}
          </Flex>
        </CheckboxGroup>
        <Text fontWeight="bold" fontSize="20px" pt={{ base: "4", lg: "2" }}>
          Type
        </Text>
        <CheckboxGroup>
          <Flex direction="column" ml="10" gap="1">
            {filters["Type"].map((type: any, key: any) => (
              <Checkbox
                key={key}
                size="lg"
                value={type.value}
                onChange={(e: any) => handleTypeFilters(e, type.value)}
              >
                {type.value}
              </Checkbox>
            ))}
          </Flex>
        </CheckboxGroup>
      </VStack>
    </Flex>
  );
};

export default Filters;
