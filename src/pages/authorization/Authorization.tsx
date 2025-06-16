import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";
import { Button, Form, Input, Card, Typography, Divider } from "antd";
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import styles from './styles.module.css';
import { VtlLogo } from "../../assets/svg";

const { Title, Text } = Typography;

export const Authorization = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { onLogin } = useAuth();

  const sendLoginData = async (e: any) => {
    e.preventDefault();
    const result = await onLogin!(login.email, login.password);
    if (result) {
      navigate("/authorized/assessment");
    }
  };

  return (
    <main className={styles.container} style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)'
    }}>
      <Card 
        style={{ 
          width: 400, 
          borderRadius: 8, 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ 
          background: 'linear-gradient(90deg, #2E8B57 0%, #3CB371 100%)', 
          padding: '24px',
          textAlign: 'center',
          color: 'white'
        }}>
          <VtlLogo style={{ height: 60, marginBottom: 16 }} />
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            Вход в систему
          </Title>
          <Text style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Виртуальный колледж
          </Text>
        </div>
        
        <div style={{ padding: '24px' }}>
          <Form layout="vertical">
            <Form.Item 
              label="Логин" 
              rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                name="email" 
                placeholder="Введите логин"
                onChange={(e) => setLogin({ ...login, email: e.target.value })}
              />
            </Form.Item>
            <Form.Item 
              label="Пароль"
              rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
            >
              <Input 
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
                type="password" 
                name="password" 
                placeholder="Введите пароль"
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
              />
            </Form.Item>
            
            <Divider style={{ margin: '12px 0' }} />
            
            <Text type="secondary" style={{ display: 'block', marginBottom: 16, fontSize: 13 }}>
              Данные для входа выдаются колледжем
            </Text>
            
            <Button 
              type="primary" 
              icon={<LoginOutlined />} 
              onClick={sendLoginData} 
              style={{ 
                width: '100%', 
                height: 40,
                background: '#2E8B57',
                borderColor: '#2E8B57'
              }}
            >
              Войти
            </Button>
          </Form>
        </div>
      </Card>
    </main>
  );
};
