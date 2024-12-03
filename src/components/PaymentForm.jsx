import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const PaymentForm = ({ formData, setFormData, prevStep, handleSubmit }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber?.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    }

    if (!formData.cvv?.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    if (!formData.cardholderName?.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }

    return newErrors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      handleSubmit();
    } else {
      setErrors(newErrors);
      toast.error('Please fill all required fields correctly');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
      
      <div>
        <label className="block mb-2">
          Card Number <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.cardNumber || ''}
          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="1234 5678 9012 3456"
          maxLength="16"
        />
        {errors.cardNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">
          Expiry Date <span className="text-red-500">*</span>
        </label>
        <input
          type="month"
          value={formData.expiryDate || ''}
          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.expiryDate && (
          <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">
          CVV <span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          value={formData.cvv || ''}
          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
          className="w-full p-2 border rounded"
          maxLength="4"
        />
        {errors.cvv && (
          <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">
          Cardholder Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.cardholderName || ''}
          onChange={(e) => setFormData({ ...formData, cardholderName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.cardholderName && (
          <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

PaymentForm.propTypes = {
  formData: PropTypes.shape({
    cardNumber: PropTypes.string,
    expiryDate: PropTypes.string,
    cvv: PropTypes.string,
    cardholderName: PropTypes.string,
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default PaymentForm; 