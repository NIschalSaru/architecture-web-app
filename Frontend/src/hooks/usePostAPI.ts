import { App } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { apiUrl, getTokenFromLocalStorage, handleSignOut } from "../utils";
import { useNavigate } from "react-router-dom";

interface PostRequestState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
  postData: (value: unknown) => void;
}

const usePostAPI = <T,>(
  url: string
  // successMessage: string = ''
): PostRequestState<T> => {
  const navigate = useNavigate();
  const { message } = App.useApp();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const postData = async (requestData: unknown) => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage() || ""}`,
        },
      };
      const response: AxiosResponse = await axios.post(
        `${apiUrl}/${url}`,
        requestData,
        config
      );

      if (response && response.data) {
        const responseData = response.data;
        setData(responseData);
        setError(null);
        message.success(
           responseData?.message || 'Success'
          // || `${successMessage} Added Successfully!`
        );
      } else {
        message.error("Invalid response format: Missing data property");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          const { status, data } = axiosError.response;

          if (status === 401) {
            handleSignOut(navigate);
            message.error("Unauthorized: Invalid credentials");
          } else {
            // message.error(`HTTP error ${status}: ${JSON.stringify(data)}`);
            message.error(`Error : ${(data as { message: string }).message}`);
          }
        } else {
          message.error(`Network error: ${error.message}`);
        }
      } else {
        message.error(`Error: ${error}`);
      }
    }
    setLoading(false);
  };

  return { loading, error, data, postData };
};

export default usePostAPI;
