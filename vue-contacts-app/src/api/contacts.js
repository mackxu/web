/**
 * Created by mackxu on 2017/6/10.
 */

import axios from 'axios';

export default {
  getAllContacts () {
    return axios.get('/contacts').then(res => res.data);
  }
}
