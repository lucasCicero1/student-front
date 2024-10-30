const type = import.meta.env.MODE;

const configs = {
  production: {
    API_URL: 'https://student-hub-api.onrender.com/v1/',
  },
  development: {
    API_URL: 'http://localhost:3000/v1/',
  },
};

export default configs[type];
