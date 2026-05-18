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

export const authUser = (data: authUserProps): Promise<baseUserReturn> => {
  return axios.post(BASE_URL + '/user/login/', data, {
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      'content-type': 'application/json',
    },
  });
};

export const registerUser = (
  data: registerUserProps,
): Promise<baseUserReturn> => {
  return axios.post(BASE_URL + '/user/signup/', data, {
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      'content-type': 'application/json',
    },
  });
};
