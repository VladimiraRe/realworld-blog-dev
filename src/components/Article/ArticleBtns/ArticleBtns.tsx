import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import type { storeType } from '../../../type';
import Button from '../../Button';
import './ArticleBtns.scss';

interface IArticleBtns {
    author: string;
}

export default function ArticleBtns({ author }: IArticleBtns) {
    const { loggedIn } = useSelector((state: storeType) => state.user);
    const history = useHistory();

    if (!loggedIn || loggedIn.username !== author) return null;

    const editLink = `${history.location.pathname}/edit`;

    return (
        <div className='articleBtns'>
            <Button text='delete' type='alert' />
            <Button text='edit' type='accent' onClick={() => history.push(editLink)} />
        </div>
    );
}
