// Importing libraries
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { useState } from "react";
window.Buffer = window.Buffer || require("buffer").Buffer;

const MintNFT = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageName, setImageName] = useState("");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImageName(file.name);
    setImage(file);
    // const reader = new FileReader();
    // reader.readAsArrayBuffer(file);
    // reader.onloadend = () => {
    //   setImage(Buffer(reader.result));
    // };
  };

  const { address, provider } = useWeb3();

  const mint = async () => {
    const sdk = new ThirdwebSDK(provider?.getSigner());
    const module = sdk.getNFTModule(
      process.env.REACT_APP_NFT_SMART_CONTRACT_ADDRESS
    );

    try {
      await module.mint({
        name,
        description,
        image,
        properties: {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name, description, image);
    await mint();
  };

  if (!address) {
    return <div>Connect your wallet first</div>;
  }

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6 px-5 my-10">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-5">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Mint NFT
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={handleSubmit}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="col-span-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="px-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="This is a ...."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description of your NFT.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Upload your NFT
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <span>
                              {image === null ? "Upload" : "Change"} file
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              onChange={handleImage}
                              type="file"
                              className="sr-only"
                            />
                            <p className="pl-1 text-red-300">
                              {" "}
                              {imageName ? imageName : "No file choosen"}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* <div className="col-span-6">
                    <label
                      htmlFor="properties"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Properties
                    </label>
                    <input
                      type="text"
                      name="properties"
                      id="properties"
                      autoComplete="properties"
                      onChange={(e) => setProperties(e.target.value)}
                      value={properties.value}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div> */}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MintNFT;
