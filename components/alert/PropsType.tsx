import { ReactNode } from 'react';

export type themeType = 'default' | 'primary' | 'success' | 'warning' | 'danger';

export default interface PropsType {
  prefixCls: string;
  theme: themeType;
  message?: ReactNode;
  className?: string;
  width: number | string;
  visible?: boolean;
  hideIcon: boolean;
  closable: boolean;
  closeText?: string;
  onClose: () => void;
}
