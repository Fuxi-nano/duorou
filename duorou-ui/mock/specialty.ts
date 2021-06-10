import { Request, Response } from 'express';
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // GET POST 可省略
  'GET /api/specialty/list': {"data":[
    {
      name: '篮球',
      id: '1',
    },
    {
      name: '足球',
      id: '2',
    },
    {
      name: '乒乓球',
      id: '3',
    },
  ]},
  'POST /api/specialty/subscribe': (req: Request, res: Response) => {
    res.send({ status: 'ok'});
  },
  'POST /api/specialty/page': (req: Request, res: Response) => {
    res.send(
      {
        "code": 200, 
        "status": "ok", 
        "success": true, 
        "message": "success", 
        "data": {
            "records": [
                {
                    "id": "177659", 
                    "createDate": "2021-05-22 20:07:19", 
                    "modifyDate": "2021-05-22 20:07:19", 
                    "name": "11111", 
                    "tels": "2131231231", 
                    "abilitys": "68",
                    "attitudes":"131231231" 
                  }
            ], 
            "total": "1", 
            "size": "10", 
            "current": "1", 
            "orders": [ ], 
            "specialtyId": null, 
            "termId": null, 
            "campusId": null, 
            "birthday": null, 
            "searchCount": true, 
            "pages": "1"
        }, 
        "serverTime": "1621776700967"
    }
    
    );
  },
};
