import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function TeachersPage() {
  return (
    <ModuleFrame
      eyebrow="Teachers"
      title="教师管理"
      summary="教师模块会管理档案、可授课程、排课资源和授课反馈。当前优先把后台的信息架构搭出来。"
      metrics={[
        { label: '教师总数', value: '18' },
        { label: '本周授课', value: '11' },
        { label: '待排班', value: '4' },
      ]}
    >
      <PageToolbar
        title="教师资源与排班筛选"
        description="这里预留给教师资源查询、可授课程过滤和排班动作栏。"
        actions={
          <>
            <Button>导出教师表</Button>
            <Button type="primary">新增教师</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="教师资源池"
        description="后续会接排班可视图、可授课程和评价追踪。"
        columns={['教师', '可授方向', '本周课时', '状态']}
        rows={[
          ['Sato Sensei', 'Conversation / Beginner', '8', 'Available'],
          ['Takeda Sensei', 'JLPT / Exam', '10', 'Busy'],
          ['Mori Sensei', 'Business Japanese', '5', 'Available'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '教师档案与资质',
          '可授课程配置',
          '排课冲突检测',
          '课后反馈归档',
        ]}
      />
    </ModuleFrame>
  );
}
