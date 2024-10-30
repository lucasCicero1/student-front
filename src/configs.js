const type = import.meta.env.MODE;

const configs = {
  production: {
    API_URL: process.env.API_URL,
  },
  development: {
    API_URL: 'http://localhost:3000/v1/',
  },
};

export default configs[type];
