import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Descriptions, Form, Input, Space, Typography, message } from 'antd';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';
import { getDefaultRouteForRole } from '../auth/roleConfig';


type LoginFormValues = {
  username: string;
  password: string;
};

export function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const from = (location.state as { from?: { pathname?: string } } | undefined)?.from?.pathname;

  if (user) {
    return <Navigate to={from || getDefaultRouteForRole(user.role)} replace />;
  }

  async function handleFinish(values: LoginFormValues) {
    setSubmitting(true);
    setError(null);

    try {
      const loggedInUser = await login(values.username, values.password);
      messageApi.success('登录成功');
      navigate(from || getDefaultRouteForRole(loggedInUser.role), { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-layout">
      {contextHolder}
      <div className="login-shell">
        <div className="login-copy">
          <Typography.Text className="brand-kicker">KotobaLink Admin</Typography.Text>
          <Typography.Title level={1} className="login-title">
            登录后台工作台
          </Typography.Title>
          <Typography.Paragraph className="login-description">
            当前先按三类角色搭登录框架：超级管理员、运营 / 教务、教师。先用 demo 账号进入系统，后续再接真实认证、权限和会话策略。
          </Typography.Paragraph>
          <Card size="small" className="login-demo-card">
            <Descriptions column={1} size="small" title="Demo 账号">
              <Descriptions.Item label="超级管理员">admin / kotobalink123</Descriptions.Item>
              <Descriptions.Item label="运营 / 教务">ops_admin / ops123</Descriptions.Item>
              <Descriptions.Item label="教师账号">teacher / teacher123</Descriptions.Item>
            </Descriptions>
          </Card>
        </div>

        <Card className="login-card" bordered={false}>
          <Typography.Title level={3}>Sign in</Typography.Title>
          <Typography.Paragraph type="secondary">
            使用对应角色账号登录后进入 KotobaLink 后台。
          </Typography.Paragraph>

          {error ? <Alert type="error" message={error} showIcon className="login-alert" /> : null}

          <Form<LoginFormValues>
            layout="vertical"
            initialValues={{ username: 'admin', password: 'kotobalink123' }}
            onFinish={handleFinish}
          >
            <Form.Item label="Username" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined />} size="large" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} size="large" />
            </Form.Item>
            <Form.Item className="login-submit">
              <Button type="primary" htmlType="submit" size="large" block loading={submitting}>
                登录后台
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
