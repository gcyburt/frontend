import { Menu, Select } from 'antd';
import { HomeOutlined, InfoCircleOutlined, PaperClipOutlined, LogoutOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';
import { useTranslation } from 'react-i18next';

const Navbar = ({ username, onLogout, changeLanguage }: { username: string | null, onLogout: () => void, changeLanguage: (lng: string) => void }) => {
    const { t } = useTranslation();
    return (
        <Menu mode="horizontal" className={styles.navbar}>
            <div className={styles.leftAligned}>
                <Menu.Item key="home" icon={<HomeOutlined />} className={styles.menuItem}>
                    <a href="/dashboard">{t('home')}</a>
                </Menu.Item>
                <Menu.Item key="documentation" icon={<PaperClipOutlined />} className={styles.menuItem}>
                    <a href="/documentation">{t('documentation')}</a>
                </Menu.Item>
                <Menu.Item key="chat" icon={<MessageOutlined />} className={styles.menuItem}>
                    <a href="/chat">{t('chat')}</a>
                </Menu.Item>
                <Menu.Item key="about" icon={<InfoCircleOutlined />} className={styles.menuItem}>
                    <a href="/about">{t('about')}</a>
                </Menu.Item>


            </div>
            <div className={styles.rightAligned}>
                {username && (
                    <Menu.Item key="username" icon={<UserOutlined />} className={styles.menuItem}>
                        {username}
                        <a href="/profile">{t('profile')}</a>
                    </Menu.Item>
                )}
                <Menu.Item key="logout" icon={<LogoutOutlined />} className={`${styles.menuItem} ${styles.logout}`} onClick={onLogout}>
                    {t('logout')}
                </Menu.Item>
                <Menu.Item key="language" className={styles.menuItem}>
                    <Select
                        defaultValue="en"
                        style={{ width: 120 }}
                        onChange={changeLanguage}
                        className={styles.languageSelect}
                    >
                        <Select.Option value="en">{t('english')}</Select.Option>
                        <Select.Option value="pl">{t('polish')}</Select.Option>
                    </Select>
                </Menu.Item>
            </div>
        </Menu>
    );
};

export default Navbar; 