import React, { Component, cloneElement, ReactElement, HTMLProps } from 'react';
import classnames from 'classnames';
import { PropsType } from './PropsType';
import BreadcrumbItem from './BreadcrumbItem';

class Breadcrumb extends Component<HTMLProps<HTMLDivElement> & PropsType, {}> {
  static defaultProps = {
    prefixCls: 'ui-breadcrumb',
    separator: '/',
  };

  static Item: typeof BreadcrumbItem = BreadcrumbItem;

  render() {
    const {
      className, separator, children, ...others
    } = this.props;

    const cls = classnames({
      'ui-breadcrumb': true,
      [className!]: !!className,
    });

    // eslint-disable-next-line
    const items = React.Children.map(children, (element, index) => {
      return cloneElement(element as ReactElement<any>, {
        separator,
        key: index,
      });
    });

    return (
      <div className={cls} {...others}>
        {items}
      </div>
    );
  }
}

export default Breadcrumb;
