import Checkbox from './Checkbox';

export interface GroupProps {
  value?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  children: JSX.Element;
  onChange?: (e: any) => void;
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
  onChange: (e: any) => void;
}
