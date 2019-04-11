export type size = 'xl' | 'lg' | 'sm' | 'xs';

export interface OtherProps {
  value?: string;
  defaultValue?: string;
  [propName: string]: any;
}

interface BasicPropType {
  prefixCls?: string;
  type?: string;
  size?: size;
  radius?: boolean;
  isRadius?: boolean;
  isDisabled?: boolean;
  value?: string;
  defaultValue?: string;
}

export default BasicPropType;
