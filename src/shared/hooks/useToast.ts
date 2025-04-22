import { useState, useCallback } from 'react';
import { AlertColor } from '@mui/material';

interface ToastState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

type ToastType = 'success' | 'error' | 'info' | 'warning';

// Объект для маппинга типов уведомлений к соответствующим severity
const TOAST_TYPE_MAP: Record<ToastType, AlertColor> = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
};

export function useToast(defaultDuration = 3000) {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'info',
  });

  const [autoHideDuration, setAutoHideDuration] = useState<number>(defaultDuration);

  const showToast = useCallback(
    (message: string, severity: AlertColor = 'info', duration?: number) => {
      if (duration !== undefined) {
        setAutoHideDuration(duration);
      }

      setToast({
        open: true,
        message,
        severity,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      open: false,
    }));
  }, []);

  // Создаем объект с методами для разных типов уведомлений
  const toastMethods = Object.keys(TOAST_TYPE_MAP).reduce(
    (acc, type) => {
      const toastType = type as ToastType;
      acc[`show${toastType.charAt(0).toUpperCase() + toastType.slice(1)}`] = (
        message: string,
        duration?: number
      ) => showToast(message, TOAST_TYPE_MAP[toastType], duration);
      return acc;
    },
    {} as Record<string, (message: string, duration?: number) => void>
  );

  return {
    toast,
    autoHideDuration,
    showToast,
    hideToast,
    ...toastMethods,
  };
}
