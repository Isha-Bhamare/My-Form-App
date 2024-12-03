import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { FaList, FaWpforms, FaBars } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import MultiStepForm from './components/MultiStepForm';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState('form');

  const handleFormSubmit = () => {
    setActiveSection('submitted');
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setShowSidebar(false);
    

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}

  
      <div
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-30`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
          <nav className="space-y-2">
            <button
              data-section="form"
              onClick={() => handleSectionChange('form')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'form'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <FaWpforms />
              <span>New Form</span>
            </button>
            <button
              data-section="submitted"
              onClick={() => handleSectionChange('submitted')}
              className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeSection === 'submitted'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <FaList />
              <span>Submitted Forms</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white shadow-sm lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setShowSidebar(true)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <FaBars className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {activeSection === 'form' ? 'New Form' : 'Submitted Forms'}
            </h1>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 hidden lg:block">
              {activeSection === 'form' ? 'Dynamic Multi-Step Form' : 'Submitted Forms'}
            </h1>
            <MultiStepForm 
              initialStep={activeSection === 'form' ? 1 : 4} 
              onSubmitSuccess={handleFormSubmit}
            />
          </div>
        </main>
      </div>

      <ToastContainer position="top-right" />
    </div>
  );
}

export default App; 