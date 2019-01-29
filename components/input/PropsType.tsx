import { InputHTMLAttributes, TextareaHTMLAttributes, CSSProperties } from 'react';

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
  className?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
}

export interface InputTypesIF {
  textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
  text: InputHTMLAttributes<HTMLInputElement>;
}

export default BasicPropType;
