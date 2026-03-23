import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function OrdersPage() {
  return (
    <ModuleFrame
      eyebrow="Orders"
      title="订单中心"
      summary="这里预留给课程订单、会员订单、退款和支付异常处理。先搭可扩展页面结构，不落真实业务表单。"
      metrics={[
        { label: '今日成交', value: '14' },
        { label: '异常支付', value: '2' },
        { label: '退款申请', value: '5' },
      ]}
    >
      <PageToolbar
        title="订单查询与售后工作区"
        description="统一为后台列表页保留操作栏位置，后续再填真实筛选器、导出和售后动作。"
        actions={
          <>
            <Button>导出账单</Button>
            <Button type="primary">创建工单</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="订单总览表"
        description="后续会接订单筛选、状态标签、详情抽屉和售后动作。"
        columns={['订单号', '业务类型', '金额', '支付状态', '售后']}
        rows={[
          ['ORD-240323-01', 'Course', 'JPY 19,800', 'Paid', 'Closed'],
          ['ORD-240323-02', 'Membership', 'JPY 9,800', 'Pending', 'Open'],
          ['ORD-240323-03', 'Course', 'JPY 24,800', 'Refunding', 'Review'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '支付状态对账',
          '退款审批流',
          '优惠券与活动价归因',
          '订单详情与支付流水',
        ]}
      />
    </ModuleFrame>
  );
}
