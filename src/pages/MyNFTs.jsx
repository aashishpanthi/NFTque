import { useWeb3 } from "@3rdweb/hooks";
import { useEffect, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";

const MyNFTs = () => {
  const { address, provider } = useWeb3();
  const [allNfts, setAllNfts] = useState([]);

  const getNFTs = async () => {
    const sdk = new ThirdwebSDK(provider?.getSigner());
    const module = sdk.getNFTModule(
      process.env.REACT_APP_NFT_SMART_CONTRACT_ADDRESS
    );
    const nfts = await module.getOwned(address);
    console.log(nfts);
    setAllNfts(nfts)
  };

  useEffect(() => {
    getNFTs();
  }, []);

  if (!address) {
    return <div>Connect your wallet first</div>;
  }

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">
            All your NFTs
          </h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {allNfts.map((nft) => (
              <div key={`${nft.name}${nft.id}`} className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                    <span className="absolute inset-0" />
                    {nft.name}
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {nft.description}
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {(nft.properties.price)&&(`Price: ${nft.properties.price}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyNFTs;
