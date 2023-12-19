// import React, { useReducer } from "react";
// import { usePaystackPayment } from "react-paystack";

// type PayStackConfig = {
//   name: string;
//   currency: Currency;
//   email: string;
//   publicKey: string;
//   amount: number;
// };

// type Currency = 'NGN' | 'GHS' | 'USD' | 'ZAR' | 'KES' | 'XOF';

// const initialConfig: PayStackConfig = {
//   name: "",
//   email: "",
//   amount: 0,
//   publicKey: "pk_live_22679f1e061872cbbad0f9f3592a3630dce6ff45",
//   currency: "GHS"
// };

// export type callback = (response?: any) => void;

// type Action =
//   | { type: "UPDATE_FIELD"; fieldName: string; value: string }
//   | { type: "RESET_CONFIG" };

// function configReducer(state: PayStackConfig, action: Action): PayStackConfig {
//   switch (action.type) {
//     case "UPDATE_FIELD":
//       return { ...state, [action.fieldName]: action.value };
//     case "RESET_CONFIG":
//       return initialConfig;
//     default:
//       return state;
//   }
// }

// export default function Paystack() {
//   const [config, dispatch] = useReducer(configReducer, initialConfig);

//   const initializePayment = usePaystackPayment(config);

//   const onSuccess = (e:any) => {
//     console.log("Succes data",e)
//     alert("Payment Successful, check your email for confirmation");
//   };

//   const onClose = () => {
//     alert("Oops, Payment not completed");
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     dispatch({ type: "UPDATE_FIELD", fieldName: name, value });
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     initializePayment(onSuccess, onClose);
//   };

//   const handleCancel = () => {
//     dispatch({ type: "RESET_CONFIG" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
//           <div className="max-w-md mx-auto">
//             <div className="flex items-center space-x-5">
//               <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
//               <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
//                 <h2 className="leading-relaxed">Make A Payment</h2>
//               </div>
//             </div>
//             <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
//               <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
//                 <div className="flex flex-col">
//                   <label className="leading-loose">Full Name</label>
//                   <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//                     placeholder="Enter Name"
//                     required
//                     value={config.name}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="leading-loose">Event Subtitle</label>
//                   <input
//                     type="email"
//                     className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//                     placeholder="Enter Email"
//                     name="email"
//                     required
//                     value={config.email}
//                     onChange={handleChange}
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <label className="leading-loose">Enter Amount</label>
//                   <input
//                     type="number"
//                     className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
//                     placeholder="Enter amount"
//                     name="amount"
//                     required
//                     value={config.amount}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
//               <div className="pt-4 flex items-center space-x-4">
//                 <button
//                   className="flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none"
//                   type="button"
//                   onClick={handleCancel}
//                 >
//                   <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> Cancel
//                 </button>
//                 <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none" type="submit">Create</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from 'react'

export default function paystack() {
  return (
    <div>paystack</div>
  )
}










