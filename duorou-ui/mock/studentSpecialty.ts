import { Request, Response } from 'express';
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // GET POST 可省略
  'GET /api/student_specialty/list': {
    "code": 200,
    "status": "ok",
    "success": true,
    "message": "success",
    "data": [
      {
        "id": "22",
        "createDate": "2021-06-07 05:37:16",
        "modifyDate": "2021-06-07 05:37:20",
        "studentId": "7",
        "studentName": "7号",
        "userId": "1",
        "specialtyId": "31",
        "specialtyName": "游泳",
        "campusId": 6,
        "termId": 2,
        "rightTime": null,
        "classIds": null,
        "isEnable": true
      }
    ],
    "serverTime": "1623843818861"
  },
  'POST /api/specialty/cancel_subscribe': (req: Request, res: Response) => {
    res.send({ status: 'ok'});
  },
};
