// src/components/ProductInfo.jsx
import { useState } from "react";

function ProductInfo({ name, price, details }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <h3>{name}</h3>
      <p>Price: ${price}</p>

      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && <p>{details}</p>}
    </div>
  );
}

export default ProductInfo;
