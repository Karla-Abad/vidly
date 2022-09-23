import axios from "axios";
import auth from "./authService";
import { toast } from "react-toastify";

// This allows axios to include a specific header to any request (post, put, delete)
// this will include the token in every request.
// If token not defined, then header will not be set.
axios.defaults.headers.common["x-auth-token"] = auth.getJwt();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Logging the error", error);
    toast.error("An unexpected error ocurred.");
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
