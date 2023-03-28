import { useDispatch } from 'react-redux';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal as ModalAntd } from 'antd';

import { deleteArticle } from '../../store/requests/action';
import type { appDispatch } from '../../type';

export default function useModal(token: string, slug: string) {
    const dispatch: appDispatch = useDispatch();

    // eslint-disable-next-line no-unused-expressions
    return () =>
        ModalAntd.confirm({
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure to delete this article?',
            onOk() {
                sessionStorage.setItem('isNeedReloading', 'true');
                dispatch(deleteArticle(token, slug));
            },
        });
}
