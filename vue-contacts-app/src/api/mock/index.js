/**
 * Created by mackxu on 2017/6/10.
 */
import Mock from 'mockjs';

Mock.mock('/contacts', {
  'contacts|5-10': [
    {
      'id|+1': 1,
      name: '@name',
      email: '@EMAIL'
    }
  ]
});

export default Mock;
