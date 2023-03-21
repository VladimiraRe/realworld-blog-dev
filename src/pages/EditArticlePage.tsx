import { useSelector } from 'react-redux';

import type { storeType } from '../type';
import ArticleForm from '../components/Form/ArticleForm';
import Container from '../containers/Container';
import Alert, { alertMessage } from '../components/Alert';

export default function EditArticlePage() {
    const { article } = useSelector((state: storeType) => state.article);
    const { loggedIn } = useSelector((state: storeType) => state.user);

    if (!loggedIn || article?.author.username !== loggedIn.username)
        return <Container component={<Alert message={alertMessage.noAccessError} type='error' />} />;

    return <Container component={<ArticleForm />} />;
}
