import { HubConnectionBuilder } from "@microsoft/signalr";

/**
 * Address of the connection through signalR
 */
export const connectionAdress = "https://localhost:7287/documentSocket";

/**
 * CONNECTION CONTROLLER
 */
export default class ConnectionBuilder {
  /**
   * Constructor
   */
  constructor() {
    this.address = connectionAdress;
  }

  /**
   * Build a connection
   * @returns The connection
   */
  buildConnection() {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl(this.address)
        .withAutomaticReconnect()
        .build();
      return connection;
    } catch (e) {
      console.error("SignalR: Could not build a connection", e);
    }
  }
}
