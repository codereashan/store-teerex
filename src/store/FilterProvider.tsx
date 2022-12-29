import { useReducer } from "react";
import FilterContext from "./filter-context";

const initialFilterState = {
  color: [] as any,
  gender: [] as any,
  price: [] as any,
  type: [] as any,
};

const filterReducer = (state: any, action: any): any => {
  if (action.type === "COLOR") {
    return {
      ...state,
      color: action.checked
        ? [...state.color, action.value]
        : state.color.length > 0
        ? state.color.filter((item: any) => item !== action.value)
        : [],
    };
  }
  if (action.type === "GENDER") {
    return {
      ...state,
      gender: action.checked
        ? [...state.gender, action.value]
        : state.gender.length > 0
        ? state.gender.filter((item: any) => item !== action.value)
        : [],
    };
  }
  if (action.type === "PRICE") {
    return {
      ...state,
      price: action.checked
        ? [...state.price, action.value]
        : state.price.length > 0
        ? state.price.filter((item: any) => item !== action.value)
        : [],
    };
  }
  if (action.type === "TYPE") {
    return {
      ...state,
      type: action.checked
        ? [...state.type, action.value]
        : state.type.length > 0
        ? state.type.filter((item: any) => item !== action.value)
        : [],
    };
  }
  return initialFilterState;
};

const FilterProvider = ({ children }: any) => {
  const [filterState, dispatchAction] = useReducer(
    filterReducer,
    initialFilterState
  );

  const colorFilterHandler = (value: string, checked: boolean) => {
    dispatchAction({ type: "COLOR", value: value, checked: checked });
  };
  const genderFilterHandler = (value: string, checked: boolean) => {
    dispatchAction({ type: "GENDER", value: value, checked: checked });
  };
  const priceFilterHandler = (value: string, checked: boolean) => {
    dispatchAction({ type: "PRICE", value: value, checked: checked });
  };
  const typeFilterHandler = (value: string, checked: boolean) => {
    dispatchAction({ type: "TYPE", value: value, checked: checked });
  };

  const filterContext = {
    color: filterState.color,
    gender: filterState.gender,
    price: filterState.price,
    type: filterState.type,
    colorFilter: colorFilterHandler,
    genderFilter: genderFilterHandler,
    priceFilter: priceFilterHandler,
    typeFilter: typeFilterHandler,
  };

  return (
    <FilterContext.Provider value={filterContext}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
