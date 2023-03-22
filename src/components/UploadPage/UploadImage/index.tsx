import React, { useCallback, useState } from "react";
import "./UploadImage.css";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import { useAppDispatch } from "../../../app/redux/store";
import { setErrorNotification } from "../../../app/redux/reducer/NotificationSlice";
interface IGetImage {
    handleChangeValue: (value: UploadFile[]) => void;
}
const getBase64 = (file: RcFile | Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

const UploadImage: React.FC<IGetImage> = ({ handleChangeValue }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewOpen(false);
    const dispatch = useAppDispatch();

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

            if (isDup) {
                dispatch(
                    setErrorNotification(
                        "Duplicate images, please upload again!"
                    )
                );
            } else {
                setFileList(newFileList);
                handleChangeValue(newFileList);
            }
        },
        [fileList, handleChangeValue]
    );
    const handleRemove = (file: UploadFile) => {
        const newFileList = fileList.filter(
            fileUid => fileUid.uid !== file.uid
        );
        setFileList(newFileList);
        handleChangeValue(newFileList);
    };
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div>Upload Images</div>
        </div>
    );

    return (
        <div className="upload-image">
            <Upload
                multiple
                className="upload-image-list"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleRemove}
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
                <img alt="image-preview" width={"100%"} src={previewImage} />
            </Modal>
        </div>
    );
};

export default UploadImage;
