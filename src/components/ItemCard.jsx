import { Link } from "react-router-dom";

const ItemCard = ({ product }) => {

  const { name, description, image } = product.asset;
  const {id} = product;
  const {displayValue} = product.buyoutCurrencyValuePerToken;

  const src = `https://cloudflare-ipfs.com/ipfs${image.substring(6, image.length)}`;

  return (
    <div className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <img
          src={src}
          alt={name}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link to={`/product/${id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {description.substring(0, 33)}...
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          <svg
            className="w-5 h-5 fill-black"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
          >
            <path d="M7.963 11.98l-4.91-2.9 4.91 6.92 4.913-6.92-4.914 2.9zM8.037 0l-4.91 8.148 4.91 2.903 4.91-2.9-4.91-8.151z"></path>
          </svg>
          {displayValue}
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
