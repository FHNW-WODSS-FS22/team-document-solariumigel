/**
 * Address of the api
 */
export const apiAdress = "https://localhost:7287";

/**
 * FETCH REQUESTS CONTROLLER
 */
export default class ApiController {
  /**
   * Constructor
   */
  constructor() {
    this.address = apiAdress;
    this.documents = [];
    this.selected = null;
  }

  /**
   * Builds a request to the API.
   * @param {String} method HTTP Request method (GET, POST, PUT, DELETE,...)
   * @param {String} path Path to Resource
   * @param {Object} body JSON Object: data to be transmitted
   * @return {Request} Request Object
   */
  buildRequest(method, path, body) {
    const target = this.address + "/api";
    const options = {
      headers: {
        Authorization: `Bearer ${this.token}`,
        ...(["PUT", "POST"].includes(method)
          ? { "Content-Type": "application/json" }
          : false),
        ...(["PUT", "POST", "GET"].includes(method)
          ? { Accept: "application/json" }
          : false),
      },
      method: method,
      ...(body ? { body: JSON.stringify(body) } : false),
    };
    return new Request(target + path, options);
  }

  /**
   *  Fetch all documents from database
   */
  async fetchDocuments() {
    try {
      const promise = await makeCall(this.buildRequest("GET", "/document"));
      this.documents = promise;
    } catch (e) {
      console.error("API: Could not fetch documents", e);
    }
  }

  /**
   * Post a new document to database
   * @param {Object} document
   * @return {Array}
   */
  async createDocument(document) {
    try {
      const response = await makeCall(
        this.buildRequest("POST", "/document", document)
      );
      await this.fetchDocuments();
      return response.id;
    } catch (e) {
      console.error("API: Couldnt create document", e);
    }
  }

  /**
   * Delete a document from database
   * @param {Object} documentId
   */
  async deleteDocument(documentId) {
    try {
      await makeCall(this.buildRequest("DELETE", `/document/${documentId}`));
      await this.fetchDocuments();
    } catch (e) {
      console.error("API: Coudnt delete document", e);
    }
  }
}

/**
 * Executes a request with using fetch API and awaits it's response
 * @param {Request} request
 * @return {Promise} Promise object
 */
export async function makeCall(request) {
  const response = await fetch(request);
  if (response.ok) {
    if (request.method !== "DELETE") {
      const result = await response.json();
      return result;
    }
  } else {
    console.error("API: Request Failed !", response);
    throw response;
  }
}
