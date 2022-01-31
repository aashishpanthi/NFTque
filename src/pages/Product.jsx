import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useWeb3 } from "@3rdweb/hooks";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import swal from "@sweetalert/with-react";
import ReactLoading from "react-loading";

const Product = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState({});
  const [isBuying, setIsBuying] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { provider, address } = useWeb3();

  const buyNFT = async() => {
    const sdk = new ThirdwebSDK(provider?.getSigner());
    const module = sdk.getMarketplaceModule(
      process.env.REACT_APP_MARKETPLACE_ADDRESS
    );

    const listingId = product.id;
    const quantityDesired = 1;

    setIsSubmitted(true);
      try {
        await module.buyoutDirectListing({ listingId, quantityDesired });

        swal(
          "Process completed!",
          "Now you own this NFT!",
          "success"
        );
        setIsSubmitted(false);
      } catch (error) {
        swal("Process failed!", error.message, "error");
        setIsSubmitted(false);
      }
  };

  const getItem = async () => {
    const sdk = new ThirdwebSDK(provider);
    const module = sdk.getMarketplaceModule(
      process.env.REACT_APP_MARKETPLACE_ADDRESS
    );

    try {
      const allitems = await module.getAllListings();
      setProduct(allitems.find((item) => item.id === productId));
      console.log(allitems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItem();
  }, []);


  return (
    <>
    {isSubmitted && (
        <ReactLoading
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          type="spin"
          color="#00BFFF"
          height={window.innerHeight / 4}
          width={window.innerWidth / 4}
        />
      )}
      <div className="bg-white">
        {Object.keys(product).length === 0 ? (
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
                  src={`https://cloudflare-ipfs.com/ipfs${product.asset.image.substring(
                    6,
                    product.asset.image.length
                  )}`}
                  alt={product.asset.name}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>

              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {product.asset.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Seller address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {product.sellerAddress}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Currency
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {product.buyoutCurrencyValuePerToken.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Price</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 flex">
                      {product.buyoutCurrencyValuePerToken.displayValue}
                      {product.buyoutCurrencyValuePerToken.name === "Ether" ? (
                        <svg
                          className="w-5 h-5 fill-black"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.963 11.98l-4.91-2.9 4.91 6.92 4.913-6.92-4.914 2.9zM8.037 0l-4.91 8.148 4.91 2.903 4.91-2.9-4.91-8.151z"></path>
                        </svg>
                      ) : (
                        product.buyoutCurrencyValuePerToken.name
                      )}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {product.asset.description}
                    </dd>
                  </div>
                  {isBuying ? (
                    <>
                      <div className="bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500 flex justify-between">
                          <button
                            onClick={() => setIsBuying(false)}
                            type="button"
                            className="w-2/5 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={buyNFT}
                            className="w-2/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Confirm
                          </button>
                        </dt>
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        {product.sellerAddress === address ? (
                          "You own this NFT"
                        ) : (
                          <button
                            onClick={() => setIsBuying(true)}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Buy now
                          </button>
                        )}
                      </dt>
                    </div>
                  )}
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
