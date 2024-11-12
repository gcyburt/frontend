import { Menu } from 'antd';
import { HomeOutlined, InfoCircleOutlined, PaperClipOutlined, LogoutOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';
import { useTranslation } from 'react-i18next';
const Navbar = ({ username, onLogout, changeLanguage }: { username: string | null, onLogout: () => void, changeLanguage: (lng: string) => void }) => {
    const { t } = useTranslation();
    return (
        <Menu mode="horizontal" className={styles.navbar}>
            <Menu.Item key="home" icon={<HomeOutlined />} className={styles.menuItem}>
                <a href="/">{t('home')}</a>
            </Menu.Item>
            <Menu.Item key="about" icon={<InfoCircleOutlined />} className={styles.menuItem}>
                <a href="/about">{t('about')}</a>
            </Menu.Item>
            <Menu.Item key="documentation" icon={<PaperClipOutlined />} className={styles.menuItem}>
                <a href="/documentation">{t('documentation')}</a>
            </Menu.Item>
            <Menu.Item key="chat" icon={<MessageOutlined />} className={styles.menuItem}>
                <a href="/chat">{t('chat')}</a>
            </Menu.Item>
            {username && (
                <Menu.Item key="username" icon={<UserOutlined />} className={styles.menuItem}>
                    {username}
                </Menu.Item>
            )}
            <Menu.Item key="logout" icon={<LogoutOutlined />} className={`${styles.menuItem} ${styles.logout}`} onClick={onLogout}>
                {t('logout')}
            </Menu.Item>
            <Menu.Item key="language-en" className={styles.menuItem}>
                <button className={styles.menuItemButton} onClick={() => changeLanguage('en')}>{t('english')}</button>
            </Menu.Item>
            <Menu.Item key="language-pl" className={styles.menuItem}>
                <button className={styles.menuItemButton} onClick={() => changeLanguage('pl')}>{t('polish')}</button>
            </Menu.Item>
        </Menu>
    );
};

export default Navbar; 