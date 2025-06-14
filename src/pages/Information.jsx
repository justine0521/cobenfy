import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { FaUser, FaMapMarkerAlt, FaEnvelope, FaIdCard, FaArrowLeft, FaUserMd} from "react-icons/fa";
import SignatureCanvas from 'react-signature-canvas';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCheck, FaXmark } from "react-icons/fa6";

function Information() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    npi: '',
    name: '',
    designation: '',
    address: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isYes, setIsYes] = useState(true);
  const [signatureConfirmed, setSignatureConfirmed] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const sigCanvasRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleProceedToSignature = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      if (field !== 'email' && !formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(2);
    }
  };

  const clearSignature = () => {
    sigCanvasRef.current.clear();
    setSignatureConfirmed(false);
  };

  const confirmSignature = () => {
    if (!sigCanvasRef.current.isEmpty()) {
      setSignatureConfirmed(true);
    }
  };

  const handleSubmit = () => {
    Swal.fire({
      title: 'Submitted!',
      text: 'The form has been successfully submitted!.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    }).then(() => {
      navigate('/');
    });
  };

  const handleBackToForm = () => {
    setCurrentStep(1);
  };

  return (
    <section className="min-h-screen" style={{backgroundColor: '#F5F5F5'}} >
      <div className="px-4 py-12">
        <div className="max-w-5xl mx-auto">
            <NavLink to="/products" className="inline-flex mb-5 items-center text-gray-600 hover:text-gray-900 font-medium text-sm transition-all font-montserrat">
                <FaArrowLeft className="mr-2" /> Back
            </NavLink>

            <div className="mb-12">
                <div className="flex items-center justify-center">
                    <div className="mb-8 flex items-center justify-between"></div>
                    <div className="flex items-center space-x-8">
                        <div className="flex flex-col items-center">
                          <div 
                              className={`md:w-16 md:h-16 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg font-Montserrat shadow-lg transition-all duration-300 ${currentStep === 1 ? 'shadow-lg scale-110' : 'shadow-md'}`} style={{backgroundColor: currentStep === 1 ? '#1F22A2' : '#8BB5FF'}}>
                              {currentStep > 1 ? <FaCheck className="text-xl" /> : '1'}
                          </div>

                          <span className="text-sm font-semibold font-Montserrat mt-3 text-gray-700">
                              Information
                          </span>
                        </div>

                        <div className="flex-1 h-1 rounded-full mx-4 transition-all duration-500 w-16 md:w-32" 
                            style={{backgroundColor: currentStep > 1 ? '#8BB5FF' : '#d1d5db'}}>
                        </div>

                        <div className="flex flex-col items-center">
                          <div className={`md:w-16 md:h-16 w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg font-Montserrat shadow-lg transition-all duration-300 ${currentStep === 2 ? 'shadow-lg scale-110' : 'shadow-md' }`} style={{backgroundColor: currentStep === 2 ? '#1F22A2' : '#d1d5db'}}>
                              2
                          </div>

                          <span className="text-sm font-semibold font-Montserrat mt-3 text-gray-700">
                              Signature
                          </span>
                        </div>
                    </div>
                </div>
            </div>

          {currentStep === 1 ? (
            <div className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
              <div className="md:p-8 p-4 text-center" style={{background: 'linear-gradient(135deg, #1F22A2 0%, #8BB5FF 100%)'}}>
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                    <FaUser className="text-3xl text-white" />
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-white font-Montserrat mb-2">
                  Practitioner Information
                </h2>

                <p className="text-white/90 text-lg font-Montserrat">
                  Please provide your professional credentials and contact details
                </p>
              </div>
              
              <div className="md:p-12 p-5">
                <form onSubmit={handleProceedToSignature} className="space-y-8">
                  <div className="space-y-3">
                      <label className="flex items-center text-sm font-bold font-Montserrat" style={{color: '#1F22A2'}}>
                        <FaIdCard className="mr-3 text-lg" style={{color: '#8BB5FF'}} />
                        NPI Number
                      </label>

                      <div className="relative">
                        <input type="text" value={formData.npi} onChange={(e) => handleInputChange('npi', e.target.value)} placeholder="Enter your NPI Number" className={`w-full pl-14 pr-4 py-5 rounded-2xl border-2 font-Montserrat text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${errors.npi  ? 'border-red-400 bg-red-50 shadow-red-100' : 'border-gray-200 focus:shadow-lg' }`} 
                        style={{ focusBorderColor: '#8BB5FF', boxShadow: errors.npi ? 'none' : '0 0 0 3px rgba(139, 181, 255, 0.1)'}} onFocus={(e) => { if (!errors.npi) {e.target.style.borderColor = '#8BB5FF'; e.target.style.boxShadow = '0 0 0 3px rgba(139, 181, 255, 0.1)'; }}} onBlur={(e) => { if (!errors.npi) { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none'; }}}/>
                        
                        <IoSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-xl" style={{color: '#8BB5FF'}} />
                      </div>

                      {errors.npi && (
                        <p className="text-red-500 text-sm font-Montserrat flex items-center">
                          <FaXmark className="mr-2" />
                          {errors.npi}
                        </p>
                      )}
                    </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="flex items-center text-sm font-bold font-Montserrat" style={{color: '#1F22A2'}}>
                        <FaUser className="mr-3 text-lg" style={{color: '#8BB5FF'}} />
                        Name
                      </label>

                      <input type="text" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Enter your complete name"
                        className={`w-full px-5 py-5 rounded-2xl border-2 font-Montserrat text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:shadow-lg'}`}
                        onFocus={(e) => { if (!errors.name) { e.target.style.borderColor = '#8BB5FF'; e.target.style.boxShadow = '0 0 0 3px rgba(139, 181, 255, 0.1)';}}}
                        onBlur={(e) => {if (!errors.name) { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none';}}}/>
                      
                      {errors.name && (
                        <p className="text-red-500 text-sm font-Montserrat flex items-center">
                          <FaXmark className="mr-2" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center text-sm font-bold font-Montserrat" style={{color: '#1F22A2'}}>
                        <FaUserMd className="mr-3 text-lg" style={{color: '#8BB5FF'}} />
                        Designation
                      </label>

                      <input type="text" value={formData.designation} onChange={(e) => handleInputChange('designation', e.target.value)} placeholder="Enter your designation"
                        className={`w-full px-5 py-5 rounded-2xl border-2 font-Montserrat text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${errors.designation ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:shadow-lg'}`}
                        onFocus={(e) => { if (!errors.designation) { e.target.style.borderColor = '#8BB5FF'; e.target.style.boxShadow = '0 0 0 3px rgba(139, 181, 255, 0.1)';}}}
                        onBlur={(e) => {if (!errors.designation) { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none';}}}/>
                      
                      {errors.designation && (
                        <p className="text-red-500 text-sm font-Montserrat flex items-center">
                          <FaXmark className="mr-2" />
                          {errors.designation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-bold font-Montserrat" style={{color: '#1F22A2'}}>
                      <FaMapMarkerAlt className="mr-3 text-lg" style={{color: '#8BB5FF'}} />
                      Address
                    </label>

                    <textarea value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="Enter your address" rows="4"
                      className={`w-full px-5 py-5 rounded-2xl border-2 font-Montserrat text-gray-800 placeholder-gray-400 resize-none transition-all duration-300 focus:outline-none ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:shadow-lg'}`}
                      onFocus={(e) => {if (!errors.address) {e.target.style.borderColor = '#8BB5FF'; e.target.style.boxShadow = '0 0 0 3px rgba(139, 181, 255, 0.1)';}}}
                      onBlur={(e) => {if (!errors.address) { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none';}}}/>
                    
                    {errors.address && (
                      <p className="text-red-500 text-sm font-Montserrat flex items-center">
                        <FaXmark className="mr-2" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center text-sm font-bold font-Montserrat" style={{color: '#1F22A2'}}>
                      <FaEnvelope className="mr-3 text-lg" style={{color: '#8BB5FF'}} />
                      Email Address 
                      <span className="ml-2 text-xs font-normal text-gray-500">(Optional)</span>
                    </label>

                    <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Enter your email address"
                      className={`w-full px-5 py-5 rounded-2xl border-2 font-Montserrat text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${errors.email ? 'border-red-400 bg-red-50'  : 'border-gray-200 focus:shadow-lg'}`}
                      onFocus={(e) => {if (!errors.email) { e.target.style.borderColor = '#8BB5FF'; e.target.style.boxShadow = '0 0 0 3px rgba(139, 181, 255, 0.1)';}}}
                      onBlur={(e) => {if (!errors.email) { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = 'none';}}}/>
                    
                    {errors.email && (
                      <p className="text-red-500 text-sm font-Montserrat flex items-center">
                        <FaXmark className="mr-2" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="md:pt-5 p-3">
                    <button type="submit" className="w-full md:p-5 p-3 rounded-2xl font-bold md:text-xl text-sm font-Montserrat text-white shadow-xl hover:shadow-2xl transform transition-all duration-300" style={{background: 'linear-gradient(135deg, #1F22A2 0%, #8BB5FF 100%)'}}>
                      Proceed to Digital Signature →
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl border-0 overflow-hidden">
              <div className="md:px-8 px-4 md:py-6 py-4 flex items-center justify-between" style={{background: 'linear-gradient(135deg, #1F22A2 0%, #8BB5FF 100%)'}}>
                <div>
                  <h2 className="md:text-3xl text-2xl font-bold text-white font-Montserrat">Digital Signature</h2>
                  <p className="text-white/90 md:text-lg text-sm font-Montserrat mt-1">Review and sign your call record</p>
                </div>

                <button onClick={handleBackToForm} className="bg-white/20 hover:bg-white/30 text-sm text-white md:px-6 md:py-3 p-2 rounded-xl font-semibold font-Montserrat transition-all duration-200 backdrop-blur-sm">
                  ← Back to Form
                </button>
              </div>

              <div className="md:p-12 p-4 space-y-8">
                <div className="rounded-2xl md:p-8 p-3 shadow-lg border border-gray-100" style={{backgroundColor: '#F5F5F5'}}>
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold font-Montserrat uppercase" style={{color: '#1F22A2'}}>
                      justine Santos
                    </div>
                    <span className="text-xl font-semibold text-gray-600 font-Montserrat">, MD</span>
                  </div>

                  <div className="space-y-4">
                    <div className="text-center text-sm font-Montserrat text-gray-700">
                      <span className="font-bold">Address:</span> 15420 SW 257TH AVE, TROUTDALE, OR 97060
                    </div>
                    <div className="flex md:flex-row flex-col justify-left md:justify-center md:gap-5 gap-3 text-xs font-Montserrat text-gray-500">
                      <span><strong>License:</strong> DO1578380</span>
                      <span><strong>License Expiry:</strong> 2021-12-31</span>
                      <span><strong>NPI:</strong> 1234567890</span>
                      <span><strong>DEA No.:</strong> N/A</span>
                      <span><strong>DEA Expiry:</strong> N/A</span>
                    </div>
                  </div>
                </div>

                <div className="border-2 rounded-2xl overflow-hidden shadow-lg" style={{borderColor: '#8BB5FF'}}>
                  <div className="md:px-8 p-3 " style={{backgroundColor: '#8BB5FF'}}>
                    <h3 className="font-bold text-white text-xl font-Montserrat">DTP Request (1)</h3>
                  </div>
                  <div className="md:p-8 p-4 bg-white">
                    <h4 className="font-bold text-lg font-Montserrat mb-3" style={{color: '#1F22A2'}}>
                      Ibuprofen Tablets, USP 600mg
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm font-Montserrat text-gray-600">
                      <div><span className="font-semibold">Product ID:</span> 45156-7412-60</div>
                      <div><span className="font-semibold">Quantity:</span> 2 Units</div>
                      <div><span className="font-semibold">Manufacturer:</span> N/A</div>
                      <div><span className="font-semibold">Distributor:</span> N/A</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl md:p-6 p-3 border-2" style={{backgroundColor: '#FEF3C7', borderColor: '#F59E0B'}}>
                  <div className="flex items-start gap-4">
                    <input type="checkbox" className="mt-1 w-5 h-5 rounded focus:ring-2" style={{accentColor: '#1F22A2'}} checked={isCheckboxChecked} onChange={(e) => setIsCheckboxChecked(e.target.checked)}/>
                    
                    <p className="text-sm font-Montserrat text-gray-800 leading-relaxed">
                      <strong>Certification:</strong> I hereby certify that I have requested and received the listed Samples and Quantities and all state information pertaining to my license is valid and accurate.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block text-lg font-bold font-Montserrat" style={{color: '#1F22A2'}}>
                    Digital Signature <span className="text-red-500">*</span>
                  </label>

                  <div className="rounded-2xl p-6 border-2 border-dashed" style={{borderColor: '#8BB5FF', backgroundColor: '#F8FAFF'}}>
                    <div className="bg-white border-2 rounded-xl overflow-hidden shadow-inner" style={{borderColor: '#8BB5FF'}}>
                      <SignatureCanvas ref={sigCanvasRef} penColor="#1F22A2" canvasProps={{width: 700, height: 200, className: "signature-canvas w-full h-full" }} backgroundColor="white"/>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      {signatureConfirmed ? (
                        <div className="flex items-center text-green-600 font-semibold font-Montserrat md:text-md text-sm">
                          <FaCheck className="mr-3 text-lg" />
                          Signature verified
                        </div>
                      ) : (
                        <p className="text-gray-500 font-Montserrat">Please sign in the area above</p>
                      )}

                      <div className="flex gap-3">
                        <button type="button" onClick={confirmSignature} className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl" title="Confirm Signature">
                          <FaCheck className="text-lg" />
                        </button>

                        <button type="button" onClick={clearSignature} className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl" title="Clear Signature">
                          <FaXmark className="text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-2xl p-6 shadow-md" style={{backgroundColor: '#F5F5F5'}}>
                    <div className="text-sm font-semibold font-Montserrat text-gray-600 mb-2">Date</div>
                    <div className="text-xl font-bold font-Montserrat" style={{color: '#1F22A2'}}>
                      {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl md:p-6 p-3 shadow-md" style={{backgroundColor: '#F5F5F5'}}>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold font-Montserrat" style={{color: '#1F22A2'}}>
                        Request Receipt?
                      </label>

                      <div className="relative w-20 h-10 rounded-full cursor-pointer transition-all duration-300 shadow-inner" style={{backgroundColor: isYes ? '#8BB5FF' : '#d1d5db'}} onClick={() => setIsYes(!isYes)}>
                        <div className={`absolute top-1 w-8 h-8 rounded-full shadow-lg transition-all duration-300 ease-in-out ${isYes ? 'left-1 bg-white' : 'left-11'}`} style={{backgroundColor: isYes ? 'white' : '#1F22A2'}}></div>
                        
                        <div className="absolute inset-0 flex items-center justify-between px-2 text-xs font-bold font-Montserrat">
                          <span className={`${isYes ? 'text-gray-600' : 'text-white'} transition duration-300`}>YES</span>
                          <span className={`${!isYes ? 'text-white' : 'text-gray-600'} transition duration-300`}>NO</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button className={`w-full md:py-6 py-3 rounded-2xl font-bold md:text-xl font-Montserrat shadow-xl transition-all duration-300 ${ signatureConfirmed && isCheckboxChecked ? 'text-white hover:shadow-2xl transform hover:-translate-y-1' : 'text-gray-500 cursor-not-allowed shadow-md'}`} style={{background: signatureConfirmed && isCheckboxChecked  ? 'linear-gradient(135deg, #1F22A2 0%, #8BB5FF 100%)' : '#e5e7eb'}} disabled={!(signatureConfirmed && isCheckboxChecked)} onClick={handleSubmit}>
                    {signatureConfirmed && isCheckboxChecked ? '✓ Submit' : 'Please complete signature and certification'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Information;