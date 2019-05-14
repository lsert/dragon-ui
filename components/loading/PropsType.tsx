import { HTMLProps } from 'react';

export default interface PropsType extends HTMLProps<HTMLDivElement> {
  prefixCls?: string;
  visible?: boolean;
}
