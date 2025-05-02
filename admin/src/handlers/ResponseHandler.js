import toast from 'react-hot-toast';

const ResponseHandler = () => {
    const handleResponse = async (serviceCall) => {
      try {
        const response = await serviceCall();

        if (response.status >= 200 && response.status < 300) {
          toast.success(
            response.data?.message || "Operation completed successfully!"
          );
        } else {
          toast.info(`Response received with status: ${response.status}`);
        }

        return response;
      } catch (error) {
        if (error.response) {
          const status = error.response.status;

          if (status >= 400 && status < 500) {
            toast.error(
              error.response.data?.message || `Client error: ${status}`
            );
          } else if (status >= 500) {
            toast.error(`Server error: ${status}`);
          }
        } else {
          toast.error(`Unexpected error: ${error.message}`);
        }

        // Return the error in case it needs to be handled elsewhere
        throw error;
      }
    };

  return { handleResponse };
}

export default ResponseHandler



// // Example usage with your createSocietyModeratorHandler:
// const createSocietyModeratorHandler = async (formData, token) => {
//   return handleResponse(() => createSocietyModeratorService(formData, token));
// };
