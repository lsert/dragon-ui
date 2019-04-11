import React, { Component, TextareaHTMLAttributes, InputHTMLAttributes } from 'react';
import classnames from 'classnames';
import PropsType from './PropsType';

interface InputTypeIF {
  textarea: TextareaHTMLAttributes<HTMLTextAreaElement>;
  input: InputHTMLAttributes<HTMLInputElement>;
}
interface InputElemIF {
  textarea: HTMLTextAreaElement;
  input: HTMLInputElement;
}

function fixControlledValue(value: string | null | undefined) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

function isTextAreaProps(props: Input<'input'>['props'] | Input<'textarea'>['props']): props is Input<'textarea'>['props'] {
  return props.type === 'textarea';
}

function isInputProps(props: Input<'input'>['props'] | Input<'textarea'>['props']): props is Input<'input'>['props'] {
  return props.type !== 'textarea';
}

class Input<T extends 'input' | 'textarea' = 'input'> extends Component<Merge<InputTypeIF[T], PropsType>, {}> {
  static defaultProps = {
    prefixCls: 'ui-input',
    type: 'text',
    size: null,
    radius: true,
  };

  inputElem!: InputElemIF[T];

  inputElemRef = (elem: InputElemIF[T] | null) => {
    if (elem) {
      this.inputElem = elem;
    }
  }

  renderInput(
    props: Input<'input'>['props'],
    cls: string,
    disabledStatus?: boolean,
  ) {
    const { type, value, prefixCls, isRadius, isDisabled, size, defaultValue, className, disabled, radius, ...others } = props;
    return <input
      ref={this.inputElemRef}
      type={type}
      defaultValue={defaultValue}
      className={cls}
      disabled={disabledStatus}
      {...others}
    />;
  }

  renderTextarea(
    props: Input<'textarea'>['props'],
    cls: string,
    disabledStatus?: boolean,
  ) {
    const { type, value, prefixCls, isRadius, isDisabled, size, defaultValue, className, disabled, radius, ...others } = props;
    return <textarea
      {...others}
      ref={this.inputElemRef}
      className={cls}
      disabled={disabledStatus}
    >
      {defaultValue}
    </textarea>;
  }

  render() {
    const { props } = this;
    const { isDisabled, defaultValue, isRadius, prefixCls, className, size } = props;
    const disabledStatus = 'disabled' in props || isDisabled;
    const radiusStatus = 'radius' in props || isRadius;

    const cls = classnames({
      [prefixCls!]: true,
      disabled: disabledStatus,
      radius: radiusStatus,
      [className!]: !!className,
      [`size-${size}`]: !!size,
    });

    const valueObject = {
      value: defaultValue || '',
    };
    if ('value' in props) {
      valueObject.value = fixControlledValue(props.value);
    }
    if (isTextAreaProps(props)) {
      return this.renderTextarea(props, cls, disabledStatus);
    }
    if (isInputProps(props)) {
      return this.renderInput(props, cls, disabledStatus);
    }
  }
}

export default Input;
