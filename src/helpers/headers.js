export class SecureHeaders {
  static requestOptions(method, body) {
    // TODO: Need error handling if token isn't present.
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }
    }

    if (body) options.body = JSON.stringify(body);

    return options;
  }

  static getToken() {
    return JSON.parse(localStorage.getItem('user')).token;
  }
}
