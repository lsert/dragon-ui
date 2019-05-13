import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import CheckboxGroup from './CheckboxGroup';

interface StateIF {
  checked?: boolean;
}

class Checkbox extends Component<PropsType, StateIF> {
  static Group = CheckboxGroup;

  static defaultProps = {
    prefixCls: 'za-checkbox',
    defaultChecked: false,
    isDisabled: false,
    indeterminate: false,
    onChange: () => { },
  };

  state = {
    checked: this.props.checked || this.props.defaultChecked,
  };

  componentWillReceiveProps(nextProps: this['props']) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
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
      isDisabled,
      className,
      children,
      style,
      indeterminate,
    } = props;
    const disabled = 'disabled' in props || isDisabled;
    const cls = classnames({
      [prefixCls!]: true,
      'is-checked': this.state.checked,
      'is-disabled': disabled,
      'is-indeterminate': this.state.checked && indeterminate,
      [className!]: !!className,
    });

    return (
      <label style={style}>
        <span className={cls}>
          <input
            className={`${prefixCls}__input`}
            type="checkbox"
            value={value}
            checked={this.state.checked}
            disabled={disabled}
            onChange={this.onChange}
          />
          <span className={`${prefixCls}__inner`} />
        </span>
        {children}
      </label>
    );
  }
}

export default Checkbox;
