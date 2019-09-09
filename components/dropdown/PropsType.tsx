import { ReactNode } from "react";

type direction = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
export type trigger = 'click' | 'hover' | 'contextMenu';

interface BasicPropsType {
  prefixCls?: string;
  visible?: boolean;
  content?: ReactNode;
  direction?: direction;
  radius?: boolean;
  isRadius?: boolean;
  triggerBoxStyle?: React.CSSProperties;
  trigger?: trigger;
  disabled?: boolean;
  zIndex?: number;
  hideOnClick?: boolean;
  notRenderInDisabledMode?: boolean;
  onVisibleChange(flag: boolean): void;
  getPopupContainer?(): HTMLElement;
}

export type propsType = React.HTMLAttributes<any> & BasicPropsType;

export interface StateType {
  visible?: boolean;
  positionInfo: {
    left: number;
    top: number;
  };
  animationState: string | null;
}
