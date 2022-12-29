import * as React from "react";

const FilterContext = React.createContext({
  color: [] as any,
  gender: [] as any,
  price: [] as any,
  type: [] as any,
  colorFilter: (value: string, check: boolean) => {},
  genderFilter: (value: string, check: boolean) => {},
  priceFilter: (value: string, check: boolean) => {},
  typeFilter: (value: string, check: boolean) => {},
});

export default FilterContext;
