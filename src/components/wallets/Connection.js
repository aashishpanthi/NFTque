import { useWeb3 } from "@3rdweb/hooks";

const Connection = () => {
  const { address, connectWallet, disconnectWallet } = useWeb3();

  // If a wallet is connected, show disconnect and switch network options
  if (address) {
    return (
      <button
        onClick={disconnectWallet}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Connected {address.substring(0, 5)}...{address.substring(address.length-4)}
      </button>
    );
  }

  // If no wallet is connected, show connect wallet options
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
