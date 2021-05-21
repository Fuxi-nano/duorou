import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef,useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { ClassListItem } from './data';
import { queryRule, removeRule,subscribeClass } from './service';


/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: ClassListItem[]) => {
  const hide = message.loading('Deleting');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.id),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const ClassList: React.FC = () => {

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ClassListItem>();
  const [selectedRowsState, setSelectedRows] = useState<ClassListItem[]>([]);

  const [specialtyList, setSpecialtyList] = useState<{}>({});

  const [campusList, setCampusList] = useState<{}>({});

  useEffect(() => {
    fetch('/api/specialty/list')
    .then(response => response.json())
    .then(data => {
      setSpecialtyList(JSON.parse(JSON.stringify(data)));
    });
  }, []);

  useEffect(() => {
    fetch('/api/campus/list')
    .then(response => response.json())
    .then(data => {
      setCampusList(JSON.parse(JSON.stringify(data)));
    });
  }, []);

  // const request = async () => [
  //   { label: '全部', value: 'all' },
  //   { label: '未解决', value: 'open' },
  //   { label: '已解决', value: 'closed' },
  //   { label: '解决中', value: 'processing' },
  // ];

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<ClassListItem>[] = [
    {
      title: (
        <FormattedMessage
          id="pages.class.specialty.name"
          defaultMessage="specialty name"
        />
      ),
      dataIndex: 'specialtyId',
      hideInTable: true,
      valueEnum: specialtyList
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
      title: <FormattedMessage id="pages.class.degree.name" defaultMessage="degree name" />,
      dataIndex: 'degreeName',
      //request,
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.class.class.name" defaultMessage="class name" />,
      dataIndex: 'name',
      hideInSearch:true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.class.campus.name" defaultMessage="campus name" />,
      dataIndex: 'campusId',
      valueEnum: campusList
    },
    {
      title: <FormattedMessage id="pages.class.subject.desc" defaultMessage="subject desc" />,
      dataIndex: 'subjectDesc',
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.class.tels" defaultMessage="tels" />,
      dataIndex: 'tels',
      hideInSearch:true,
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
      title: '生日',
      dataIndex: 'birthday',
      valueType: 'date',
      hideInTable: true,
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="subscribe"
          onClick={async () => {
            const response=await subscribeClass({
              id: record.id,
            });
            if (response.status === 'ok') {
              message.success('successfully and will refresh soon');
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }else{
              message.error('subscribe error');
            }
          }}
        >
          <FormattedMessage id="pages.class.subscribe" defaultMessage="subscribe" />
        </a>,
      ],
    },
  ];

  const detailColumns: ProColumns<ClassListItem>[] = [
    {
      title: '班级描述',
      dataIndex: 'descript',
    },
  ];

  return (
    <PageContainer>
      <ProTable<ClassListItem>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
              &nbsp;&nbsp;
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}
      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<ClassListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={detailColumns as ProDescriptionsItemProps<ClassListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ClassList;
