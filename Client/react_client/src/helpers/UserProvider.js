export default class UserProvider {
  /**
   * Set the user to the browser's cookies
   * @param {*} user
   */
  setUser(user) {
    document.cookie = `username=${user};path=/`;
  }

  /**
   * Get the user from the browser's cookies
   * @returns The user
   */
  getUser() {
    return document.cookie.split("=")[1];
  }
}
