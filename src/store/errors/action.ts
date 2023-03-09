import type { errorsType } from '../../type';

const setError = (error: errorsType) => ({
    type: 'SET_ERROR' as const,
    error,
});

export default setError;
