import React, { useState,useEffect } from 'react';
import { Modal } from 'antd';
import {
  ProFormSelect,
  ProFormText,
  StepsForm,
  ProFormCheckbox,
} from '@ant-design/pro-form';
import { useIntl } from 'umi';

import {SpecialtyListItem } from '@/services/specialty';
import { queryCampus,CampusListItem } from '@/services/campus';
import { queryStudent,StudentItem } from '@/services/student';

export type FormValueType = {
  id?:number;
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<SpecialtyListItem>;

export type SpecialtyFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  subscribeModalVisible: boolean;
  values: Partial<SpecialtyListItem>;
};

const SpecialtyForm: React.FC<SpecialtyFormProps> = (props) => {
  const [campusList, setCampusList] = useState<CampusListItem[]>([]);
  const [studentList, setStudentList] = useState<StudentItem[]>([]);

  useEffect(() => {
    queryCampus().then(data =>{
      setCampusList(data);
    })
    queryStudent().then(data =>{
      setStudentList(data);
    })
    }, 
  []);
  const intl = useIntl();
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={640}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.specialtyForm.subscribe',
              defaultMessage: '订阅设置',
            })}
            visible={props.subscribeModalVisible}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          name: props.values.name,
          desc: props.values.attitudes,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="name"
          label={intl.formatMessage({
            id: 'pages.searchTable.specialtyForm.name',
            defaultMessage: '课程名称',
          })}
          width="md"
          disabled
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          campusId: '2',
          template: '0',
        }}
        title="选择范围"
      >
        <ProFormSelect
          name="campusId"
          width="md"
          label="报名区域"
          fieldProps={{
            options:campusList.map((campus) => ({ label: campus.name, value: campus.id })),
          }}
          rules={[
            {
              required: true,
              message: "请选择报名区域",
            },
          ]}
        />
        <ProFormSelect
          name="termId"
          width="md"
          label="学期"
          valueEnum={{
            0: '春季',
            1: '暑期',
            2: '秋季',
            3: '寒假',
          }}
          rules={[
            {
              required: true,
              message: "请选择学期",
            },
          ]}
        />
        <ProFormCheckbox.Group
          name="rightTime"
          label="时间"
          options={['周一', '周二', '周三','周四','周五','周六','周日']}
          rules={[
            {
              required: true,
              message: "请选择时间",
            },
          ]}
        />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        title="选择学生"
      >
        <ProFormSelect
          name="studentId"
          label="学生"
          width="md"
          fieldProps={{
            options:studentList.map((student) => ({ label: student.name, value: student.id })),
          }}
          rules={[
            {
              required: true,
              message: "请选择学生",
            },
          ]}
        />
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default SpecialtyForm;
