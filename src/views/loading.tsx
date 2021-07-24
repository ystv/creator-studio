import React from "react";
import { Result } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface LoadingProps {
    msg: string
}

const Loading:React.FC<LoadingProps> = ({msg}):JSX.Element => {
    return (
        <Result icon={<LoadingOutlined />} title="Creator Studio" subTitle={msg} />
    )
}

export default Loading;