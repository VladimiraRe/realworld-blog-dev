import type { alertType } from '../helpers/alert.helpers';
import { alertMessage } from '../helpers/alert.helpers';

type checkType = [string, string, (keyof typeof alertType)?][];

export default function getErrorMessage(error: string | null | undefined, check: checkType) {
    const res: { text: string; type?: keyof typeof alertType } = { text: alertMessage.fetchError };
    const findErr = check.find(([name]) => name === error);
    if (findErr) {
        const [, message, type] = findErr;
        res.text = message;
        if (type) res.type = type;
    }
    return res;
}
