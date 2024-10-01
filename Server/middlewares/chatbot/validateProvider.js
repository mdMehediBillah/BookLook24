import ErrorResponse from "../../utils/chatbot/ErrorResponse.js";

const validateProvider = (req, res, next) => {
  const providers = ["open-ai"];
  const {
    headers: { provider },
  } = req;
  if (!providers.includes(provider)) {
    throw new ErrorResponse(`${provider} is not a valid provider`, 400);
  }
  return next();
};

export default validateProvider;
