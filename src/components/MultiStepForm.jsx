import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import UserForm from './UserForm';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import SubmittedData from './SubmittedData';
import ProgressBar from './ProgressBar';
import PropTypes from 'prop-types';

const MultiStepForm = ({ initialStep = 1, onSubmitSuccess }) => {
  const [step, setStep] = useState(initialStep);
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setStep(initialStep);
    setProgress(initialStep === 4 ? 100 : 0);
  }, [initialStep]);

  const nextStep = () => {
    setStep(step + 1);
    setProgress((step / 3) * 100);
  };

  const prevStep = () => {
    setStep(step - 1);
    setProgress(((step - 2) / 3) * 100);
  };

  const handleSubmit = () => {
    setSubmittedData([...submittedData, { id: Date.now(), ...formData }]);
    setFormData({});
    toast.success(isEditing ? 'Form updated successfully!' : 'Form submitted successfully!');
    setIsEditing(false);
    setStep(4);
    setProgress(100);
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const handleEdit = (id) => {
    const dataToEdit = submittedData.find(data => data.id === id);
    setFormData(dataToEdit);
    setSubmittedData(submittedData.filter(data => data.id !== id));
    setStep(1);
    setProgress(0);
    setIsEditing(true);
    toast.info('You can now edit the selected entry');
  };

  const handleDelete = (id) => {
    setSubmittedData(submittedData.filter(data => data.id !== id));
    toast.success('Entry deleted successfully!');
  };

  const resetForm = () => {
    setStep(1);
    setFormData({});
    setProgress(0);
    setIsEditing(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UserForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <PaymentForm
            formData={formData}
            setFormData={setFormData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      case 4:
        return (
          <SubmittedData
            data={submittedData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onNewForm={resetForm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar progress={progress} />
      {renderStep()}
    </div>
  );
};

MultiStepForm.propTypes = {
  initialStep: PropTypes.number,
  onSubmitSuccess: PropTypes.func,
};

MultiStepForm.defaultProps = {
  initialStep: 1,
  onSubmitSuccess: () => {},
};

export default MultiStepForm; 