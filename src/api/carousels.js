import axios from 'axios';

import { loadAbort } from '../utils/load-abort.utility';
import { carouselUrl } from '../constants/urls';
import { getHeaders } from './getHeaders';


export const getCarousel = (token) => {
  const controller = loadAbort();

  return {
    call: axios.get(carouselUrl, {
      signal: controller.signal,
      headers: getHeaders(token)
    }),
    controller
  }
}
