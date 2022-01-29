import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { NFTModule, NFTMetadataOwner } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const Product = () => {
  const { id: productId } = useParams();
  const [products, setProducts] = useState([]);
  const { provider } = useWeb3();

  const getItem = async () => {
    const sdk = new ThirdwebSDK(provider);
    const module = sdk.getMarketplaceModule(
      process.env.REACT_APP_MARKETPLACE_ADDRESS
    );

    try {
      const allitems = await module.getAllListings();
      setProducts(allitems);
    } catch (error) {
      console.log(error);
    }
  };

  // const { displayValue } = product.buyoutCurrencyValuePerToken;

  useEffect(() => {
    getItem();
  }, []);
  return (
    <>
      <div className="bg-white">
        {products.length == 0 ? (
          <Loader />
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                NFT Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Listed in a marketplace.
              </p>
            </div>

            <div className="px-4 py-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-4 grid-cols-1">
              <div className="w-full my-5 min-h-90 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-100 lg:aspect-none">
                <img
                  src={`https://cloudflare-ipfs.com/ipfs${products[
                    productId
                  ].asset.image.substring(
                    6,
                    products[productId].asset.image.length
                  )}`}
                  alt={products[productId].asset.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>

              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {products[productId].asset.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Seller address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {products[productId].sellerAddress}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Currency{" "}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {products[productId].buyoutCurrencyValuePerToken.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Price{" "}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {
                        products[productId].buyoutCurrencyValuePerToken
                          .displayValue
                      }{" "}
                      {products[productId].buyoutCurrencyValuePerToken.name}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {products[productId].asset.description}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Product;
