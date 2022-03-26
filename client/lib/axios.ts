import axios from 'axios';
// import { getSession } from 'next-auth/react'; // TODO: TO IMPLEMENT JWT

const baseURL = 'http://localhost:3000';

const ApiClient = () => {
  const defaultOptions = {
    baseURL,
    headers: { 'Content-Type': 'application/json' },
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    // TODO: TO IMPLEMENT JWT
    // const session = await getSession();
    // if (session) {
    //   request.headers.Authorization = `Bearer ${session.jwt}`;
    // }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    }
  );

  return instance;
};

export default ApiClient();
