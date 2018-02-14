export class SecureHeaders {
  static requestOptions(method, body) {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getToken()}`
      }
    }

    if (body) {
      options.body = JSON.stringify(body);
    }
    console.log(options);
    return options;
  }

  static getToken() {
    return JSON.parse(localStorage.getItem('user')).token;
  }
}
