import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef,useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { FormValueType } from './components/SubscribeForm';
import SubscribeForm from './components/SubscribeForm';
import { querySpecialty,subscribe,SpecialtyListItem } from '@/services/specialty';

const handleSubscribe = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await subscribe({
      id: fields.id,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

const ClassList: React.FC = () => {
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [subscribeModalVisible, handleSubscribeModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SpecialtyListItem>();
  const [selectedRowsState, setSelectedRows] = useState<SpecialtyListItem[]>([]);
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<SpecialtyListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.class.specialty.name"
          defaultMessage="specialty name"
        />
      ),
      dataIndex: 'name',
    },
    {
      title: <FormattedMessage id="pages.class.tels" defaultMessage="tels" />,
      dataIndex: 'tels',
      hideInSearch:true,
    },
    {
      title: '能力特征',
      dataIndex: 'abilitys',
      hideInSearch: true,
    },
    {
      title: '目标特征',
      dataIndex: 'attitudes',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="subscribe"
          onClick={() => {
            handleSubscribeModalVisible(true);
            setCurrentRow(record);
          }}
        >
          <FormattedMessage id="pages.specialty.subscribe" defaultMessage="subscribe" />
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<SpecialtyListItem>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // 新增按钮
          // <Button
          //   type="primary"
          //   key="primary"
          //   onClick={() => {
          //     handleModalVisible(true);
          //   }}
          // >
          //   <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          // </Button>,
        ]}
        request={
          (params, sorter, filter) => querySpecialty({ ...params, sorter, filter }).then(res =>{
            const result = {
              data:res.data.records,
              total:res.data.total,
              success:res.success,
              pageSize:res.data.size,
              current:res.data.current
            }
            return result
          })
        }
        columns={columns}
      />
      <SubscribeForm
        onSubmit={async (value) => {
          const success = await handleSubscribe(value);
          if (success) {
            handleSubscribeModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleSubscribeModalVisible(false);
          setCurrentRow(undefined);
        }}
        subscribeModalVisible={subscribeModalVisible}
        values={currentRow || {}}
      />
    </PageContainer>
  );
};

export default ClassList;