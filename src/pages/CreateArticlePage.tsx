import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import type { storeType } from '../type';
import ArticleForm from '../components/Form/ArticleForm';
import Container from '../containers/Container';
import Alert from '../components/Alert';
import { createArticle } from '../store/action';
import useSideContents from '../utils/hooks/useSideContent';
import getErrorMessage from '../utils/hooks/getErrorMessage';
import { alertMessage } from '../utils/helpers/alert.helpers';

export default function CreateArticlePage() {
    const { loggedIn } = useSelector((state: storeType) => state.user);
    const { hasError } = useSelector((state: storeType) => state.article);
    const history = useHistory();

    useLayoutEffect(() => {
        const slug = sessionStorage.getItem('slug');
        if (slug) {
            sessionStorage.removeItem('slug');
            history.push(`/articles/${slug}`);
        }
    }, [history]);

    const sideContent = useSideContents({
        error: {
            hasError,
            props: () =>
                getErrorMessage(hasError, [
                    ['serverError', alertMessage.serverError],
                    ['notFoundError', alertMessage.notFoundError.article],
                ]),
        },
        other: [
            {
                check: !loggedIn,
                component: <Alert message={alertMessage.noAccessError} type='error' />,
            },
        ],
        withoutLoading: true,
    });
    if (sideContent) return <Container component={sideContent} />;

    return <Container component={<ArticleForm action={createArticle} />} />;
}
