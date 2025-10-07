import axios from 'axios';

import { loadAbort } from '../utils/load-abort.utility';
import { carouselUrl } from '../constants/urls';

export const getCarousel = () => {
  const controller = loadAbort();

  return {
    call: axios.get(carouselUrl, { signal: controller.signal }),
    controller
  }
}
