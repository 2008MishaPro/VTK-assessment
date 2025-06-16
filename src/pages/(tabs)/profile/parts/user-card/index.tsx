import { UserData } from './model';
import { Avatar, Typography, Divider, Space, Tag, Skeleton } from 'antd';
import { UserOutlined, MailOutlined, TeamOutlined, BookOutlined, BankOutlined } from '@ant-design/icons';
import { info } from "../../../../../trash";

const { Title, Text } = Typography;

export const UserCard = () => {
    const { profileData } = UserData();
    const groupName = 'ИС';
    
    // Находим информацию о группе
    const groupInfo = info.find(item => item.group === groupName);
    
    // Проверяем, загружены ли данные
    const isLoading = !profileData.full_name;
    
    // Получаем инициалы для аватара
    const getInitials = () => {
        if (!profileData.full_name) return '';
        return profileData.full_name
            .split(' ')
            .map(name => name.charAt(0))
            .join('')
            .toUpperCase();
    };

    return (
        <Skeleton loading={false} active avatar paragraph={{ rows: 6 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar 
                    size={100} 
                    icon={<UserOutlined />}
                    style={{ 
                        backgroundColor: '#1890ff',
                        fontSize: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '16px'
                    }}
                >
                    {getInitials()}
                </Avatar>
                
                <Title level={4} style={{ margin: '8px 0', textAlign: 'center' }}>
                    Алексеев Виталий Тихонович
                </Title>
                
                <Space>
                    <Tag color="blue">ИС 1-1</Tag>
                    <Tag color="green">Студент</Tag>
                </Space>
            </div>
            
            <Divider style={{ margin: '20px 0' }} />
            
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                    <Space>
                        <MailOutlined />
                        <Text strong>Email:</Text>
                    </Space>
                    <div style={{ marginTop: 4 }}>
                        <Text>vktvitali2021000335</Text>
                    </div>
                </div>
                
                {groupInfo && (
                    <>
                        <div>
                            <Space>
                                <TeamOutlined />
                                <Text strong>Группа:</Text>
                            </Space>
                            <div style={{ marginTop: 4 }}>
                                <Text>ИС 1-1</Text>
                            </div>
                        </div>
                        
                        <div>
                            <Space>
                                <BookOutlined />
                                <Text strong>Специальность:</Text>
                            </Space>
                            <div style={{ marginTop: 4 }}>
                                <Text>{groupInfo.title}</Text>
                            </div>
                        </div>
                        
                        <div>
                            <Space>
                                <BankOutlined />
                                <Text strong>Кафедра:</Text>
                            </Space>
                            <div style={{ marginTop: 4 }}>
                                <Text>{groupInfo.kafedra}</Text>
                            </div>
                        </div>
                    </>
                )}
            </Space>
        </Skeleton>
    );
};