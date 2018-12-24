const API_URL = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000/';

if (!API_URL) {
  console.error('Set `API_URL` in `client/src/app/js/actions/index.js` to your stage endpoint')
}

export const QUERY_URL = `${API_URL}/query/`
