import React, { Component, ReactElement, ReactNode, isValidElement } from 'react';
import Checkbox from './Checkbox';
import CheckboxProps, { GroupProps } from './PropsType';

class CheckboxGroup extends Component<GroupProps, any> {
  static defaultProps = {
    prefixCls: 'za-checkbox-group',
    onChange: () => { },
  };

  constructor(props: CheckboxGroup['props']) {
    super(props);
    this.state = {
      value:
        props.value ||
        props.defaultValue ||
        this.getCheckedValue(props.children),
    };
  }

  componentWillReceiveProps(nextProps: this['props']) {
    if ('value' in nextProps || this.getCheckedValue(nextProps.children)) {
      this.setState({
        value: nextProps.value || this.getCheckedValue(nextProps.children),
      });
    }
  }

  render() {
    const { props } = this;

    const children = React.Children.map(props.children, checkbox => {
      if (!isValidElement(checkbox)) {
        return null;
      }
      const props = (checkbox).props as CheckboxProps;
      return (
        <Checkbox
          onChange={this.onCheckboxChange}
          checked={!!(this.state.value.indexOf((checkbox as ReactElement<any>).props.value) > -1)}
          {...props}
        />
      );
    });

    return <div className={props.prefixCls}>{children}</div>;
  }

  getCheckedValue(children: ReactNode) {
    const checkedValue: ReactElement<any>[] = [];
    React.Children.forEach(children, (checkbox) => {
      if ((checkbox as ReactElement<any>).props && (checkbox as ReactElement<any>).props.checked) {
        checkedValue.push((checkbox as ReactElement<any>).props.value);
      }
    });
    return checkedValue;
  }

  onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = this.state;
    const index = value.indexOf(e.target.value);

    if (index < 0) {
      value.push(e.target.value);
    } else {
      value.splice(index, 1);
    }

    this.setState({
      value,
    });
    this.props.onChange(value);
  }
}

export default CheckboxGroup;
