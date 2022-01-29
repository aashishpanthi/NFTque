import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { NFTModule, NFTMetadataOwner } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";

const Product = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const { provider } = useWeb3();

  const getItem = async () => {
    const sdk = new ThirdwebSDK(provider);
    const module = sdk.getMarketplaceModule(
      process.env.REACT_APP_MARKETPLACE_ADDRESS
    );

    try {
      const item = await module.getDirectListing(productId);
      setProduct(item);
      console.log(item);
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
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
              {product?.asset.name}
            </h2>
            <span>{product?.asset.description}</span>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <div className="w-full min-h-90 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-100 lg:aspect-none">
              <img
                src={`https://cloudflare-ipfs.com/ipfs${product?.asset.image.substring(6,product.asset.image.length)}`}
                alt={product?.asset.name}
                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
