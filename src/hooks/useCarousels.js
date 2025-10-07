import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, fetchSuccess, fetchFailure } from '../redux/carouselsSlice';
import { getCarousel } from '../api/carousels';
import useFetchAndLoad from './useFetchAndLoad';

export default function useCarousels() {
  const { callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.carousels);
  const token = useSelector(state => state.auth.token);

  async function fetchCarousels() {
    dispatch(fetchStart());
    try {
      const data = await callEndpoint(getCarousel(token));
      dispatch(fetchSuccess(data));
    } catch (err) {
      dispatch(fetchFailure(err.message));
    }
  }

  return { items, loading, error, fetchCarousels };
}
