import { errorMessage } from '.';
import type { errorMessageKeysType } from '.';

export default function returnErrorMessage(
    errorType: string | null,
    component: keyof typeof errorMessage.notFoundError
) {
    if (!errorType) return null;
    if (!Object.keys(errorMessage).find((el) => el === errorType)) return 'Something is wrong, please contact support';
    if (errorType === 'notFoundError') return errorMessage.notFoundError[component];
    return errorMessage[errorType as errorMessageKeysType];
}
