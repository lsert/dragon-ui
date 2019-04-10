import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';
import CheckboxGroup from './CheckboxGroup';

class Checkbox extends Component<PropsType, any> {
  static Group: CheckboxGroup;

  static defaultProps = {
    prefixCls: 'za-checkbox',
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

  componentWillReceiveProps(nextProps: this['props']) {
    if ('checked' in nextProps) {
      this.setState({
        checked: !!nextProps.checked,
      });
    }
  }

  _onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            onChange={this._onClick}
          />
          <span className={`${prefixCls}__inner`} />
        </span>
        {children}
      </label>
    );
  }
}

export default Checkbox;
