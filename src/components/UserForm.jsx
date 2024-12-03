import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const UserForm = ({ formData, setFormData, nextStep }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (formData.age && (formData.age < 18 || formData.age > 100)) {
      newErrors.age = 'Age must be between 18 and 100';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      toast.success('User information saved!');
      nextStep();
    } else {
      setErrors(newErrors);
      toast.error('Please fill all required fields correctly');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      
      <div>
        <label className="block mb-2">
          First Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.firstName || ''}
          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.lastName || ''}
          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">Age</label>
        <input
          type="number"
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className="w-full p-2 border rounded"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Save & Next
      </button>
    </form>
  );
};

UserForm.propTypes = {
  formData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  setFormData: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default UserForm; 