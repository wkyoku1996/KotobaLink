import { Button } from 'antd';

import { useAuth } from '../auth/AuthProvider';
import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function StudentsPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  return (
    <ModuleFrame
      eyebrow="Students"
      title={isTeacher ? '我的学员' : '学员管理'}
      summary={
        isTeacher
          ? '教师端只保留和教学执行相关的学员视图，用于查看学员状态、课程进度、请假记录和反馈情况。'
          : '学员管理模块会承载档案、课程进度、会员状态、成长记录和消息触达。当前先展示后台模块框架。'
      }
      metrics={[
        { label: isTeacher ? '负责学员' : '活跃学员', value: isTeacher ? '42' : '286' },
        { label: isTeacher ? '待反馈作业' : '待跟进', value: isTeacher ? '8' : '31' },
        { label: isTeacher ? '本周请假' : '会员学员', value: isTeacher ? '5' : '124' },
      ]}
    >
      <PageToolbar
        title={isTeacher ? '学员视图与教学筛选' : '学员列表与标签筛选'}
        description={
          isTeacher
            ? '教师可以查看自己相关学员，并处理教学跟进、请假记录和作业反馈；不能新建学员档案。'
            : '现在只统一学员模块的页面结构，后续再接搜索、标签筛选和详情抽屉。'
        }
        actions={
          isTeacher ? (
            <>
              <Button>请假记录</Button>
              <Button type="primary">作业反馈</Button>
            </>
          ) : (
            <>
              <Button>批量标签</Button>
              <Button type="primary">新建学员档案</Button>
            </>
          )
        }
      />
      <PlaceholderBoard
        title={isTeacher ? '负责学员列表' : '学员列表'}
        description={
          isTeacher
            ? '后续这里会接我的学员、课程进度、请假状态和作业处理。'
            : '后续这里会接搜索、标签过滤、详情抽屉和批量操作。'
        }
        columns={isTeacher ? ['姓名', '等级', '当前课程', '作业', '请假状态'] : ['姓名', '等级', '当前课程', '会员', '状态']}
        rows={
          isTeacher
            ? [
                ['Yamada Aki', 'N4', 'Conversation Foundations', '待批改', '正常'],
                ['Chen Lin', 'N3', 'JLPT Sprint', '已反馈', '请假中'],
                ['Wang Mei', 'N5', 'Starter Pack', '待提交', '正常'],
              ]
            : [
                ['Yamada Aki', 'N4', 'Conversation Foundations', 'Active', 'Learning'],
                ['Chen Lin', 'N3', 'JLPT Sprint', 'Inactive', 'Paused'],
                ['Wang Mei', 'N5', 'Starter Pack', 'Active', 'New'],
              ]
        }
      />
      <ModuleRoadmap
        items={
          isTeacher
            ? [
                '我的学员详情与学习记录',
                '作业查看、批改与评分反馈',
                '请假记录与调课申请',
                '课后教学备注归档',
              ]
            : [
                '学员详情页与成长记录',
                '报名课程与服务状态',
                '会员续费跟进',
                '消息触达与标签分群',
              ]
        }
      />
    </ModuleFrame>
  );
}
