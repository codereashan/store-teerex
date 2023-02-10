export const getProductsByColor = (products: any, color: any) =>
  products.filter((item: any) =>
    color.length > 0 ? color.includes(item.color) : products
  );

export const getProductsByGender = (products: any, gender: any) =>
  products.filter((item: any) =>
    gender.length > 0 ? gender.includes(item.gender) : products
  );

export const getProductsByPrice = (products: any, price: any) =>
  // eslint-disable-next-line
  products.filter((item: any) => {
    if (price.length > 0) {
      for (let option of price) {
        let lowPrice: string = option.split("-")[0].trim();
        let highPrice: string = option.split("-")[1].trim();
        if (item.price >= Number(lowPrice) && item.price <= Number(highPrice)) {
          return item;
        }
      }
    } else {
      return products;
    }
  });

export const getProductsByType = (products: any, type: any) =>
  products.filter((item: any) =>
    type.length > 0 ? type.includes(item.type) : products
  );
