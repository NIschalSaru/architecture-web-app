import { App } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import {apiUrl} from '../utils/index'

interface GetRequestState<T> {
  loading: boolean;
  error: string | null;
  data: T | null;
}

const useGetAPI = <T>(
  url: string,
  showMessage = true,
  hasData = true
): GetRequestState<T> => {
  const { message } = App.useApp();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try { 
        const response: AxiosResponse = await axios.get(`${apiUrl}/${url}`);

        if (response && response.data) {
          const responseData = response.data;
          setData(responseData?.data || null);
          setError(null);
          // showMessage && message.success(responseData?.message || 'Data fetched successfully');
        } else {
          message.error('Invalid response format: Missing data property');
        }
      } catch (error: any) {
        message.error(`Error fetching data: ${error.message}`);
        setError(error.message);
      }
      setLoading(false);
    };

    hasData && fetchData();
  }, [url, showMessage, hasData]);

  return { loading, error, data };
};

export default useGetAPI;










// import { App } from 'antd';
// import axios, { AxiosError, AxiosResponse } from 'axios';
// import { useEffect, useState } from 'react';
// import { apiUrl, getTokenFromLocalStorage, handleSignOut } from '../utils';
// import { useNavigate } from 'react-router-dom';

// interface GetRequestState<T> {
//   loading: boolean;
//   error: string | null;
//   data: T | null;
// }

// const useGetAPI = <T>(
//   url: string,
//   showMessage = true,
//   hasData = true
// ): GetRequestState<T> => {
//   const navigate = useNavigate();
//   const { message } = App.useApp();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [data, setData] = useState<T | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
//           },
//         };
//         const response: AxiosResponse = await axios.get(
//           `${apiUrl}/${url}`,
//           config
//         );

//         if (response && response.data) {
//           const responseData = response.data;
//           setData(responseData?.data);
//           setError(null);
//           showMessage && message.success(responseData?.message || '');
//         } else {
//           message.error('Invalid response format: Missing data property');
//         }
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           const axiosError: AxiosError = error;
//           if (axiosError.response) {
//             const { status, data } = axiosError.response;

//             if (status === 401) {
//               handleSignOut(navigate);
//               message.error('Unauthorized: Invalid credentials');
//             } else {
//               message.error(`HTTP error ${status}: ${JSON.stringify(data)}`);
//             }
//           } else {
//             message.error(`Network error: ${error.message}`);
//           }
//         } else {
//           message.error(`Error: ${error}`);
//         }
//       }
//       setLoading(false);
//     };

//     hasData && fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [url]);

//   return { loading, error, data };
// };

// export default useGetAPI;
