import { useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import type { INewArticle, storeType } from '../type';
import ArticleForm from '../components/Form/ArticleForm';
import Container from '../containers/Container';
import Alert from '../components/Alert';
import useArticle from '../utils/hooks/useArticle';
import { updateArticle } from '../store/action';
import useSideContents from '../utils/hooks/useSideContent';
import getErrorMessage from '../utils/hooks/getErrorMessage';
import { alertMessage, alertType } from '../utils/helpers/alert.helpers';

export default function EditArticlePage() {
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

    const linkSlug = history.location.pathname
        .split('/')
        .filter((el) => el !== '')
        .at(-2) as string;

    const [isFormLoading, setIsFormLoading] = useState(false);

    const article = useArticle(linkSlug);

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
                check: !loggedIn || article?.author.username !== loggedIn.username,
                component: <Alert message={alertMessage.noAccessError} type='error' />,
            },
            {
                check: !article || Object.keys(article).length === 0,
                component: <Alert message={alertMessage.notFoundError.article} type={alertType.warning} />,
            },
        ],
        withoutLoading: true,
        checkForLoading: isFormLoading,
    });
    if (sideContent) return <Container component={sideContent} />;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { title, description, body, tagList, slug } = article!;

    const action = (articleData: INewArticle, token: string) => updateArticle(articleData, token, slug);

    return (
        <Container
            component={
                <ArticleForm
                    values={{ title, description, body, tagList }}
                    action={action}
                    onLoading={() => setIsFormLoading(true)}
                />
            }
        />
    );
}
