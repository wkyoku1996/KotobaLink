import { Button } from 'antd';

import { useAuth } from '../auth/AuthProvider';
import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function ClassesPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  return (
    <ModuleFrame
      eyebrow="Classes"
      title={isTeacher ? '我的班级' : '班级管理'}
      summary={
        isTeacher
          ? '教师端班级页预留给查看本人负责班级、学员构成、课次安排和课堂跟进。当前先固定教学班级页框架。'
          : '班级管理模块预留给班级编排、学员归班、教师关联和班级状态维护。当前先固定后台结构。'
      }
      metrics={[
        { label: isTeacher ? '负责班级' : '活跃班级', value: isTeacher ? '4' : '16' },
        { label: isTeacher ? '本周课次' : '待开班', value: isTeacher ? '12' : '5' },
        { label: isTeacher ? '班级学员' : '待调整', value: isTeacher ? '38' : '3' },
      ]}
    >
      <PageToolbar
        title={isTeacher ? '班级视图与教学跟进' : '班级编排与资源视图'}
        description={
          isTeacher
            ? '教师可查看自己负责班级的学员、课次和课堂状态，不提供全局建班入口。'
            : '先把班级页的筛选、动作和白板结构固定下来，后续再接真实班级编排和归班操作。'
        }
        actions={
          isTeacher ? (
            <>
              <Button>查看班级成员</Button>
              <Button type="primary">进入班级详情</Button>
            </>
          ) : (
            <>
              <Button>导出班级表</Button>
              <Button type="primary">新建班级</Button>
            </>
          )
        }
      />
      <PlaceholderBoard
        title={isTeacher ? '我的班级列表' : '班级列表'}
        description={
          isTeacher
            ? '后续会接班级详情、学员名单、课次记录和课堂协作入口。'
            : '后续会接班级详情、归班操作、教师关联和班级状态流转。'
        }
        columns={['班级', '课程', '教师', '学员数', '状态']}
        rows={
          isTeacher
            ? [
                ['Evening A', 'Conversation Foundations', '我', '12', '进行中'],
                ['Weekend B', 'JLPT Sprint', '我', '8', '进行中'],
                ['Corporate 1', 'Business Speaking', '我', '5', '待上课'],
              ]
            : [
                ['Evening A', 'Conversation Foundations', 'Sato', '12', '进行中'],
                ['Sprint B', 'JLPT Sprint', 'Takeda', '8', '待开班'],
                ['Starter C', 'Starter Pack', 'Mori', '15', '待调整'],
              ]
        }
      />
      <ModuleRoadmap
        items={
          isTeacher
            ? [
                '班级详情与成员视图',
                '课次安排与课堂跟进',
                '班级请假与补课记录',
                '班级维度作业与反馈',
              ]
            : [
                '班级编排与归班操作',
                '教师与课程关联',
                '班级状态流转',
                '班级维度排课协同',
              ]
        }
      />
    </ModuleFrame>
  );
}
