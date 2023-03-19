const setError = (errors: string) => ({
    type: 'SET_ERROR' as const,
    errors,
});

export default setError;
