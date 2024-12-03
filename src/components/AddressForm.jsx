import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const AddressForm = ({ formData, setFormData, nextStep, prevStep }) => {
  const [errors, setErrors] = useState({});
  
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.street?.trim()) {
      newErrors.street = 'Street is required';
    }
    if (!formData.city?.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state) {
      newErrors.state = 'State is required';
    }
    // Validate Indian PIN code (6 digits)
    if (formData.zipCode && !/^[1-9][0-9]{5}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid PIN code format (should be 6 digits)';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      toast.success('Address information saved!');
      nextStep();
    } else {
      setErrors(newErrors);
      toast.error('Please fill all required fields correctly');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Address Information</h2>
      
      <div>
        <label className="block mb-2">
          Street Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.street || ''}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Enter your street address"
        />
        {errors.street && (
          <p className="text-red-500 text-sm mt-1">{errors.street}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">
          City <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.city || ''}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Enter your city"
        />
        {errors.city && (
          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">
          State <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.state || ''}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && (
          <p className="text-red-500 text-sm mt-1">{errors.state}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">
          PIN Code <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.zipCode || ''}
          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Enter 6-digit PIN code"
          maxLength="6"
        />
        {errors.zipCode && (
          <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={prevStep}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Save & Next
        </button>
      </div>
    </form>
  );
};

AddressForm.propTypes = {
  formData: PropTypes.shape({
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
};

export default AddressForm; 