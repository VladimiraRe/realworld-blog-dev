import { alertMessage } from '.';
import type { alertMessageKeysType } from '.';

export default function returnAlertMessage(
    alertType: string | null,
    component: keyof typeof alertMessage.notFoundError
) {
    if (!alertType) return null;
    if (!Object.keys(alertMessage).find((el) => el === alertType)) return 'Something is wrong, please contact support';
    if (alertType === 'notFoundError') return alertMessage.notFoundError[component];
    return alertMessage[alertType as alertMessageKeysType];
}
