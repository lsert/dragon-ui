export interface GroupProps {
  prefixCls?: string;
  value?: string;
  defaultValue?: string;
  onChange: (e: any) => void;
}

export default interface PropsType {
  prefixCls: string;
  defaultChecked?: boolean;
  indeterminate: boolean;
  isDisabled?: boolean;
}
