import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function AssignmentsPage() {
  return (
    <ModuleFrame
      eyebrow="Assignments"
      title="作业反馈"
      summary="教师端作业反馈模块预留给作业发布、批改、评分、评语和学员回执。当前先固定页面结构和信息分区。"
      metrics={[
        { label: '待批改', value: '18' },
        { label: '待评分', value: '6' },
        { label: '已反馈', value: '24' },
      ]}
    >
      <PageToolbar
        title="作业批改与评分视图"
        description="先把教师端作业页的操作栏、筛选区和列表白板固定下来，后续再接真实批改能力。"
        actions={
          <>
            <Button>筛选班级</Button>
            <Button type="primary">查看待批改</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="作业列表"
        description="后续会接提交详情、评分项、评语模板和学员回执。"
        columns={['作业', '班级', '提交数', '状态', '反馈']}
        rows={[
          ['Lesson 04 Homework', 'Evening A', '12', '待批改', '待发送'],
          ['JLPT Reading Set', 'Weekend B', '8', '评分中', '草稿'],
          ['Speaking Reflection', 'Corporate 1', '5', '已完成', '已送达'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '作业提交详情与附件',
          '评分规则与评语模板',
          '学员反馈回执',
          '课堂任务与作业联动',
        ]}
      />
    </ModuleFrame>
  );
}
