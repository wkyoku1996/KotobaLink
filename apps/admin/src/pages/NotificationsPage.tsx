import { Button } from 'antd';

import { useAuth } from '../auth/AuthProvider';
import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function NotificationsPage() {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher';

  return (
    <ModuleFrame
      eyebrow="Notifications"
      title="消息通知"
      summary={
        isTeacher
          ? '教师端的消息中心主要承载教学提醒、学员通知和待处理事项，不提供全局消息运营入口。'
          : '消息中心预留给模板管理、消息列表、发送记录和触达策略。当前只展示框架和版式。'
      }
      metrics={[
        { label: isTeacher ? '教学提醒' : '模板数', value: isTeacher ? '7' : '12' },
        { label: isTeacher ? '待处理' : '待发送', value: isTeacher ? '3' : '5' },
        { label: isTeacher ? '学员回执' : '今日触达', value: isTeacher ? '14' : '168' },
      ]}
    >
      <PageToolbar
        title={isTeacher ? '教学通知与待办提醒' : '消息模板与发送队列'}
        description={
          isTeacher
            ? '教师只查看和处理与本人教学相关的通知，不提供全局模板和群发创建。'
            : '先固定消息模块的操作区和筛选结构，后续再接模板、队列和统计。'
        }
        actions={
          isTeacher ? (
            <>
              <Button>学员回执</Button>
              <Button type="primary">查看待办</Button>
            </>
          ) : (
            <>
              <Button>查看模板</Button>
              <Button type="primary">新建通知</Button>
            </>
          )
        }
      />
      <PlaceholderBoard
        title={isTeacher ? '教学通知列表' : '通知队列'}
        description={
          isTeacher
            ? '后续会接上课提醒、请假回执、作业待办和反馈通知。'
            : '后续会接模板筛选、发送详情和人群定向。'
        }
        columns={isTeacher ? ['消息', '对象', '时间', '状态'] : ['消息', '目标人群', '发送时间', '状态']}
        rows={
          isTeacher
            ? [
                ['课前提醒', 'Evening A', 'Today 18:00', '待确认'],
                ['学员请假申请', 'Chen Lin', 'Today 16:20', '待处理'],
                ['作业反馈提醒', 'Yamada Aki', 'Sent', '已送达'],
              ]
            : [
                ['课程开课提醒', 'Evening A', 'Today 18:00', 'Scheduled'],
                ['会员续费提醒', 'Active Members', 'Today 20:00', 'Draft'],
                ['活动报名确认', 'Spring Meetup', 'Sent', 'Delivered'],
              ]
        }
      />
      <ModuleRoadmap
        items={
          isTeacher
            ? [
                '教学提醒与课前通知',
                '请假申请回执处理',
                '作业与反馈提醒',
                '学员消息送达记录',
              ]
            : [
                '消息模板管理',
                '批量发送队列',
                '定向人群选择',
                '消息送达统计',
              ]
        }
      />
    </ModuleFrame>
  );
}
