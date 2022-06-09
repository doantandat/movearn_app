const domain = 'http://178.128.112.53:3000';
import {CONST_STORAGE, storage} from '../common';
import {API_CONST, API_FETCH} from './../api';
import Config from 'react-native-config';
const createSession = async id => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(`${domain}/run`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
    body: JSON.stringify({shoesId: id}),
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
};

const getSession = async id => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(`${domain}/run/${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
};

const testStop = async (a, b, c, d, e) => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(
    `https://us-central1-safaty-e20ba.cloudfunctions.net/movearn_teststep?a=${a}&b=${b}&c=${c}&d=${d}&e=${e}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_access}`,
      },
    },
  );
  const content = await rawResponse.json();

  console.log(content);
  return content;
};

const set_pass = async (a, b) => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(
    `https://us-central1-safaty-e20ba.cloudfunctions.net/movearn_setpasss?uid=${a}&pass=${b}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_access}`,
      },
    },
  );
  try {
    const content = await rawResponse.json();
    return {code: 200, message: 'error', data: content};
  } catch (error) {
    return {code: 409, message: 'error', data: {}};
  }

  // console.log(content);
  // return content;
};

const check_pass = async (a, b) => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(
    `https://us-central1-safaty-e20ba.cloudfunctions.net/movearn_checkPass?userId=${a}&pass=${b}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_access}`,
      },
    },
  );
  try {
    const content = await rawResponse.json();
    return {code: 200, message: 'error', data: content};
  } catch (error) {
    return {code: 409, message: 'error', data: {}};
  }

  // console.log(content);
  // return content;
};

const BackupCode = async (a, b) => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(
    `https://us-central1-safaty-e20ba.cloudfunctions.net/movearn_backup?userId=${a}&pass=${b}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_access}`,
      },
    },
  );
  try {
    const content = await rawResponse.json();
    return {code: 200, message: 'error', data: content};
  } catch (error) {
    return {code: 409, message: 'error', data: {}};
  }

  // console.log(content);
  // return content;
};
const updateWallets = async (a, b) => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(
    `https://us-central1-safaty-e20ba.cloudfunctions.net/movearn_updateWallets?uid=${a}&privkey=${b}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_access}`,
      },
    },
  );
  try {
    const content = await rawResponse.json();
    return {code: 200, message: 'error', data: content};
  } catch (error) {
    return {code: 409, message: 'error', data: {}};
  }

  // console.log(content);
  // return content;
};

const putSession = async (id, kmm) => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(`${domain}/run/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
    body: JSON.stringify({
      distance: kmm,
      status: 'running',
    }),
  });
  const content = await rawResponse.json();

  console.log(content);
  return content;
};
const postLogin = async Body => {
  const body = {
    email: Body.email,
    password: Body.password,
  };
  // const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(API_CONST.API_POST_LOGIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const content = await rawResponse.json();

  console.log(content);
  return content;
};

const resendRegisterCode = async Body => {
  const body = {email: Body.email};
  // const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(API_CONST.API_POST_RESEND_REGISTER_CODE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const content = await rawResponse.json();

  console.log(content);
  return content;
};

const submitCode = async Body => {
  const body = {
    verificationCode: Body.verificationCode,
    email: Body.email,
  };
  // const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(API_CONST.API_POST_SUBMIT_CODE, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const content = await rawResponse.json();

  console.log(content);
  return content;
};

const setPassword = async Body => {
  const token_set_password = await storage.getItem(
    CONST_STORAGE.TOKEN_SET_PASSWORD,
  );

  if (token_set_password) {
    const body = {
      email: Body.email,
      password: Body.password,
      token: token_set_password,
    };
    const rawResponse = await fetch(API_CONST.API_POST_SET_PASSWORD, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const content = await rawResponse.json();

    console.log('content', content);
    return content;
  }
};

const getConstShoe = async () => {
  const rawResponse = await fetch(API_CONST.API_GET_SHOES_CONST, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const content = await rawResponse.json();

  console.log('content', content);
  return content;
};

const shoes = async (a, b) => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(API_CONST.API_GET_SHOES, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
  });
  const content = await rawResponse.json();
  console.log('content shoes', content);
  return content;
};

const market = async Body => {
  const params = API_FETCH.getQueryString({
    pageSize: Body.pageSize ?? 20,
    page: Body.page ?? 1,
  });
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(`${API_CONST.API_GET_MARKET}?${params}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
  });
  const content = await rawResponse.json();
  console.log('content maket', content);
  return content;
};

const getUser = async Body => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(API_CONST.API_GET_USER_INFO, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
  });
  const content = await rawResponse.json();
  console.log('content getUser', content);
  return content;
};

const userId = async Body => {
  const rawResponse = await fetch(`${API_CONST.API_GET_USER_ID}/${Body._id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: Config.SECRET_KEY,
    },
  });
  const content = await rawResponse.json();
  console.log('content maket', content);
  return content;
};

const putShoesId = async Body => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);
  const body = {
    isSelling: Body.isSelling,
    price: Body.price,
  };
  console.log(body, Body._id);
  // return
  const rawResponse = await fetch(`${API_CONST.API_PUT_SHOES_ID}/${Body._id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
    body: JSON.stringify(body),
  });
  const content = await rawResponse.json();
  console.log('content putShoesId', content);
  return content;
};

const shoesIdWear = async Body => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);

  const rawResponse = await fetch(
    `${API_CONST.API_GET_SHOES_ID_WEAR}/${Body._id}/wear`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_access}`,
      },
    },
  );
  const content = await rawResponse.json();
  console.log('content shoesIdWear', content);
  return content;
};

const buy = async Body => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);
  const body = {
    shoesId: Body.shoesId,
  };

  const rawResponse = await fetch(API_CONST.API_POST_BUY, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
    body: JSON.stringify(body),
  });
  const content = await rawResponse.json();
  console.log('content shoesIdWear', content);
  return content;
};
const userIdBnb = async Body => {
  const rawResponse = await fetch(
    `${API_CONST.API_GET_USER_ID_BNB}?userId=${Body._id}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  console.log('content userIdBnb', content);
  return content;
};
const getRate = async () => {
  const rawResponse = await fetch(API_CONST.API_GET_RATE, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const content = await rawResponse.json();
  console.log('content getRate', content);
  return content;
};

const transfer = async Body => {
  const rawResponse = await fetch(
    `${API_CONST.API_TRANSFER}?userId=${Body.userId}&amount=${Body.amount}&type=${Body.type}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  console.log('content transfer', content);
  return content;
};

const transferSpending = async Body => {
  const rawResponse = await fetch(
    `${API_CONST.API_TRANSFER_SPENDING}?userId=${Body.userId}&amount=${Body.amount}&to=${Body.to}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  console.log('content transfer', content);
  return content;
};
const swap = async Body => {
  const rawResponse = await fetch(
    `${API_CONST.API_SWAP}?userId=${Body.userId}&amount=${Body.amount}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  console.log('content transfer', content);
  return content;
};
const startRunning = async body => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);
  const rawResponse = await fetch(`${API_CONST.API_START_RUNNING}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token_access}`,
    },
    body: JSON.stringify(body),
  });
  const content = await rawResponse.json();
  return content;
};

const getRunningSession = async id => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);
  const rawResponse = await fetch(
    `${API_CONST.API_GET_RUNNING_SESSION}/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_access}`,
      },
    },
  );
  const content = await rawResponse.json();
  return content;
};

const updateRunningSession = async (id, body) => {
  const token_access = await storage.getItem(CONST_STORAGE.TOKEN_ACCESS);
  const rawResponse = await fetch(
    `${API_CONST.API_GET_RUNNING_SESSION}/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token_access}`,
      },
      body: JSON.stringify(body),
    },
  );
  const content = await rawResponse.json();
  return content;
};
export {
  createSession,
  getSession,
  putSession,
  testStop,
  set_pass,
  updateWallets,
  check_pass,
  BackupCode,
  postLogin,
  resendRegisterCode,
  submitCode,
  setPassword,
  getConstShoe,
  shoes,
  market,
  getUser,
  userId,
  putShoesId,
  shoesIdWear,
  buy,
  userIdBnb,
  getRate,
  transfer,
  transferSpending,
  swap,
  startRunning,
  getRunningSession,
  updateRunningSession
};
