import React from "react";
import "./UploadPage.css";
import InputInformation from "../../components/UploadPage/InputInformation";
const UploadPage: React.FC = () => {
    return (
        <div className="upload-page">
            <div className="upload-page-title">
                <h1 className="upload-page-label">ESTATE FOR RENT</h1>
                <p className="upload-page-description">
                    Complete your estate details, to engage with your audience!
                </p>
            </div>
            <hr className="upload-page-hr" />
            <h1 className="upload-page-h1">Add Images Estate</h1>
            <InputInformation />
        </div>
    );
};

export default UploadPage;
