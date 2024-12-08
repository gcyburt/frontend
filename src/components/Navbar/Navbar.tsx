import { Menu, Select } from 'antd';
import { HomeOutlined, InfoCircleOutlined, PaperClipOutlined, LogoutOutlined, UserOutlined, MessageOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';
import { useTranslation } from 'react-i18next';

const Navbar = ({ username, onLogout, changeLanguage }: { username: string | null, onLogout: () => void, changeLanguage: (lng: string) => void }) => {
    const { t } = useTranslation();

    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: <a href="/dashboard">{t('home')}</a>,
            className: styles.menuItem,
        },
        {
            key: 'documentation',
            icon: <PaperClipOutlined />,
            label: <a href="/documentation">{t('documentation')}</a>,
            className: styles.menuItem,
        },
        {
            key: 'chat',
            icon: <MessageOutlined />,
            label: <a href="/chat">{t('chat')}</a>,
            className: styles.menuItem,
        },
        {
            key: 'about',
            icon: <InfoCircleOutlined />,
            label: <a href="/about">{t('about')}</a>,
            className: styles.menuItem,
        },
        ...(username ? [{
            key: 'username',
            icon: <UserOutlined />,
            label: (
                <>
                    {username}
                    <a href="/profile">{t('profile')}</a>
                </>
            ),
            className: styles.menuItem,
        }] : []),
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: t('logout'),
            className: `${styles.menuItem} ${styles.logout}`,
            onClick: onLogout,
        },
        {
            key: 'language',
            label: (
                <Select
                    defaultValue="en"
                    style={{ width: 120 }}
                    onChange={changeLanguage}
                    className={styles.languageSelect}
                >
                    <Select.Option value="en">{t('english')}</Select.Option>
                    <Select.Option value="pl">{t('polish')}</Select.Option>
                </Select>
            ),
            className: styles.menuItem,
        },
    ];

    return (
        <Menu mode="horizontal" className={styles.navbar} items={menuItems} />
    );
};

export default Navbar; 