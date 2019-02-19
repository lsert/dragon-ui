import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type size = 'xl' | 'lg' | 'sm' | 'xs';

interface BasicPropType {
  prefixCls?: string;
  type?: string;
  size?: size;
  radius?: boolean;
  isRadius?: boolean;
  isDisabled?: boolean;
}

export interface InputTypesIF {
  textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
  text: InputHTMLAttributes<HTMLInputElement>;
}

export default BasicPropType;
