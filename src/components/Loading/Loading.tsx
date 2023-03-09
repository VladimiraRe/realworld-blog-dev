import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './Loading.scss';

export default function Loading() {
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return <Spin className='Loading' indicator={antIcon} />;
}
