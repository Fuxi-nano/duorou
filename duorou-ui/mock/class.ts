import { Request, Response } from 'express';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'POST /api/class/subscribe': (req: Request, res: Response) => {
    res.send({ status: 'ok'});
  },
  'POST /api/class/page': (req: Request, res: Response) => {
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
                    "tels": null, 
                    "specialtyId": "68", 
                    "specialtyName": "3123123", 
                    "campusId": 6, 
                    "campusName": "31231231", 
                    "classTime": 60, 
                    "maxAge": "2016-08-31", 
                    "minAge": "2015-09-01", 
                    "teacherName": "312313", 
                    "termName": "春季", 
                    "termId": 0, 
                    "times": 22, 
                    "year": 2021, 
                    "beginTime": "2020-11-20", 
                    "endTime": "2021-06-04", 
                    "sexType": 0, 
                    "stuTypeName": "招新生", 
                    "subject": "周五 15:10-16:10 ", 
                    "weekday": "周五", 
                    "classStartTime": "23:10", 
                    "classEndTime": "00:10", 
                    "degreeName": "启蒙", 
                    "descript": "dadada" }
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
