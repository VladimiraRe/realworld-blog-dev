import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import type { storeType } from '../../../type';
import Button from '../../Button';
import useModal from '../../../utils/hooks/useModal';
import './ArticleBtns.scss';

interface IArticleBtns {
    author: string;
}

export default function ArticleBtns({ author }: IArticleBtns) {
    const { loggedIn } = useSelector((state: storeType) => state.user);
    const history = useHistory();
    const path = history.location.pathname;

    const editLink = `${path}/edit`;
    const slug = path
        .split('/')
        .filter((el) => el !== '')
        .at(-1) as string;

    const modal = useModal(loggedIn?.token as string, slug);

    if (!loggedIn || loggedIn.username !== author) return null;

    return (
        <div className='articleBtns'>
            <Button text='delete' type='alert' onClick={modal} />
            <Button text='edit' type='accent' onClick={() => history.push(editLink)} />
        </div>
    );
}
