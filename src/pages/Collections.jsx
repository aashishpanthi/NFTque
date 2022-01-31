import Footer from "../components/Footer";
import ItemCard from "../components/ItemCard";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

const Collections = () => {
  const [items, setItems] = useState([]);
  const { provider, address } = useWeb3();

  const getAll = async () => {
    const sdk = new ThirdwebSDK(provider);
    const module = sdk.getMarketplaceModule(
      process.env.REACT_APP_MARKETPLACE_ADDRESS
    );
    const allitems = await module.getAllListings();
    setItems(allitems.slice(0,5));
  };

  useEffect(() => {
    getAll();
  }, [address]);

  return (
    <>
      <div className="bg-white">
        {address ? (
          <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-4xl text-center font-extrabold tracking-tight text-gray-900">
              Find collection of digital arts
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {items.length === 0 ? (
                <Loader />
              ) : (
                items.map((product) => (
                  <ItemCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        ) : (
          <h1 className="my-40 text-center text-red-500">
            Connect your wallet to see the collections
          </h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Collections;
