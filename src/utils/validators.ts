export const OBJECT_ID_RULE = /^[0-9a-fA-F]{24}$/;
export const OBJECT_ID_RULE_MESSAGE: string = 'Your string fails to match the Object Id pattern!';

export const HASH_PASSWORD_RULE = /^\$2[aby]\$.{56}$/;
export const HASH_PASSWORD_RULE_MESSAGE: string = 'Your string fails to match the Hash Password pattern problem in authService!';