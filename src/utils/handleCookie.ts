import Cookies from "js-cookie";

const deleteCookie = (cookieName: string): void => {
  Cookies.remove(cookieName);
};

const getCookie = (cookieName: string): string | undefined => {
  return Cookies.get(cookieName);
};

const setCookie = (cookieName: string, cookieValue: string): void => {
  Cookies.set(cookieName, cookieValue);
};

export { deleteCookie, getCookie, setCookie };
