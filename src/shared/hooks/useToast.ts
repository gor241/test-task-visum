import { useState, useCallback } from 'react';
import { AlertColor } from '@mui/material';

interface ToastState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export interface ToastAPI {
  toast: ToastState;
  autoHideDuration: number;
  showToast: (message: string, severity?: AlertColor, duration?: number) => void;
  hideToast: () => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
}

export function useToast(defaultDuration = 3000): ToastAPI {
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

  // Создаем методы для разных типов уведомлений
  const showSuccess = useCallback(
    (message: string, duration?: number) => showToast(message, 'success', duration),
    [showToast]
  );

  const showError = useCallback(
    (message: string, duration?: number) => showToast(message, 'error', duration),
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, duration?: number) => showToast(message, 'info', duration),
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, duration?: number) => showToast(message, 'warning', duration),
    [showToast]
  );

  return {
    toast,
    autoHideDuration,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
}
