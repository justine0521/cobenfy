import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { FaCheck, FaXmark } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Checkout({ onClose }) {
  const [isYes, setIsYes] = useState(true);
  const [signatureConfirmed, setSignatureConfirmed] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const sigCanvasRef = useRef(null);
  const navigate = useNavigate();

  const clearSignature = () => {
    sigCanvasRef.current.clear();
    setSignatureConfirmed(false);
  };

  const confirmSignature = () => {
    if (!sigCanvasRef.current.isEmpty()) {
      setSignatureConfirmed(true);
    }
  };

  const handleSave = () => {
    Swal.fire({
      title: 'Saved!',
      text: 'The form has been successfully saved.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <section className="w-full max-w-[800px] max-h-screen overflow-y-auto bg-white rounded-xl shadow-md">
        <div className='flex items-center justify-between text-base sm:text-lg py-3 px-4 border-b-2 sticky top-0 bg-white z-10'>
          <p className="font-semibold">Sign Call Record</p>
          <button onClick={onClose}>
            <FaXmark />
          </button>
        </div>

        <div className='p-4 sm:p-5'>
          <div>
            <div className="text-base md:text-lg">
              <p className='font-semibold'>PAUL JEFFREY AANDERUD</p> 
              <span>,MD</span>
            </div>

            <div className='px-1 sm:px-2'>
              <div className="mt-2 mb-1 text-sm">
                <span className='font-semibold'>Address</span> : 15420 SW 257TH AVE, TROUTDALE, OR 97060
              </div>

              <div className="text-xs text-gray-500 flex flex-wrap gap-x-1">
                <span>License: DO1578380</span> | 
                <span>License Expiry: 2021-12-31</span> | 
                <span>NPI: 1234567890</span> | 
                <span>DEA No. ;</span> | 
                <span>DEA Expiry: ;</span>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-4 border border-black">
            <div className="font-semibold mb-1 bg-secondary bg-opacity-50 p-2">DTP Request (1)</div>

            <div className='p-3 space-y-1'>
              <p className="font-medium text-sm sm:text-base">Ibuprofen Tablets, USP 600mg</p>
              <p className="text-xs text-gray-700">
                Product ID: 45156-7412-60 | Quantity: 2 Units | Manufacturer: | Distributor:
              </p>
            </div>
          </div>

          <div className="text-sm mb-2 flex items-start gap-2">
            <input
              type="checkbox"
              className='mt-1'
              checked={isCheckboxChecked}
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            />
            <p className="text-sm">
              I hereby certify that I have requested and received the listed Samples and Quantities and all state information pertaining to my license is valid and accurate.
            </p>
          </div>

          <div className="mb-2 flex flex-col md:flex-row w-full items-start md:items-center gap-3">
            <div className="flex-1 w-full">
              <div className="font-medium mb-1 text-sm">
                Signature<span className="text-red-500">*</span>
              </div>

              <div className="border-[1.5px] border-gray-400 rounded-md h-28 bg-gray-50 mb-2 overflow-hidden">
                <SignatureCanvas
                  ref={sigCanvasRef}
                  penColor="black"
                  canvasProps={{ width: 700, height: 110, className: "signature-canvas w-full h-full" }}
                  backgroundColor="#f9fafb"
                />
              </div>

              {signatureConfirmed && (
                <p className="text-green-600 text-sm">Signature confirmed.</p>
              )}
            </div>

            <div className="flex md:flex-col gap-2 self-center md:self-auto">
              <button type="button" onClick={confirmSignature}>
                <FaCheck className="bg-green-500 rounded-full h-6 w-6 text-white p-1" />
              </button>
              <button type="button" onClick={clearSignature}>
                <FaXmark className="bg-red-500 rounded-full h-6 w-6 text-white p-1" />
              </button>
            </div>
          </div>

          <div className="mb-4 space-y-3">
            <div className="text-xs text-gray-500">Date: 2023-06-07</div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
              <label htmlFor="receipt-toggle" className="font-semibold">Request Receipt?</label>
              <div
                className="relative w-20 h-9 bg-gray-200 rounded-full cursor-pointer transition-colors duration-300"
                onClick={() => setIsYes(!isYes)}
              >
                <div
                  className={`absolute top-1 left-1 w-8 h-7 rounded-full bg-black transition-all duration-300 ease-in-out ${
                    isYes ? 'translate-x-0' : 'translate-x-[44px]'
                  }`}
                ></div>

                <div className="absolute inset-0 flex items-center justify-between px-2 text-sm font-medium">
                  <span className={`${isYes ? 'text-white' : 'text-gray-600'} transition duration-300`}>Yes</span>
                  <span className={`${!isYes ? 'text-white' : 'text-gray-600'} transition duration-300`}>No</span>
                </div>
              </div>
            </div>
          </div>

          <button
            className={`w-full py-3 rounded-md font-semibold text-lg transition duration-200 ${
              signatureConfirmed && isCheckboxChecked
                ? 'bg-black text-white cursor-pointer hover:bg-gray-900'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!(signatureConfirmed && isCheckboxChecked)}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
