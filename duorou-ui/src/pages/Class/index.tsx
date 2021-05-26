import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef,useEffect } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { ClassListItem} from './data.d';
import { queryRule, updateRule, addRule, removeRule,subscribeClass } from './service';
import { queryCampus,CampusListItem } from '@/services/campus';
import { querySpecialty,SpecialtyListItem } from '@/services/specialty';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: ClassListItem) => {
  const hide = message.loading('Adding');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.descript,
      key: fields.id,
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
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<ClassListItem>();
  const [selectedRowsState, setSelectedRows] = useState<ClassListItem[]>([]);

  const [specialtyList, setSpecialtyList] = useState<SpecialtyListItem[]>([]);
  const [campusList, setCampusList] = useState<CampusListItem[]>([]);

  useEffect(() => {
    querySpecialty().then(data =>{
      setSpecialtyList(data);
    })
    queryCampus().then(data =>{
      setCampusList(data);
    })
    }, 
  []);

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
      valueType:'select',
      fieldProps: {
         options: specialtyList.map((specialty) => ({ label: specialty.name, value: specialty.id })),
      },
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
      hideInSearch:true,
    },
    {
      title: <FormattedMessage id="pages.class.age.limit" defaultMessage="age limit" />,
      dataIndex: 'ageLimit',
      hideInSearch:true,
      renderText: (text, record) => {
        return record.minAge+'~'+record.maxAge
      },
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
      valueType:'select',
      fieldProps: {
         options: campusList.map((campus) => ({ label: campus.name, value: campus.id })),
      },
    },
    {
      title: <FormattedMessage id="pages.class.subject.desc" defaultMessage="subject desc" />,
      hideInSearch:true,
      renderText: (text, record) => {
        return record.weekday+record.classStartTime+'-'+record.classEndTime;
      },
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
      title: '班级名称',
      dataIndex: 'name',
    },
    {
      title: '专业程度',
      dataIndex: 'degreeName',
    },
    {
      title: '招生性质',
      dataIndex: 'stuTypeName',
    },
    {
      title: <FormattedMessage id="pages.class.age.limit" defaultMessage="age limit" />,
      renderText: (text, record) => {
        return record.minAge+'~'+record.maxAge
      },
    },
    {
      title: '课次',
      dataIndex: 'times',
    },
    {
      title: '报名区域',
      dataIndex: 'campusName',
    },
    {
      title: '开课时间',
      dataIndex: 'beginTime',
    },
    {
      title: '结课时间',
      dataIndex: 'endTime',
    },
    {
      title: '学期',
      dataIndex: 'termName',
    },
    {
      title: '教师',
      dataIndex: 'teacherName',
    },
    {
      title: '上课课表',
      dataIndex: 'subject',
    },
    {
      title: '班级描述',
      dataIndex: 'descript',
    },
    
  ];

  return (
    <PageContainer>
      <ProTable<ClassListItem>
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
          (params, sorter, filter) => queryRule({ ...params, sorter, filter }).then(res =>{
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
        // params={{
        //   id:2,
        // }}
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
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as ClassListItem);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

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
