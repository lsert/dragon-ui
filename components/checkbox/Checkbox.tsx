import React, { Component, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import CheckboxGroup from './CheckboxGroup';

interface StateIF {
  checked: boolean;
}

class Checkbox extends Component<InputHTMLAttributes<HTMLInputElement> & PropsType, StateIF> {
  static Group: CheckboxGroup;

  static defaultProps = {
    prefixCls: 'za-checkbox',
    indeterminate: false,
    onChange: () => { },
  };

  state: StateIF;
  constructor(props: Checkbox['props']) {
    super(props);
    this.state = {
      checked: props.checked || props.defaultChecked || false,
    };
  }

  componentWillReceiveProps(nextProps: this['props']) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = this.state;
    this.setState({
      checked: !checked,
    });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    const { props } = this;
    const {
      prefixCls,
      isDisabled,
      className,
      children,
      style,
      indeterminate,
      ...others
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
            {...others}
            className={`${prefixCls}__input`}
            type="checkbox"
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
