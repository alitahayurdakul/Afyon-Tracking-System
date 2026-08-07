"use client";
import { useMutation } from "@tanstack/react-query";

import { axiosInstance } from "@/api/axiosInstance";
import { ForgotPasswordQueryTypes } from "@/app/api/auth/forgot-password/route";
import { CLIENT_END_POINTS } from "@/consts/endpoints";
import { saveResetFlow, setResetToken } from "@/utils/forgotPasswordFlow";

interface IForgotPasswordPayload {
  email: string;
}

interface IVerifyResetCodePayload {
  email: string;
  code: string;
}

interface IResetPasswordPayload {
  resetToken: string;
  newPassword: string;
}

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({ email }: IForgotPasswordPayload) => {
      const { data } = await axiosInstance.post<{ message: string }>(
        CLIENT_END_POINTS.auth.forgotPassword,
        {
          type: ForgotPasswordQueryTypes.forgotPassword,
          params: { email },
        },
      );
      return data;
    },
    onSuccess: (_data, variables) => {
      saveResetFlow(variables.email);
    },
  });
};

export const useVerifyResetCodeMutation = () => {
  return useMutation({
    mutationFn: async ({ email, code }: IVerifyResetCodePayload) => {
      const { data } = await axiosInstance.post<{ resetToken: string }>(
        CLIENT_END_POINTS.auth.verifyResetCode,
        {
          type: ForgotPasswordQueryTypes.verifyResetCode,
          params: { email, code },
        },
      );
      return data;
    },
    onSuccess: (data) => {
      setResetToken(data?.resetToken ?? "");
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({ resetToken, newPassword }: IResetPasswordPayload) => {
      const { data } = await axiosInstance.post<{ message: string }>(
        CLIENT_END_POINTS.auth.resetPassword,
        {
          type: ForgotPasswordQueryTypes.resetPassword,
          params: { resetToken, newPassword },
        },
      );
      return data;
    },
  });
};
