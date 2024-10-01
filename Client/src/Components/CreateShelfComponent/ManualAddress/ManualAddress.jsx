// import React, { useState } from "react";
// import AddressInput from "../AddressInput/AddressInput"; 
// const ManualAddress = ({ formData, handleChange, handleLocationManual }) => {
//   const [addressVisible, setAddressVisible] = useState(false);

//   const toggleAddressVisibility = () => {
//     setAddressVisible(!addressVisible);
//   };

//   return (
//     <div className="mt-4">
//       <button
//         type="button"
//         onClick={toggleAddressVisibility}
//         className="py-2 px-4 ml-2 bg-cyan-700 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//       >
//         {addressVisible ? "Hide Map" : "Add Bookshelf"}
//       </button>
//       {addressVisible && (
//         <div className="mt-4">
//           <AddressInput
//             formData={formData}
//             handleChange={handleChange}
//             handleLocationChange={handleLocationManual}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManualAddress;
