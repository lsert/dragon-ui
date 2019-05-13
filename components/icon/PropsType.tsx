import { HTMLAttributes } from 'react';
export type theme = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'loading';

export default interface PropsType extends HTMLAttributes<HTMLElement> {
  prefixCls?: string;
  type?: string;
  theme?: theme;
}
