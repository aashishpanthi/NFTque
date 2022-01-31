import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import swal from "@sweetalert/with-react";
import ReactLoading from "react-loading";
import { ethers } from "ethers";

const MyNFT = () => {
  const { id: productId } = useParams();
  const { address, provider } = useWeb3();
  const [price, setPrice] = useState("");
  const [Nft, setNft] = useState({});
  const [hasNFt, setHasNft] = useState(true);
  const [shouldList, setShouldList] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isListed, setIsListed] = useState(false);

  const sdk = new ThirdwebSDK(provider?.getSigner());

  const marketplaceAddress = process.env.REACT_APP_MARKETPLACE_ADDRESS;
  const marketplace = sdk.getMarketplaceModule(marketplaceAddress);
  const nftCollectionAddress = process.env.REACT_APP_NFT_SMART_CONTRACT_ADDRESS;

  const getNFT = async () => {
    const module = sdk.getNFTModule(nftCollectionAddress);

    try {
      const nfts = await module.getOwned(address);

      if (nfts.length === 0) {
        setHasNft(false);
      } else {
        
        const allitems = await marketplace.getAllListings();
        const nft = nfts.find((nft) => nft.id === productId);
        setNft(nft);

        const NFTIMAGE =  nft.image.split("ipfs/")[1];

        allitems.forEach((item) => {
          const ITEMIMAGE =  item.asset.image.split("ipfs://")[1];
          if (NFTIMAGE === ITEMIMAGE) {
            setIsListed(true);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getNFT();
  }, [address]);

  const listNFT = async (e) => {
    e.preventDefault();

    const createAuctionListing = async () => {
      const listing = {
        assetContractAddress: nftCollectionAddress,
        tokenId: productId.toString(),
        startTimeInSeconds: 0,
        listingDurationInSeconds: 86400,
        quantity: 1,
        currencyContractAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        buyoutPricePerToken: ethers.utils.parseEther(price),
      };

      setIsSubmitted(true);
      try {
        await marketplace.createDirectListing(listing);

        swal(
          "Process completed!",
          "Your NFT is listed in marketplace!",
          "success"
        );
        setIsSubmitted(false);
      } catch (error) {
        swal("Process failed!", error.message, "error");
        setIsSubmitted(false);
      }
    };

    createAuctionListing();
  };

  if (!address) {
    return <div>Connect your wallet first</div>;
  }

  if (!hasNFt) {
    return (
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900">
              You don't have any NFTs
            </h2>
            <Link to="/mint" className="text-blue-400">
              Mint now
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
        {Object.keys(Nft).length === 0 ? (
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

            <div className="px-4 py-5 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 grid-cols-1 items-center">
              <div className="my-5 aspect-w-1 aspect-h-1 sm:max-h-40 min-h-20 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                <img
                  src={Nft.image}
                  alt={Nft.name}
                  className="min-h-full object-center object-cover"
                />
              </div>

              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {Nft.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {Nft.description}
                    </dd>
                  </div>
                  {Nft?.properties && (
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Properties
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {JSON.stringify(Nft.properties)}
                      </dd>
                    </div>
                  )}

                  <fieldset disabled={isSubmitted ? "disabled" : ""}>
                    {shouldList ? (
                      <form onSubmit={listNFT}>
                        <div className="bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 justify-between">
                            <label
                              htmlFor="price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Price in ETH:
                            </label>
                            <input
                              onChange={(e) => setPrice(e.target.value)}
                              value={price}
                              id="price"
                              type="number"
                              placeholder="min 0"
                              min={0}
                              step="any"
                              required="true"
                              className="mt-1 h-10 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </dt>
                        </div>
                        <div className="bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500 flex justify-between">
                            <button
                              onClick={() => setShouldList(false)}
                              type="button"
                              className="w-2/5 text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:ring-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="w-2/4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Confirm
                            </button>
                          </dt>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-gray-50 px-4 py-5 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          <button
                            onClick={() => setShouldList(true)}
                            disabled={isListed ? "disabled" : ""}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            List in marketplace
                          </button>
                          {isListed ? (
                            <span className="text-red-500">
                              This NFT is already listed in the marketplace.
                            </span>
                          ) : ""}
                        </dt>
                      </div>
                    )}
                  </fieldset>
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

export default MyNFT;
