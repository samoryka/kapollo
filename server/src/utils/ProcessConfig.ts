import * as process from "process";

export const getPort = () => process.env.PORT || 3000;
export const getWebSocketPort = () => process.env.SOCKET_PORT || 3001;