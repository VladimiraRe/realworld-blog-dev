import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal as ModalAntd } from 'antd';

export default function useModal(token: string | undefined, text: string, onOk: () => void) {
    if (!token) return false;

    // eslint-disable-next-line no-unused-expressions
    return () =>
        ModalAntd.confirm({
            icon: <ExclamationCircleFilled />,
            content: text,
            onOk,
        });
}
