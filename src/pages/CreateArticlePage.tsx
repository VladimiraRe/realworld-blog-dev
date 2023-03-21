import { useSelector } from 'react-redux';

import type { storeType } from '../type';
import ArticleForm from '../components/Form/ArticleForm';
import Container from '../containers/Container';
import Alert, { alertMessage } from '../components/Alert';
import { createArtile } from '../store/requests/action';
import useSideContents from '../utils/hooks/useSideContent';
import getErrorMessage from '../utils/hooks/getErrorMessage';

export default function CreateArticlePage() {
    const { loggedIn } = useSelector((state: storeType) => state.user);
    const { hasError, isCreated } = useSelector((state: storeType) => state.article);

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
    });
    if (sideContent) return <Container component={sideContent} />;

    return <Container component={<ArticleForm check={isCreated} action={createArtile} />} />;
}
