
// Urls base
export const SERVER_URL = "https://a.com";
export const baseUrl = "http://localhost:8005";
export const baseUrlApi = baseUrl + "/api/";
export const imageUrl = baseUrl + "/uploads/images/";

// ****************** Auth Api *************************
export const login = baseUrl + "/login";
export const tokenRefresh = baseUrlApi + "token/refresh";

// ****************** User Api *************************
export const user = baseUrlApi + "user";
export const userProfile = user + "/editProfile";
export const editPassowrd = baseUrlApi + "resetPassword";
export const statusUser = baseUrlApi + "activateAccount";
