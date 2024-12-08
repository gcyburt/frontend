import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import styles from './DocumentUpload.module.css';

const { Dragger } = Upload;

const DocumentUpload: React.FC = () => {
    const { t } = useTranslation();
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const endpoint = `${apiUrl}/documents/uploadDocuments`;
    const props = {
        name: 'file',
        multiple: false,
        accept: '.pdf,.docx,.txt',
        action: endpoint,
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${t('uploadSuccess')}`);
            } else if (status === 'error') {
                message.error(`${t('uploadError')}`);
            }
        },
    };

    return (
        <div className={styles.uploadContainer}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">{t('uploadDocument')}</p>
                <p className="ant-upload-hint">
                    {t('uploadHint')}
                </p>
            </Dragger>
        </div>
    );
};

export default DocumentUpload; 