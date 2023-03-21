/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';

import useSideContents from '../../../utils/hooks/useSideContent';
import useCleaner from '../../../utils/hooks/useCleaner';
import { alertMessage } from '../../Alert';
import { setArticle } from '../../../store/requests/action';
import type { appDispatch, INewArticle, storeType } from '../../../type';
import DynamicForm from '../DynamicForm';
import Form from '../Form';
import FormItem from '../FormItem';
import { articleRules } from '../../../utils/helpers/validation.helpers';
import './ArticleForm.scss';
import getErrorMessage from '../../../utils/hooks/getErrorMessage';
import Container from '../../../containers/Container';

interface IArticleForm {
    action: (articleData: INewArticle, token: string) => (dispatch: appDispatch) => Promise<void>;
    check: boolean;
    values?: { tagList: string[]; [key: string]: string | string[] };
}

export const articleFormNames = ['title', 'description', 'body', 'tagList'] as const;

export default function ArticleForm({ action, check, values }: IArticleForm) {
    const { token } = useSelector((state: storeType) => state.user.loggedIn!);
    const { article, hasError, isCreated, isChanged } = useSelector((state: storeType) => state.article);
    const history = useHistory();

    useCleaner([
        { check: !!hasError, action: () => setArticle({ hasError: null }) },
        { check: !!isCreated, action: () => setArticle({ isChanged: false }) },
        { check: !!isChanged, action: () => setArticle({ isChanged: false }) },
    ]);

    const sideContent = useSideContents({
        error: {
            hasError,
            props: () =>
                getErrorMessage(hasError, [
                    ['unauthorizedError', alertMessage.loginError],
                    ['serverError', alertMessage.serverError],
                ]),
        },
        other: [
            {
                check: !!(check && article?.slug),
                action: () => {
                    history.replace(`/articles/${article?.slug}`);
                },
            },
        ],
    });
    if (sideContent) return <Container component={sideContent} />;

    const names = articleFormNames;
    const tagList = values && values.tagList ? values.tagList : [null, null];

    const initial: { [key: string]: string | (string | null)[] | null } = {};
    names.forEach((name) => {
        // eslint-disable-next-line no-unused-expressions
        name === 'tagList' ? (initial.tagList = tagList) : (initial[name] = values![name] || null);
    });

    return (
        <div className='articleForm'>
            <Form
                title='create new article'
                btnText='send'
                initial={initial}
                action={(articleData: INewArticle) => action(articleData, token as string)}
            >
                <FormItem
                    name={names[0]}
                    label={names[0]}
                    rules={articleRules[names[0]]}
                    component={<Input placeholder={names[0]} />}
                />
                <FormItem
                    name={names[1]}
                    label='short description'
                    rules={articleRules[names[1]]}
                    component={<Input placeholder={names[1]} showCount maxLength={100} />}
                />
                <FormItem
                    name={names[2]}
                    label='text'
                    rules={articleRules[names[2]]}
                    component={<Input.TextArea placeholder='text' />}
                />
                <DynamicForm name={names[3]} label='tags' placeholder='tag' />
            </Form>
        </div>
    );
}
