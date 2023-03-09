export * from './articles/action';
export * from './user/action';

export const setIsLoading = (isLoading: boolean) => ({
    type: 'SET_IS_LOADING' as const,
    isLoading,
});
