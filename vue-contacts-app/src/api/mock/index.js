/**
 * Created by mackxu on 2017/6/10.
 */
import Mock from 'mockjs';

Mock.mock('/contacts', {
  data: [
    {name: 'zhangsan', email: 'ddswdfff@nfkd.com'},
    {name: 'lisi', email: 'y482y49@ggg.com'},
    {name: 'wanger', email: 'fkngkdl@kkk.com'},
    {name: 'laoli', email: '492nkjrj@sdsd.com'},
  ]
});

export default Mock;
