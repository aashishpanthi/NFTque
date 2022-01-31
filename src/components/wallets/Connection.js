import { useWeb3 } from "@3rdweb/hooks";

const Connection = () => {
  const { address, connectWallet } = useWeb3();

  if (address) {
    return (
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Connected {address.substring(0, 5)}...{address.substring(address.length-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => connectWallet("injected")}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Connect MetaMask
    </button>
  );
};

export default Connection;
