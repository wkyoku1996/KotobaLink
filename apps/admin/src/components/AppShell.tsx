import {
  AppstoreOutlined,
  CheckCircleOutlined,
  BellOutlined,
  CalendarOutlined,
  CodeOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  DownOutlined,
  EditOutlined,
  GlobalOutlined,
  FileTextOutlined,
  FormOutlined,
  HddOutlined,
  IdcardOutlined,
  KeyOutlined,
  MenuFoldOutlined,
  NotificationOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  SearchOutlined,
  SettingOutlined,
  TeamOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Breadcrumb, Button, Dropdown, Input, Layout, Menu, Space, Tag, Typography, message } from 'antd';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';
import { getRoleLabel } from '../lib/api';


const { Header, Sider, Content } = Layout;
type Role = 'super_admin' | 'ops_admin' | 'teacher';
type NavItem = {
  key: string;
  icon: ReactNode;
  label: string;
  roles: Role[];
};
type NavGroup = {
  key: string;
  label: string;
  children: NavItem[];
};

type ShellRoleConfig = {
  navGroupLabels?: Partial<Record<string, string>>;
  navLabelOverrides?: Partial<Record<string, string>>;
  routeTitleOverrides?: Partial<Record<string, { title: string; section: string }>>;
  brandTitle?: string;
  brandSummary: string;
  headerDescription: string;
  workspaceTag: string;
};

const navGroups: NavGroup[] = [
  {
    key: 'overview',
    label: 'Overview',
    children: [
      { key: '/', icon: <DashboardOutlined />, label: '总览面板', roles: ['super_admin', 'ops_admin', 'teacher'] },
      { key: '/workspace', icon: <AppstoreOutlined />, label: '工作台', roles: ['super_admin', 'ops_admin', 'teacher'] },
    ],
  },
  {
    key: 'teaching',
    label: '教学管理',
    children: [
      { key: '/students', icon: <UserOutlined />, label: '学员管理', roles: ['super_admin', 'ops_admin', 'teacher'] },
      { key: '/teachers', icon: <TeamOutlined />, label: '教师管理', roles: ['super_admin', 'ops_admin'] },
      { key: '/courses', icon: <ReadOutlined />, label: '课程中心', roles: ['super_admin', 'ops_admin', 'teacher'] },
      { key: '/classes', icon: <AppstoreOutlined />, label: '班级管理', roles: ['super_admin', 'ops_admin', 'teacher'] },
      { key: '/materials', icon: <FileTextOutlined />, label: '教材内容', roles: ['super_admin', 'ops_admin', 'teacher'] },
      { key: '/assignments', icon: <FormOutlined />, label: '作业反馈', roles: ['teacher'] },
      { key: '/leave-adjustments', icon: <EditOutlined />, label: '请假调课', roles: ['teacher'] },
      { key: '/lesson-records', icon: <FileTextOutlined />, label: '课堂记录', roles: ['teacher'] },
      { key: '/schedule', icon: <CalendarOutlined />, label: '排课中心', roles: ['super_admin', 'ops_admin'] },
    ],
  },
  {
    key: 'operations',
    label: '运营支持',
    children: [
      { key: '/orders', icon: <CreditCardOutlined />, label: '订单中心', roles: ['super_admin', 'ops_admin'] },
      { key: '/memberships', icon: <IdcardOutlined />, label: '会员体系', roles: ['super_admin', 'ops_admin'] },
      { key: '/activities', icon: <NotificationOutlined />, label: '活动运营', roles: ['super_admin', 'ops_admin'] },
      { key: '/notifications', icon: <BellOutlined />, label: '消息通知', roles: ['super_admin', 'ops_admin', 'teacher'] },
    ],
  },
  {
    key: 'system',
    label: '系统配置',
    children: [
      { key: '/content', icon: <FileTextOutlined />, label: '内容配置', roles: ['super_admin', 'ops_admin'] },
      { key: '/permissions', icon: <KeyOutlined />, label: '权限矩阵', roles: ['super_admin'] },
      { key: '/dictionaries', icon: <AppstoreOutlined />, label: '系统字典', roles: ['super_admin'] },
      { key: '/system-health', icon: <HddOutlined />, label: '环境状态', roles: ['super_admin'] },
      { key: '/settings', icon: <SettingOutlined />, label: '系统设置', roles: ['super_admin'] },
    ],
  },
];

const routeTitles: Record<string, { title: string; section: string }> = {
  '/': { title: '后台总览', section: 'Overview' },
  '/workspace': { title: '统一工作台', section: 'Overview' },
  '/students': { title: '学员管理', section: '教学管理' },
  '/teachers': { title: '教师管理', section: '教学管理' },
  '/courses': { title: '课程中心', section: '教学管理' },
  '/classes': { title: '班级管理', section: '教学管理' },
  '/materials': { title: '教材内容', section: '教学管理' },
  '/materials/library': { title: '教材库', section: '教学管理' },
  '/materials/library/:detail': { title: '教材详情', section: '教学管理' },
  '/materials/units': { title: '单元内容', section: '教学管理' },
  '/materials/units/:detail': { title: '单元详情', section: '教学管理' },
  '/materials/assets': { title: '资源上传', section: '教学管理' },
  '/materials/publish': { title: '发布管理', section: '教学管理' },
  '/assignments': { title: '作业反馈', section: '教学管理' },
  '/leave-adjustments': { title: '请假调课', section: '教学管理' },
  '/lesson-records': { title: '课堂记录', section: '教学管理' },
  '/schedule': { title: '排课中心', section: '教学管理' },
  '/orders': { title: '订单中心', section: '运营支持' },
  '/memberships': { title: '会员体系', section: '运营支持' },
  '/activities': { title: '活动运营', section: '运营支持' },
  '/notifications': { title: '消息通知', section: '运营支持' },
  '/content': { title: '内容配置', section: '系统配置' },
  '/permissions': { title: '权限矩阵', section: '系统配置' },
  '/dictionaries': { title: '系统字典', section: '系统配置' },
  '/system-health': { title: '环境状态', section: '系统配置' },
  '/settings': { title: '系统设置', section: '系统配置' },
};

const teacherNavLabelOverrides: Partial<Record<string, string>> = {
  '/': '教学总览',
  '/workspace': '教师工作台',
  '/students': '我的学员',
  '/courses': '我的课程',
  '/classes': '我的班级',
  '/materials': '教学内容',
  '/materials/library': '教材库',
  '/materials/units': '单元内容',
  '/assignments': '作业反馈',
  '/leave-adjustments': '请假调课',
  '/lesson-records': '课堂记录',
  '/notifications': '教学通知',
};

const roleShellConfigs: Record<Role, ShellRoleConfig> = {
  super_admin: {
    navGroupLabels: {
      overview: '治理总览',
      teaching: '业务域',
      operations: '运营域',
      system: '系统治理',
    },
    navLabelOverrides: {
      '/': '治理总览',
      '/workspace': '系统治理台',
      '/settings': '权限与设置',
    },
    routeTitleOverrides: {
      '/': { title: '治理总览', section: 'Governance' },
      '/workspace': { title: '系统治理台', section: 'Governance' },
      '/settings': { title: '权限与设置', section: '系统治理' },
    },
    brandTitle: 'Governance',
    brandSummary: '超级管理员视角聚焦于权限治理、系统配置、全局指标和跨模块协同边界。',
    headerDescription: '当前先把超级管理员的治理框架、全局导航和权限分区固定下来，后续再接真实系统能力。',
    workspaceTag: 'Governance',
  },
  ops_admin: {
    navGroupLabels: {
      overview: '运营总览',
      teaching: '教学运营',
      operations: '用户运营',
      system: '后台配置',
    },
    navLabelOverrides: {
      '/': '运营 / 教务总览',
      '/workspace': '运营教务工作台',
    },
    routeTitleOverrides: {
      '/': { title: '运营 / 教务总览', section: 'Operations' },
      '/workspace': { title: '运营教务工作台', section: 'Operations' },
    },
    brandTitle: 'Operations',
    brandSummary: '运营和教务先合并在同一套后台框架里，统一覆盖学员、教师、课程、排课、订单和活动协作。',
    headerDescription: '当前先把运营 / 教务一体化后台的模块分区、工作台和页面模板稳定下来，后续再接真实业务能力。',
    workspaceTag: 'Ops / Academic',
  },
  teacher: {
    navGroupLabels: {
      overview: '教学总览',
      teaching: '教学执行',
      operations: '教学通知',
    },
    navLabelOverrides: teacherNavLabelOverrides,
    routeTitleOverrides: {
  '/': { title: '教学总览', section: 'Teaching' },
  '/workspace': { title: '教师工作台', section: 'Teaching' },
      '/students': { title: '我的学员', section: '教学执行' },
      '/courses': { title: '我的课程', section: '教学执行' },
      '/classes': { title: '我的班级', section: '教学执行' },
      '/materials': { title: '教学内容', section: '教学执行' },
      '/materials/library': { title: '教材库', section: '教学执行' },
      '/materials/library/:detail': { title: '教材详情', section: '教学执行' },
      '/materials/units': { title: '单元内容', section: '教学执行' },
      '/materials/units/:detail': { title: '单元详情', section: '教学执行' },
      '/assignments': { title: '作业反馈', section: '教学执行' },
      '/leave-adjustments': { title: '请假调课', section: '教学执行' },
      '/lesson-records': { title: '课堂记录', section: '教学执行' },
      '/notifications': { title: '教学通知', section: '教学执行' },
    },
    brandTitle: 'Teaching',
    brandSummary: '教师端当前只保留教学执行相关入口，重点围绕我的学员、我的课程、请假和反馈协作。',
    headerDescription: '当前先把教师工作台的信息架构、命名方式和权限边界收紧，后续再接真实教学功能。',
    workspaceTag: 'Teaching',
  },
};

const openKeys = ['overview', 'teaching', 'operations', 'system'];
const topNavItems = [
  { key: 'design', label: 'Design' },
  { key: 'development', label: 'Development' },
  { key: 'components', label: 'Modules' },
  { key: 'resources', label: 'Resources' },
];

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const role = (user?.role ?? 'super_admin') as Role;
  const shellConfig = roleShellConfigs[role];
  const dynamicRouteTitle = (() => {
    if (location.pathname.startsWith('/materials/library/')) {
      return shellConfig.routeTitleOverrides?.['/materials/library/:detail'] ?? routeTitles['/materials/library/:detail'];
    }
    if (location.pathname.startsWith('/materials/units/')) {
      return shellConfig.routeTitleOverrides?.['/materials/units/:detail'] ?? routeTitles['/materials/units/:detail'];
    }
    return null;
  })();
  const current =
    dynamicRouteTitle ??
    shellConfig.routeTitleOverrides?.[location.pathname] ??
    routeTitles[location.pathname] ??
    { title: 'KotobaLink Admin', section: 'Overview' };
  const selectedMenuKey = location.pathname.startsWith('/materials/') ? '/materials' : location.pathname;

  const menuItems: MenuProps['items'] = navGroups
    .map((group) => {
      const children = group.children.filter((item) => item.roles.includes(role));
      if (children.length === 0) {
        return null;
      }

      return {
        key: group.key,
        label: shellConfig.navGroupLabels?.[group.key] ?? group.label,
        children: children.map((item) => ({
          key: item.key,
          icon: item.icon,
          label: shellConfig.navLabelOverrides?.[item.key] ?? item.label,
        })),
      };
    })
    .filter(Boolean) as MenuProps['items'];

  const accountMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
          label: (
        <div className="account-menu-summary">
          <Typography.Text strong>{user?.display_name ?? 'Admin'}</Typography.Text>
          <Typography.Text type="secondary">{getRoleLabel(user?.role ?? 'super_admin')}</Typography.Text>
        </div>
      ),
      disabled: true,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  async function handleAccountMenuClick(key: string) {
    if (key !== 'logout') {
      return;
    }

    await logout();
    messageApi.success('已退出登录');
    navigate('/login', { replace: true });
  }

  return (
    <Layout className="admin-layout">
      {contextHolder}
      <Layout>
        <Header className="global-header">
          <div className="global-left">
            <Space size={12}>
              <div className="brand-logo">K</div>
              <Typography.Title level={4} className="global-brand">
                KotobaLink Admin
              </Typography.Title>
            </Space>
            <div className="global-search">
              <Input
                prefix={<SearchOutlined />}
                placeholder="Type keywords..."
                size="middle"
              />
            </div>
          </div>

          <Space size="middle" className="global-right">
            <Menu mode="horizontal" selectable={false} items={topNavItems} className="top-nav" />
            <Button type="text" icon={<GlobalOutlined />} />
            <Button type="text" icon={<CodeOutlined />} />
            <Button type="text" icon={<QuestionCircleOutlined />} />
            <Dropdown
              menu={{
                items: accountMenuItems,
                onClick: ({ key }) => void handleAccountMenuClick(String(key)),
              }}
              trigger={['click']}
            >
              <button type="button" className="account-trigger">
                <Badge dot color="#52c41a" offset={[-4, 28]}>
                  <Avatar size="large" icon={<UserOutlined />} />
                </Badge>
                <span className="account-copy">
                  <strong>{user?.display_name ?? 'Admin'}</strong>
                  <small>{getRoleLabel(user?.role ?? 'super_admin')}</small>
                </span>
                <DownOutlined />
              </button>
            </Dropdown>
          </Space>
        </Header>

        <Layout className="workspace-layout">
          <Sider width={280} theme="light" className="admin-sider">
            <div className="sider-toolbar">
              <Button type="text" icon={<MenuFoldOutlined />} />
              <Tag color="green">{shellConfig.workspaceTag}</Tag>
            </div>

            <div className="brand-block">
              <Typography.Text className="brand-kicker">Enterprise Console</Typography.Text>
              <Typography.Title level={3} className="brand-title">
                {shellConfig.brandTitle ?? current.section}
              </Typography.Title>
              <Typography.Paragraph className="brand-summary">
                {shellConfig.brandSummary}
              </Typography.Paragraph>
            </div>

            <div className="sider-divider" />

            <div className="sider-section-label">Navigation</div>
            <Menu
              mode="inline"
              items={menuItems}
              selectedKeys={[selectedMenuKey]}
              defaultOpenKeys={openKeys}
              onClick={({ key }) => navigate(key)}
              className="admin-menu"
            />
          </Sider>

          <Content className="admin-content">
            <div className="content-header">
              <div>
                <Breadcrumb
                  items={[
                    { title: current.section },
                    { title: current.title },
                  ]}
                />
                <Typography.Title level={3} className="header-title">
                  {current.title}
                </Typography.Title>
                <Typography.Paragraph className="header-description">
                  {shellConfig.headerDescription}
                </Typography.Paragraph>
              </div>
              <Space wrap>
                <Tag color="blue">Ant Design</Tag>
                <Tag icon={<CheckCircleOutlined />} color="green">
                  Healthy
                </Tag>
                <Button type="text" icon={<BellOutlined />}>
                  Notifications
                </Button>
              </Space>
            </div>
            <div className="content-divider" />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
