import { Button } from 'antd';

import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function SchedulePage() {
  return (
    <ModuleFrame
      eyebrow="Schedule"
      title="排课中心"
      summary="排课中心会连接课程、班级、教师和教室资源。当前先给出后台信息结构与日历型模块入口。"
      metrics={[
        { label: '本周课次', value: '42' },
        { label: '冲突提醒', value: '2' },
        { label: '待确认', value: '7' },
      ]}
    >
      <PageToolbar
        title="排课筛选与周视图入口"
        description="先把排课页统一成后台列表+筛选结构，后续再上日历和拖拽排班。"
        actions={
          <>
            <Button>冲突检查</Button>
            <Button type="primary">创建排课</Button>
          </>
        }
      />
      <PlaceholderBoard
        title="本周排课板"
        description="后续会切成周视图、班级视图和教师视图。"
        columns={['日期', '班级', '教师', '教室', '状态']}
        rows={[
          ['Tue 19:30', 'Evening A', 'Sato', 'Room A', 'Confirmed'],
          ['Thu 19:30', 'Evening A', 'Sato', 'Room A', 'Confirmed'],
          ['Sat 10:00', 'Sprint B', 'Takeda', 'Room B', 'Pending'],
        ]}
      />
      <ModuleRoadmap
        items={[
          '周视图与月视图切换',
          '排课冲突高亮',
          '教师资源锁定',
          'lesson 生成与同步',
        ]}
      />
    </ModuleFrame>
  );
}
