export type APIResponse<T = unknown | null> = {
  success: boolean;
  status: number;
  error?: string;
  message?: string;
  data?: T;
};
