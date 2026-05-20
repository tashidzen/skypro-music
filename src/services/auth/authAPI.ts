import axios from 'axios';
import { BASE_URL } from '../constants';

type authUserProps = {
  email: string;
  password: string;
};

type baseUserReturn = {
  email: string;
  username: string;
  _id: number;
};

type registerUserProps = authUserProps & {
  username: string;
  repeatPassword: string;
};

type accessTokenType = {
  access: string;
};

type refreshTokenType = {
  refresh: string;
};

type tokensType = accessTokenType & refreshTokenType;

export const authUser = (data: authUserProps): Promise<baseUserReturn> => {
  return axios
    .post(BASE_URL + '/user/login/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data);
};

export const registerUser = (
  data: registerUserProps,
): Promise<baseUserReturn> => {
  return axios
    .post(BASE_URL + '/user/signup/', data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    .then((res) => res.data.result);
};

export const getTokens = (data: authUserProps): Promise<tokensType> => {
  return axios.post(BASE_URL + '/user/token/', data).then((res) => res.data);
};

export const refreshToken = (refresh: string): Promise<accessTokenType> => {
  return axios
    .post(BASE_URL + '/user/token/refresh/', {
      refresh,
    })
    .then((res) => res.data);
};
