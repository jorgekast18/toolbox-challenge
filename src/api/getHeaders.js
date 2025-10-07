export function getHeaders(token) {
  return token
    ? { 'Content-type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-type': 'application/json' };
}