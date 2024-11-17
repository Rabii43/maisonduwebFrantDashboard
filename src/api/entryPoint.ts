
// Urls base
export const SERVER_URL = "https://a.com";
export const BASE_URL = "http://localhost:8005";
export const BASE_URL_API = BASE_URL + "/api/";
export const imageUrl = BASE_URL + "/uploads/images/";

// ****************** Auth Api *************************
export const LOGIN = BASE_URL + "/login";
export const TOKEN_REFRESH = BASE_URL_API + "token/refresh";

// ****************** User Api *************************
export const USER = BASE_URL_API + "user";
export const USER_PROFILE = USER + "/editProfile";
export const EDIT_PASSWORD = BASE_URL_API + "resetPassword";
export const STATUS_USER = BASE_URL_API + "activateAccount";
