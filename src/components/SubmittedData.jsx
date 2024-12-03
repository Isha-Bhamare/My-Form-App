import PropTypes from 'prop-types';
import { FaEdit, FaTrash } from 'react-icons/fa';

const SubmittedData = ({ data, onEdit, onDelete, onNewForm }) => {
  const handleNewForm = () => {
    onNewForm();
    const formButton = document.querySelector('button[data-section="form"]');
    if (formButton) {
      formButton.click();
    }
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">No submitted data yet.</p>
        <p className="text-gray-400 text-sm mt-2">Complete the form to see submissions here.</p>
        <button
          onClick={handleNewForm}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Start New Form
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Submitted Information</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Total Submissions: {data.length}
          </span>
          <button
            onClick={handleNewForm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Start New Form
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Personal Information
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Information
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Age: {item.age || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900">{item.street}</div>
                    <div className="text-sm text-gray-500">
                      {item.city}, {item.state}
                    </div>
                    <div className="text-sm text-gray-500">
                      PIN: {item.zipCode}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="text-sm text-gray-900">
                      Card: **** **** **** {item.cardNumber?.slice(-4)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.cardholderName}
                    </div>
                    <div className="text-sm text-gray-500">
                      Expires: {item.expiryDate}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => onEdit(item.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                      title="Edit"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this entry?')) {
                          onDelete(item.id);
                        }
                      }}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      title="Delete"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

SubmittedData.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      age: PropTypes.string,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zipCode: PropTypes.string,
      cardNumber: PropTypes.string.isRequired,
      cardholderName: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNewForm: PropTypes.func.isRequired,
};

export default SubmittedData; 