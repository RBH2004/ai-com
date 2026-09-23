import React from 'react';
import { useShop } from '../context/ShopContext';

export const ToastNotification = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'cart':
        return '🛒';
      case 'heart':
        return '❤️';
      case 'discount':
        return '🏷️';
      case 'error':
        return '⚠️';
      default:
        return '✨';
    }
  };

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast-card toast-${toast.type}`}>
          <div className="toast-icon-wrap">{getIcon(toast.type)}</div>
          <div className="toast-text-wrap">
            <h5 className="toast-title">{toast.title}</h5>
            {toast.message && <p className="toast-message">{toast.message}</p>}
          </div>
          <button
            type="button"
            className="toast-close-btn"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
