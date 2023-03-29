import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import type { appDispatch, storeType } from '../../../type';
import Button from '../../Button';
import useModal from '../../../utils/hooks/useModal';
import './ArticleBtns.scss';
import { deleteArticle } from '../../../store/action';

interface IArticleBtns {
    author: string;
}

export default function ArticleBtns({ author }: IArticleBtns) {
    const { loggedIn } = useSelector((state: storeType) => state.user);
    const hasError = useSelector((state: storeType) => state.article.hasError);
    const dispatch: appDispatch = useDispatch();

    const history = useHistory();
    const path = history.location.pathname;

    const editLink = `${path}/edit`;
    const slug = path
        .split('/')
        .filter((el) => el !== '')
        .at(-1) as string;

    const isAuthor = loggedIn && loggedIn.username === author;

    const token = isAuthor && loggedIn.token ? loggedIn.token : undefined;

    const modal = useModal(token, 'Are you sure to delete this article?', async () => {
        await dispatch(deleteArticle(token as string, slug));
        if (!hasError) {
            sessionStorage.setItem('isReloaded', 'true');
            window.location.reload();
        }
        return true;
    });

    if (!isAuthor) return null;

    return (
        <div className='articleBtns'>
            <Button text='delete' type='alert' onClick={modal || undefined} />
            <Button text='edit' type='accent' onClick={() => history.push(editLink)} />
        </div>
    );
}
