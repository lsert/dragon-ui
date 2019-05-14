import { HTMLProps, MouseEventHandler } from 'react';

export type bgType = 'transparent' | 'light' | 'normal' | 'dark';

export default interface PropsType extends HTMLProps<HTMLDivElement> {
  prefixCls?: string;
  visible: boolean;
  type: bgType;
  onClose: MouseEventHandler<HTMLDivElement>;
}
