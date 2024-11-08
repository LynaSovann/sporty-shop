/**
 * Title: Write a program using JavaScript on Card
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 15, October 2023
 */

"use client";

import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import Discount from "../icons/Discount";
import SoldOut from "../icons/SoldOut";
import Arrival from "../icons/Arrival";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useAddToFavoriteMutation,
  useRemoveFromFavoriteMutation,
} from "@/services/favorite/favoriteApi";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const Card = ({ index, product, ...rest }) => {
  const router = useRouter();

  return (
    <div
      {...rest}
      className="flex-shrink-0 flex flex-col gap-y-6 group border hover:border-black transition-colors rounded-lg"
    >
      <div className="relative h-[200px] w-full rounded-lg">
        <Image
          src={product?.image}
          alt={product?.title}
          width={296}
          height={200}
          className="h-[200px] w-full rounded-t-lg object-cover"
        />
        <div className="flex flex-row gap-x-2.5 absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Logo src={product?.image} alt={product?.title} />
          <Logo src={product?.image} alt={product?.title} />
        </div>
      </div>
      
      <article className="flex flex-col gap-y-3.5 px-4 h-full">
        {/* <div className="flex flex-row items-center gap-x-1.5">
          <Badge className="text-indigo-800 bg-indigo-100">
            {product?.variations?.colors?.length + " " + "Colors"}
          </Badge>
          <div className="h-5 border-l w-[1px]"></div>
          <Badge className="text-purple-800 bg-purple-100">
            {product?.variations?.sizes?.length + " " + "Sizes"}
          </Badge>
        </div> */}
        <div
          className="flex flex-col gap-y-4 cursor-pointer h-full"
          // onClick={() =>
          //   router.push(
          //     `/product?product_id=${
          //       product?._id
          //     }&product_title=${product?.title
          //       .replace(/ /g, "-")
          //       .toLowerCase()}}`
          //   )
          // }
        >
          <h2 className="line-clamp-2 h-full">{product?.title}</h2>
          <div className="flex flex-row items-end justify-between mt-auto">
            <span className="flex items-center border-2 border-green-500 rounded py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
              <span className="text-green-500 !leading-none">
                ${product?.price}
              </span>
            </span>
            <span className="flex flex-row items-center gap-x-0.5">
              <AiFillStar className="text-[#ffc242]" />
              <span className="text-sm">{Math.round(product?.rating?.rate)}</span>
            </span>
          </div>


        </div>
      </article>

      <div></div>
    </div>
  );
};

function Badge({ props, children, className }) {
  return (
    <span
      className={
        "px-3 py-1 rounded text-xs w-fit" + (className ? " " + className : "")
      }
      {...props}
    >
      {children}
    </span>
  );
}

function Logo({ src, alt, props, className }) {
  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={30}
      height={30}
      className={
        "w-[30px] h-[30px] object-cover rounded-[5px] shadow border border-transparent hover:border-black transition-colors cursor-help" +
        (className ? " " + className : "")
      }
    />
  );
}

function AddToFavorite({ product }) {
  const user = useSelector((state) => state?.auth?.user);
  const [addToFavorite, { isLoading, data, error }] =
    useAddToFavoriteMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding to favorite...", { id: "addToFavorite" });
    }

    if (data) {
      toast.success(data?.description, { id: "addToFavorite" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addToFavorite" });
    }
  }, [isLoading, data, error]);

  return (
    <button
      className="border border-transparent bg-white hover:border-black shadow p-1 absolute bottom-4 left-4 rounded-secondary opacity-0 group-hover:opacity-100 transition-all"
      onClick={() => addToFavorite({ product: product?._id })}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <MdFavorite className={`w-5 h-5 text-black`} />
      )}
    </button>
  );
}

function RemoveFromFavorite({ favorite }) {
  const user = useSelector((state) => state?.auth?.user);
  const [removeFromFavorite, { isLoading, data, error }] =
    useRemoveFromFavoriteMutation();

  useEffect(() => {
    if (isLoading) {
      toast.loading("Adding to favorite...", { id: "addToFavorite" });
    }

    if (data) {
      toast.success(data?.description, { id: "addToFavorite" });
    }

    if (error?.data) {
      toast.error(error?.data?.description, { id: "addToFavorite" });
    }
  }, [isLoading, data, error]);

  return (
    <button
      className="border border-transparent bg-white hover:border-black shadow p-1 absolute bottom-4 left-4 rounded-secondary opacity-0 group-hover:opacity-100 transition-all"
      onClick={() => removeFromFavorite({ id: favorite?._id })}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <MdFavorite className={`w-5 h-5 text-red-500`} />
      )}
    </button>
  );
}

export default Card;
