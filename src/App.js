//App.js
import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
// import productData from "./data/productData.json";
import ProductChart from "./ProductChart";

// function App() {
//   return (
//     <div>
//       <h1>Product Chart</h1>
//       <ProductChart productData={productData} />
//     </div>
//   );
// }

// function App() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [jsonData, setJsonData] = useState(null);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/search?q=${searchTerm}`
//       );
//       const data = await response.json();
//       setJsonData(data);
//     } catch (error) {
//       console.error("Error searching products:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Price Tracker</h1>
//       {/* Render the search box */}
//       <div>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Enter search term..."
//         />
//         <button onClick={handleSearch}>Search</button>
//       </div>
//       {/* Render ProductChart component with JSON data */}
//       {jsonData && <ProductChart productData={jsonData} />}
//     </div>
//   );
// }

// function App() {
//   const [jsonData, setJsonData] = useState(null);

//   const handleSearch = (data) => {
//     setJsonData(data);
//   };

//   return (
//     <div>
//       <h1>Price Tracker</h1>
//       <SearchForm onSearch={handleSearch} />
//       {jsonData && <ProductChart productData={jsonData} />}
//     </div>
//   );
// }

function App() {
  const [jsonData, setJsonData] = useState(null);

  const handleSearch = (data) => {
    setJsonData(data);
  };

  return (
    <div>
      <h1>Price Tracker</h1>
      <SearchForm onSearch={handleSearch} />
      {jsonData &&
        jsonData.map((product, index) => (
          //productData must be a list of 1 dict, and it must contains exactly 1 dict
          //Sorry, this is core error
          <ProductChart key={index} productData={[product]} />
        ))}
    </div>
  );
}

export default App;
