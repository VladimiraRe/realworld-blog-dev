import { useSelector } from 'react-redux';

import ContentPagination from '../components/ContentPagination';
import ArticlesList from '../components/ArticlesList';
import type { storeType } from '../type';

export default function ListOfArticlesPage() {
    const { articlesCount } = useSelector((state: storeType) => state.listOfArticles);

    return <ContentPagination pageSize={5} content={ArticlesList} itemsCount={articlesCount} baseLink='articles' />;
}
