export type theme = 'default' | 'primary' | 'danger';
export type size = 'xl' | 'lg' | 'sm' | 'xs';
export type shape = 'circle' | 'round' | 'rect' | 'radius';

export default interface BasicPropsType {
  prefixCls?: string;
  theme?: theme;
  size?: size;
  icon?: string;
  block?: boolean;
  disabled?: boolean;
  shape?: shape;
  active?: boolean;
  focus?: boolean;
  loading?: boolean;
  ghost?: boolean;
  fRef?: any;
}

export interface ButtonGroupProps {
  prefixCls?: string;
  size?: size;
}
