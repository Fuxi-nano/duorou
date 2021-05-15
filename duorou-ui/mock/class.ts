import { Request, Response } from 'express';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'POST /api/class/subscribe': (req: Request, res: Response) => {
    res.send({ status: 'error'});
  },
};
