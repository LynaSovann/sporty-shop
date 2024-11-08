"use client";

import React, { useEffect, useMemo } from "react";
import Container from "../shared/Container";
import Card from "../shared/Card";
import {
  getAllProductsFn,
  useGetProductsQuery,
} from "@/services/product/productApi";
import ProductCard from "../shared/skeletonLoading/ProductCard";
import { toast } from "react-hot-toast";
import SoldOut from "../icons/SoldOut";
import { useQuery } from "@tanstack/react-query";

const NewArrivals = () => {
  // const {
  //   data: productsData,
  //   error: productsError,
  //   isLoading: productsLoading,
  // } = useGetProductsQuery();
  // const productString = JSON.stringify(productsData);
  // const products = []
  // console.log("product string = " , productString)
  // const products = useMemo(
  //   () => JSON?.parse(productString) || [],
  //   [productString]
  // );

  // useEffect(() => {
  //   if (productsError) {
  //     toast.error(productsError?.data?.description, {
  //       id: "new-arrivals",
  //     });
  //   }
  // }, [productsError]);

  const { data: fakeProducts, isLoading: fakeProductsLoading } = useQuery({
    queryKey: ["fakeProducts"],
    queryFn: getAllProductsFn,
  });

  console.log("data : " + fakeProducts);

  return (
    <Container>
      <section className="flex flex-col gap-y-10">
        <h1 className="text-4xl">Products</h1>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-x-6 gap-y-8">
          {fakeProductsLoading ? (
            <>
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index}>{index}</div>
                // <ProductCard key={index} />
              ))}
            </>
          ) : (
            <>
              {fakeProducts?.slice(0, 4)?.map((product, index) => (
                <Card key={index} index={index} product={product} />
              ))}
            </>
          )}
        </div>
        {!fakeProductsLoading && fakeProducts?.length === 0 && (
          <p className="text-sm">No products found</p>
        )}
      </section>
    </Container>
  );
};

export default NewArrivals;
