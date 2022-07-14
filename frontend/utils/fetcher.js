const BASE_URL = 'http://13.209.183.185';

const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const fetchWrapper = (url, method, body) =>
  new Promise((resolve, reject) => {
    fetch(BASE_URL + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    })
      .then((res) => {
        if (!res.ok) {
          throw res.json();
        }
        resolve(res.json());
      })
      .catch((err) => err)
      .then((err) => {
        if (err) {
          const { message } = err;
          reject(message);
        }
      });
  });

const fetcher = {
  get: (url) => fetchWrapper(url, HTTP_METHOD.GET),
  post: (url, body) => fetchWrapper(url, HTTP_METHOD.POST, body),
  put: (url, body) => fetchWrapper(url, HTTP_METHOD.PUT, body),
  delete: (url, body) => fetchWrapper(url, HTTP_METHOD.DELETE),
};

export default fetcher;
