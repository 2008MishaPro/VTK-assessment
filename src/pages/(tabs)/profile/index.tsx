import { useAuth } from "../../../context/AuthContext.tsx";
import { Navigate } from "react-router-dom";
import { Layout, Typography, Divider, Select, InputNumber, Button, Form, Space, Row, Col } from 'antd';
import { UserCard } from "./parts/user-card";
import { useState } from "react";

const { Sider, Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

export const Index = () => {
    const { authState } = useAuth();
    const [form] = Form.useForm();
    const [certificateType, setCertificateType] = useState<string>('');
    const [copies, setCopies] = useState<number>(1);

    if (!authState.token || (Array.isArray(authState.token) && authState.token.length === 0)) {
        console.log('Токен отсутствует или пустой');
        return <Navigate to="/authorization" replace />;
    }
    
    const handleSubmit = () => {
        console.log('Заказана справка:', {
            тип: certificateType,
            количество: copies
        });
        // Здесь будет логика отправки запроса на сервер
    };

    return (
        <Layout style={{ minHeight: 'calc(100vh - 80px)' }}>
            <Sider 
                width={300} 
                theme="light" 
                style={{ 
                    background: '#ffffff', 
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
                    overflow: 'auto',
                    height: '100%',
                    position: 'fixed',
                    left: 0,
                    paddingTop: 20
                }}
            >
                <div style={{ padding: '0 16px' }}>
                    <Title level={3} style={{ marginBottom: 24, textAlign: 'center' }}>
                        Профиль пользователя
                    </Title>
                    <Divider style={{ margin: '12px 0 24px' }} />
                    <UserCard />
                </div>
            </Sider>
            <Layout style={{ marginLeft: 300, background: '#f5f7fa', padding: 24 }}>
                <Content style={{ padding: 24, background: '#f5f7fa' }}>
                    <Row justify="center" align="middle" style={{ minHeight: 'calc(100vh - 128px)' }}>
                        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
                            <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
                                <Title level={2} style={{ textAlign: 'center' }}>Заказать справку</Title>
                                <Divider />
                                
                                <Form 
                                    form={form} 
                                    layout="vertical" 
                                    onFinish={handleSubmit}
                                    initialValues={{ certificateType: '', copies: 1 }}
                                >
                                    <Form.Item 
                                        name="certificateType" 
                                        label="Тип справки" 
                                        rules={[{ required: true, message: 'Пожалуйста, выберите тип справки' }]}
                                    >
                                        <Select 
                                            placeholder="Выберите тип справки" 
                                            style={{ width: '100%' }}
                                            onChange={(value) => setCertificateType(value)}
                                        >
                                            <Option value="education">Об обучении</Option>
                                            <Option value="scholarship">О стипендии</Option>
                                            <Option value="military">В военкомат</Option>
                                        </Select>
                                    </Form.Item>
                                    
                                    <Form.Item 
                                        name="copies" 
                                        label="Количество экземпляров"
                                        rules={[{ required: true, message: 'Пожалуйста, укажите количество экземпляров' }]}
                                    >
                                        <InputNumber 
                                            min={1} 
                                            max={10} 
                                            style={{ width: '100%' }}
                                            onChange={(value) => setCopies(value as number)}
                                        />
                                    </Form.Item>
                                    
                                    <Form.Item>
                                        <Space style={{ width: '100%', justifyContent: 'center' }}>
                                            <Button type="primary" htmlType="submit" size="large">
                                                Заказать
                                            </Button>
                                            <Button onClick={() => form.resetFields()} size="large">
                                                Сбросить
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
