import { LiaCartPlusSolid } from "react-icons/lia";
import { Button } from "../../common/Button";

 const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-gray-500 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price}
          </span>
          <Button
            className="flex items-center gap-2"
          >
            <LiaCartPlusSolid className="w-4 h-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
);
  export default ProductCard;