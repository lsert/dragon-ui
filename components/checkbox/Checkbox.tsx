import React, { Component, ChangeEvent } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import CheckboxGroup from './CheckboxGroup';

class Checkbox extends Component<PropsType, any> {
  static Group: typeof CheckboxGroup = CheckboxGroup;

  static defaultProps = {
    prefixCls: 'ui-checkbox',
    defaultChecked: false,
    isDisabled: false,
    indeterminate: false,
    onChange: () => { },
  };

  constructor(props: PropsType) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked,
    };
  }

  componentWillReceiveProps(nextProps: PropsType) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  onClick = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
    this.props.onChange(e);
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      value,
      disabled,
      isDisabled,
      className,
      children,
      style,
      indeterminate,
    } = props;
    const disabledStatus = disabled || isDisabled;
    const cls = classnames({
      [prefixCls!]: true,
      checked: this.state.checked,
      disabled: disabledStatus,
      indeterminate: this.state.checked && indeterminate,
      [className!]: !!className,
    });

    return (
      <label style={style}>
        <span className={cls}>
          <input
            className={`${prefixCls}-input`}
            type="checkbox"
            value={value}
            checked={this.state.checked}
            disabled={disabledStatus}
            onChange={this.onClick}
          />
          <span className={`${prefixCls}-inner`} />
        </span>
        {children}
      </label>
    );
  }
}

export default Checkbox;
