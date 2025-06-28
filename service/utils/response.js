
const sendSuccessResponse = (res, message, data = null, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,  
  });
};

const sendErrorResponse = (res, message, statusCode = 400, error = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

module.exports = { sendSuccessResponse, sendErrorResponse };