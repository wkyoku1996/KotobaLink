import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function LeaveAdjustmentsPage() {
  return (
    <ModuleFrame
      eyebrow="Leave"
      title="请假调课"
      summary="教师端请假调课模块预留给学员请假确认、补课建议、调课记录和回执协作。当前先固定教学协作框架。"
      metrics={[
        { label: '待处理请假', value: '5' },
        { label: '待确认调课', value: '3' },
        { label: '本周补课', value: '2' },
      ]}
    >
      <PageToolbar
        title="请假与调课处理台"
        description="先把教师端请假调课页的工具栏和任务结构搭好，后续再接真实审批和协同流转。"
        actions={
          <>
            <Button>查看补课建议</Button>
            <Button type="primary">处理申请</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="请假调课列表"
        description="后续会接请假明细、调课建议、补课安排和学员通知记录。"
        columns={['学员', '课程', '申请类型', '时间', '状态']}
        rows={[
          ['Chen Lin', 'JLPT Sprint', '请假', 'Tue 19:00', '待确认'],
          ['Yamada Aki', 'Conversation Foundations', '调课', 'Thu 19:30', '处理中'],
          ['Wang Mei', 'Starter Pack', '补课', 'Sat 10:00', '已安排'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '请假申请详情与回执',
          '补课建议与调课方案',
          '调课通知联动',
          '课次变更记录归档',
        ]}
      />
    </ModuleFrame>
  );
}
