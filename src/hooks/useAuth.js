import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/authSlice';
import { login } from '../api/auth';
import useFetchAndLoad from './useFetchAndLoad';

export default function useAuth() {
  const { callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { token, type, loading, error } = useSelector(state => state.auth);

  async function auth() {
    dispatch(loginStart());
    try {
      const data = await callEndpoint(login());
      if (data.token) {
        dispatch(loginSuccess(data));
      } else {
        throw new Error('Login sin token.');
      }
    } catch (err) {
      dispatch(loginFailure(err.message));
    }
  }

  function doLogout() {
    dispatch(logout());
  }

  return { token, type, loading, error, auth, doLogout };
}
