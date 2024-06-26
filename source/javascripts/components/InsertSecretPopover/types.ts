export type Secret = {
  key: string;
  value: string;
  source: string;
  isExpand: boolean;
  isExpose: boolean;
};

export type HandlerFn = (secret: Secret) => void;
export type CreateSecretFormValues = Secret;
