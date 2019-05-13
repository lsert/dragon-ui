import { ReactElement } from 'react';
import Checkbox from './Checkbox';

export interface GroupProps {
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  onChange: (e: any) => void;
  children: ReactElement<Checkbox['props'], typeof Checkbox> | Array<ReactElement<Checkbox['props'], typeof Checkbox>>;
}

export default interface PropsType {
  prefixCls?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  className?: string;
  style?: object;
  disabled?: boolean;
  isDisabled?: boolean;
  indeterminate?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
