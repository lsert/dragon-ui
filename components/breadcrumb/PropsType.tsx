import { CSSProperties } from 'react';

export interface PropsType {
  prefixCls?: string;
  separator?: string;
}

export interface ItemPropsType {
  separator?: string;
  href?: string;
  className?: string;
  style?: CSSProperties;
}
