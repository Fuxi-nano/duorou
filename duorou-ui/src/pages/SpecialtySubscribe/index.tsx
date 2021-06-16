import { message } from 'antd';
import React, { useState, useRef,useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { listStudentSpecialty,subscribe,ListItem } from '@/services/StudentSpecialty';
import { queryCampus,CampusListItem } from '@/services/campus';


const ClassList: React.FC = () => {

  const actionRef = useRef<ActionType>();

  //const [setSelectedRows] = useState<ListItem[]>([]);

  const [campusList, setCampusList] = useState<CampusListItem[]>([]);

  useEffect(() => {
    queryCampus().then(res =>{
      setCampusList(res.data);
    })
    }, 
  []);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<ListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.class.specialty.name"
          defaultMessage="specialty name"
        />
      ),
      dataIndex: 'specialtyId',
      hideInTable: true,
    },
    {
      title: (
        <FormattedMessage
          id="pages.specialty.subscribe.student.name"
          defaultMessage="student name"
        />
      ),
      dataIndex: 'studentName',
    },
    {
      title: (
        <FormattedMessage
          id="pages.class.specialty.name"
          defaultMessage="specialty name"
        />
      ),
      dataIndex: 'specialtyName',
      //tip: 'The rule name is the unique key',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.class.campus.name" defaultMessage="campus name" />,
      dataIndex: 'campusId',
      valueType:'select',
      fieldProps: {
         options: campusList.map((campus) => ({ label: campus.name, value: campus.id })),
      },
    },
    {
      title: <FormattedMessage id="pages.class.term.name" defaultMessage="term name" />,
      dataIndex: 'termId',
      valueEnum: {
        0: {
          text: '春季', 
        },
        1: {
          text: '暑期',
        },
        2: {
          text: '秋季',
        },
        3: {
          text: '寒假',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.class.right.time" defaultMessage="right.time" />,
      dataIndex: 'rightTime',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="subscribe"
          onClick={async () => {
            const response=await subscribe({
              id: record.id,
            });
            if (response.status === 'ok') {
              message.success('successfully and will refresh soon');
              //setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }else{
              message.error('subscribe error');
            }
          }}
        >
          <FormattedMessage id="pages.specialty.cancel.subscribe" defaultMessage="cancel subscribe" />
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<ListItem>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={() => listStudentSpecialty().then(res =>{
          const result = {
            data:res.data,
            success:true
          }
          return result
        })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default ClassList;
