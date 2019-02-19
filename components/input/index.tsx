import React, { Component } from 'react';
import classnames from 'classnames';
import PropsType, { InputTypesIF } from './PropsType';
import BasicPropType from './PropsType';

function fixControlledValue(value: InputTypesIF['textarea']['value']) {
  if (typeof value === 'undefined' || value === null) {
    return '';
  }
  return value;
}

interface RefElemIF {
  text: HTMLInputElement;
  textarea: HTMLTextAreaElement;
}

class Input<T extends keyof InputTypesIF = 'text'> extends Component<
  Merge<InputTypesIF[T], PropsType>, {}> {

  static defaultProps = {
    prefixCls: 'ui-input',
    type: 'text',
    size: null,
  };

  inputElem!: RefElemIF[T];

  inputElemRef = (elem: RefElemIF[T] | null) => {
    if (elem) {
      this.inputElem = elem;
    }
  }

  handleClassNames(props: Pick<InputTypesIF[T], 'className' | 'defaultValue'> & BasicPropType) {
    const { radius, isRadius, size, prefixCls, className } = props;
    const radiusProp = radius || isRadius;
    const classNameObject: { [x: string]: boolean } = {
      radius: !!radiusProp,
      [`size-${size}`]: !!size,
    };
    if (prefixCls) {
      classNameObject[prefixCls] = true;
    }
    if (className) {
      classNameObject[className as string] = true;
    }
    return classnames(classNameObject);
  }
  render() {
    const { props } = this;
    const {
      type,
      prefixCls,
      isRadius,
      radius,
      isDisabled,
      disabled,
      size,
      className,
      defaultValue,
      ...otherProps
    } = props;

    const cls = this.handleClassNames({
      prefixCls,
      isRadius,
      radius,
      size,
      className,
      defaultValue,
    });

    const valueObject: {
      value?: InputTypesIF[T]['value'],
      defaultValue?: InputTypesIF[T]['defaultValue'],
    } = {};

    if (defaultValue && type !== 'textarea') {
      valueObject.defaultValue = defaultValue;
    }
    if (props.hasOwnProperty('value')) {
      valueObject.value = fixControlledValue(props.value);
      // value 和 defautValue只能设置一个
      delete valueObject.defaultValue;
    }

    const input =
      type === 'textarea' ? (
        <textarea
          ref={this.inputElemRef}
          className={cls}
          disabled={disabled}
          {...otherProps}
          {...valueObject}
        >
          {defaultValue}
        </textarea>
      ) : (
          <input
            ref={this.inputElemRef}
            type={type}
            className={cls}
            disabled={disabled}
            {...otherProps}
            {...valueObject}
          />
        );

    return <span>{input}</span>;
  }
}
export default Input;
