import Dialog from "../../../../components/ui/Dialog";
import { FaFileAlt, FaImage } from "react-icons/fa";

const getImageUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${process.env.REACT_APP_PUBLIC_BASE_URL}/${path}`;
};

const ViewDocumentModal = ({ isOpen, onClose, formData }) => {
  if (!formData) return null;

  const imageUrl = getImageUrl(formData.document);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="w-full h-full p-10 overflow-auto"
      contentClassName="w-full h-full bg-white lg:max-w-4xl rounded-lg overflow-auto scrollbar p-6"
      overlayClassName="backdrop-blur"
    >
      <div className="p-8 bg-gray-100 border rounded-lg">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          Document Details
        </h2>

        {imageUrl && (
          <div className="flex items-start gap-4 p-4 mb-4 bg-white rounded-md shadow-sm">
            <FaImage className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Uploaded Image</h4>
              <img
                src={imageUrl}
                alt="Uploaded Document"
                className="w-full max-w-md mt-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {formData?.documentUrl && (
          <div className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
            <FaFileAlt className="mt-1 text-xl text-blue-600" />
            <div>
              <h4 className="text-sm text-gray-500">Attached Document</h4>
              <a
                href={formData.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-sm text-blue-600 underline hover:text-blue-800"
              >
                View Document
              </a>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default ViewDocumentModal;
