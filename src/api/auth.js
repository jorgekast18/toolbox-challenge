import axios from 'axios';

import { loadAbort } from '../utils/load-abort.utility';
import { loginUrl } from '../constants/urls';

export const login = () => {
  console.log('llego al servicio');
  const controller = loadAbort();
  const data = {
    "sub": "ToolboxMobileTest"
  }

  return {
    call: axios.post(loginUrl, data, { signal: controller.signal }),
    controller
  }

}
