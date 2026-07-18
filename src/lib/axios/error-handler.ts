import type { AxiosError } from "axios";

const ERROR_MESSAGES: Record<string, string> = {
  "error.phone_number_or_password_is_invalid": "شماره موبایل یا رمز عبور اشتباه است",
};

interface ApiErrorData {
  status?: string;
  message?: string;
  code?: string;
  detail?: string;
}

export function getApiErrorMessage(error: AxiosError<ApiErrorData>): string {
  const data = error.response?.data;
  if (!data) return "خطا در ارتباط با سرور";
  if (data.code && ERROR_MESSAGES[data.code]) return ERROR_MESSAGES[data.code];
  return data.message || data.detail || "خطای غیرمنتظره";
}
