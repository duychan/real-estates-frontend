import React, { useCallback, useState } from "react";
import "./UploadImage.css";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, message } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadChangeParam, UploadFile } from "antd/es/upload/interface";

const getBase64 = (file: RcFile | Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

const UploadImage: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage((file.url as string) || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
        );
    };

    const handleChange: UploadProps["onChange"] = useCallback(
        async ({
            fileList: newFileList,
            file: newFile
        }: {
            fileList: UploadFile[];
            file: any;
        }) => {
            const b64file = await getBase64(newFile);
            const fileListBase64 = await Promise.all(
                fileList.map((uploadFile: UploadFile) => {
                    return getBase64(uploadFile.originFileObj as RcFile);
                })
            );

            const isDup = await fileListBase64.some(file => file === b64file);

            return isDup
                ? message.error("Duplicate images, please upload again!")
                : setFileList(newFileList);
        },
        [fileList]
    );

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div>Upload Images</div>
        </div>
    );

    return (
        <div className="upload-image">
            <div className="upload-image-title">
                <h1 className="upload-image-label">ESTATE FOR RENT</h1>
                <p className="upload-image-description">
                    Complete your estate details, to engage with your audience!
                </p>
            </div>
            <hr className="upload-image-hr" />
            <div className="upload-image-content">
                <h1 className="upload-image-h1">Add Images Estate</h1>
                <Upload
                    className="upload-image-list"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    beforeUpload={() => false}
                    accept=".png, .jpg"
                >
                    {fileList.length >= 20 ? null : uploadButton}
                </Upload>
                <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img
                        alt="image-preview"
                        width={"100%"}
                        src={previewImage}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default UploadImage;
