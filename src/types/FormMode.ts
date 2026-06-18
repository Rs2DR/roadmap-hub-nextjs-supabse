import type { FORM_MODE } from '@/constants/form';

export type FormMode = (typeof FORM_MODE)[keyof typeof FORM_MODE];
