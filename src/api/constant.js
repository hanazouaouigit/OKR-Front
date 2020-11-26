const bool = true;
const isLocal = bool;
const PROTOCOL = isLocal ? "http://" : "https://";
const WS_PROTOCOL = isLocal ? "ws://" : "wss://";
const HOST = isLocal ? "127.0.0.1:1996" : "apilynkbooster.toolynk.fr";
const WS_ENDPOINT = "/subscriptions";
const BASE_URL = `${PROTOCOL}${HOST}`;
const PHOTO_URL = `${PROTOCOL}${HOST}`;
const WS_URL = `${WS_PROTOCOL}${HOST}${WS_ENDPOINT}`;

export {
  BASE_URL,
  WS_URL,
  PHOTO_URL,
};