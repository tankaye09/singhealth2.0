import { CLEAR_ERRORS, CLEAR_MESSAGES } from "./types";

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  };
};
