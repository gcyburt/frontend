import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const DocumentUpload: React.FC = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
    const endpoint = `${apiUrl}/uploadDocuments`;
    const props = {
        name: 'file',
        multiple: false,
        accept: '.pdf,.docx,.txt',
        action: endpoint, // Replace with your upload URL
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files.
            </p>
        </Dragger>
    );
};

export default DocumentUpload; 