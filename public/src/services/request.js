import 'whatwg-fetch';

const request = {
  // Return promise passing response value
  get: endpoint => {
    return fetch(endpoint)
      .then(response => response.json())
      .catch(err => err);
  },

  post: (endpoint, params) => {
    console.log(endpoint);
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(response => response.json());
  }
};

export default request;
