/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Input } from 'antd';

import useSideContents from '../../../utils/hooks/useSideContent';
import useCleaner from '../../../utils/hooks/useCleaner';
import { alertMessage } from '../../Alert';
import { createArtile, setArticle } from '../../../store/requests/action';
import type { INewArticle, storeType } from '../../../type';
import DynamicForm from '../DynamicForm';
import Form from '../Form';
import FormItem from '../FormItem';
import { articleRules } from '../../../utils/helpers/validation.helpers';
import './ArticleForm.scss';

interface IArticleForm {
    values?: { tags: string[]; [key: string]: string | string[] };
}

export const articleFormNames = ['title', 'description', 'body', 'tagList'] as const;

export default function ArticleForm({ values }: IArticleForm) {
    const { token } = useSelector((state: storeType) => state.user.loggedIn!);
    const { article, hasError, isCreated, isChanged } = useSelector((state: storeType) => state.article);
    const history = useHistory();

    useSideContents({
        error: { hasError, props: () => generateErrorMessage(hasError) },
        other: [
            {
                check: !!(isCreated && article?.slug),
                action: () => {
                    history.replace(`/articles/${article?.slug}`);
                },
            },
        ],
    });

    useCleaner([
        { check: !!hasError, action: () => setArticle({ hasError: null }) },
        { check: !!isCreated, action: () => setArticle({ isChanged: false }) },
        { check: !!isChanged, action: () => setArticle({ isChanged: false }) },
    ]);

    const names = articleFormNames;
    const tags = values && values.tags ? values.tags : [null, null];

    const initial: { [key: string]: string | (string | null)[] | null } = {};
    names.forEach((name) => {
        // eslint-disable-next-line no-unused-expressions
        name === 'tagList' ? (initial.tagList = tags) : (initial[name] = values ? values[name] : null);
    });

    return (
        <div className='articleForm'>
            <Form
                title='create new article'
                btnText='send'
                initial={initial}
                action={(articleData: INewArticle) => createArtile(articleData, token as string)}
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

function generateErrorMessage(error: string | null) {
    const res: { text: string } = { text: alertMessage.fetchError };
    if (error === 'unauthorizedError') res.text = alertMessage.updateUserError;
    if (error === 'serverError') res.text = alertMessage.serverError;
    return res;
}
