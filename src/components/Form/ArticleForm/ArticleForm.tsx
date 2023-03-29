/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';

import useSideContents from '../../../utils/hooks/useSideContent';
import { setArticle, setIsLoading } from '../../../store/action';
import type { appDispatch, IArticle, INewArticle, storeType } from '../../../type';
import DynamicForm from '../DynamicForm';
import Form from '../Form';
import FormItem from '../FormItem';
import { articleRules } from '../../../utils/helpers/validation.helpers';
import './ArticleForm.scss';
import getErrorMessage from '../../../utils/hooks/getErrorMessage';
import Container from '../../../containers/Container';
import { alertMessage } from '../../../utils/helpers/alert.helpers';
import useCleaner from '../../../utils/hooks/useCleaner';

interface IArticleForm {
    action: (articleData: INewArticle, token: string) => (dispatch: appDispatch) => Promise<IArticle | false>;
    values?: { tagList: string[]; [key: string]: string | string[] };
}

export const articleFormNames = ['title', 'description', 'body', 'tagList'] as const;

export default function ArticleForm({ action, values }: IArticleForm) {
    const { token } = useSelector((state: storeType) => state.user.loggedIn || { token: undefined });
    const { hasError } = useSelector((state: storeType) => state.article);
    const isLoading = useSelector((state: storeType) => state.isLoading);

    const dispatch: appDispatch = useDispatch();
    const history = useHistory();

    const [isReload, setIsReload] = useState(false);

    useCleaner([
        { check: !!hasError, action: () => setArticle({ hasError: null }) },
        { check: isLoading, action: () => setIsLoading(false) },
        { check: !!(sessionStorage.getItem('slug') && !isReload), other: () => sessionStorage.removeItem('slug') },
    ]);

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
                    ['unauthorizedError', alertMessage.loginError],
                    ['serverError', alertMessage.serverError],
                ]),
        },
        withoutLoading: true,
    });
    if (sideContent) return <Container component={sideContent} />;

    const names = articleFormNames;
    const tagList = values && values.tagList ? values.tagList : [null, null];

    const initial: { [key: string]: string | (string | null)[] | null } = {};
    names.forEach((name) => {
        // eslint-disable-next-line no-unused-expressions
        name === 'tagList' ? (initial.tagList = tagList) : (initial[name] = values ? values[name] : null);
    });

    const onFinish = async (articleData: INewArticle) => {
        const res = await dispatch(action(articleData, token as string));
        if (res && !hasError) {
            setIsReload(true);
            sessionStorage.setItem('slug', `${res.slug}`);
            window.location.reload();
        }
    };

    return (
        <div className='articleForm'>
            <Form
                title='create new article'
                btnText='send'
                initial={initial}
                onFinish={onFinish}
                loading={isLoading}
                disabled={isLoading}
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
