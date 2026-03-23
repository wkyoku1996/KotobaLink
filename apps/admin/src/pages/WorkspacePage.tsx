import { Button } from 'antd';

import { useAuth } from '../auth/AuthProvider';
import { ModuleFrame } from '../components/ModuleFrame';
import { ModuleRoadmap } from '../components/ModuleRoadmap';
import { PageToolbar } from '../components/PageToolbar';
import { PlaceholderBoard } from '../components/PlaceholderBoard';


export function WorkspacePage() {
  const { user } = useAuth();
  const role = user?.role ?? 'super_admin';
  const isTeacher = role === 'teacher';
  const isSuperAdmin = role === 'super_admin';

  return (
    <ModuleFrame
      eyebrow="Workspace"
      title={isTeacher ? '教师工作台' : isSuperAdmin ? '系统治理台' : '运营工作台'}
      summary={
        isTeacher
          ? '这是教师总览之外的教学工作台，用来承载作业、请假、课后反馈和课堂相关待办。现在先把信息结构搭好。'
          : isSuperAdmin
            ? '这是超级管理员视角下的治理工作台，用来承载配置审查、权限复核、系统治理和跨模块规则确认。现在先把信息结构搭好。'
            : '这是后台首页之外的管理工作台，用来承载待办、异常处理、审核队列和跨模块联动视图。现在先把信息结构搭好。'
      }
      metrics={[
        { label: '待处理事项', value: isTeacher ? '9' : isSuperAdmin ? '11' : '18' },
        { label: isSuperAdmin ? '治理检查项' : '本周开课', value: isSuperAdmin ? '7' : '12' },
        { label: isTeacher ? '待反馈课次' : isSuperAdmin ? '权限变更' : '异常订单', value: isTeacher ? '4' : isSuperAdmin ? '2' : '3' },
      ]}
    >
      <PageToolbar
        title={isTeacher ? '教学任务入口' : isSuperAdmin ? '治理任务入口' : '跨模块工作流入口'}
        description={
          isTeacher
            ? '教师工作台先体现教学待办、请假处理和反馈动作的结构，后续再承接真实任务。'
            : isSuperAdmin
              ? '治理台先体现系统级待办、权限复核和配置调整的结构，后续再承接真实治理任务。'
              : '工作台页先体现后台系统的工具条结构，后续再承接真实审核、待办和异常任务。'
        }
        actions={
          isTeacher ? (
            <>
              <Button>筛选课次</Button>
              <Button type="primary">查看作业</Button>
            </>
          ) : isSuperAdmin ? (
            <>
              <Button>审查权限</Button>
              <Button type="primary">查看配置</Button>
            </>
          ) : (
            <>
              <Button>筛选任务</Button>
              <Button type="primary">创建待办</Button>
            </>
          )
        }
      />
      <PlaceholderBoard
        title={isTeacher ? '今日教学待办' : isSuperAdmin ? '今日治理待办' : '今日待办'}
        description={
          isTeacher
            ? '后续会接作业、请假和课堂反馈任务。'
            : isSuperAdmin
              ? '后续会接权限审批、配置审查和系统治理任务。'
              : '后续会接工单、审核和异常跟进任务。'
        }
        columns={['任务', '负责人', '优先级', '状态']}
        rows={
          isTeacher
            ? [
                ['Conversation Foundations 作业批改', '我', 'High', 'Pending'],
                ['Chen Lin 请假确认', '我', 'Medium', 'In Review'],
                ['Evening A 课后反馈补录', '我', 'High', 'Open'],
              ]
            : isSuperAdmin
              ? [
                  ['角色权限矩阵复核', '平台管理员', 'High', 'Pending'],
                  ['系统通知模板审查', '平台管理员', 'Medium', 'In Review'],
                  ['字典配置变更确认', '平台管理员', 'High', 'Open'],
                ]
            : [
                ['会员续费跟进', '运营 A', 'High', 'Pending'],
                ['课程发布复核', '教务 B', 'Medium', 'In Review'],
                ['支付异常回访', '客服 C', 'High', 'Open'],
              ]
        }
      />
      <ModuleRoadmap
        items={
          isTeacher
            ? [
                '作业批改面板',
                '请假与调课处理',
                '课后反馈补录提醒',
                '教学通知与学员回执',
              ]
            : isSuperAdmin
              ? [
                  '角色权限矩阵',
                  '全局配置与字典治理',
                  '服务健康与环境状态',
                  '系统模板与策略审查',
                ]
            : [
                '异常订单处理面板',
                '教师排班冲突提醒',
                '活动报名审核队列',
                '消息模板审批流',
              ]
        }
      />
    </ModuleFrame>
  );
}
