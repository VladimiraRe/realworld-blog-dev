export const setIsLoading = (isLoading: boolean) => ({
    type: 'SET_IS_LOADING' as const,
    isLoading,
});

export const setIsDataUpdate = (isDataUpdate: boolean | null) => ({
    type: 'SET_IS_DATA_UPDATE' as const,
    isDataUpdate,
});
