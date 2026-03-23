import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function LessonRecordsPage() {
  return (
    <ModuleFrame
      eyebrow="Lessons"
      title="课堂记录"
      summary="教师端课堂记录模块预留给课次状态、课堂笔记、学员表现和课后反馈。当前先固定教学记录页框架。"
      metrics={[
        { label: '本周课次', value: '12' },
        { label: '待补录记录', value: '4' },
        { label: '已完成反馈', value: '8' },
      ]}
    >
      <PageToolbar
        title="课次记录与课后反馈"
        description="先把课堂记录页的筛选、动作和列表白板固定下来，后续再接真实记录和反馈表单。"
        actions={
          <>
            <Button>查看本周课次</Button>
            <Button type="primary">补录记录</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="课堂记录列表"
        description="后续会接课次详情、课堂笔记、学员表现和课后反馈。"
        columns={['课次', '班级', '教师', '课堂状态', '记录']}
        rows={[
          ['2026-03-24 19:00', 'Evening A', '我', '已上课', '待补录'],
          ['2026-03-26 19:30', 'Evening A', '我', '已上课', '已完成'],
          ['2026-03-28 10:00', 'Weekend B', '我', '待上课', '未开始'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '课次详情与课堂笔记',
          '学员表现与反馈模板',
          '课后作业联动',
          '补录与回溯记录',
        ]}
      />
    </ModuleFrame>
  );
}
