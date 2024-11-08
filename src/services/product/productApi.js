import { BASE_URL } from "@/constants/app-baseUrl";

const { canimApi } = require("../canim");

const productApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new product
    addProduct: builder.mutation({
      query: (body) => ({
        url: "/product/add-product",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Product", "Brand", "Category", "Store", "User"],
    }),

    // get all products
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

    // update product
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/product/update-product/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Product", "Brand", "Category", "Store", "User"],
    }),

    // get a single product
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/get-product/${id}`,
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

    // filtered products
    getFilteredProducts: builder.mutation({
      query: (query) => ({
        url: `/product/filtered-products?${query}`,
        method: "GET",
      }),

      providesTags: ["Product"],
    }),

    // delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Product", "Brand", "Category", "Store", "User"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useGetProductQuery,
  useGetFilteredProductsMutation,
  useDeleteProductMutation,
} = productApi;

export const getAllProductsFn = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const products = await res.json();

     products.forEach((product, index) => {
      console.log(`Product ${index + 1}:`, product);
    });
    return products;
  } catch (err) {
    console.log("err : ", err);
  }
};
