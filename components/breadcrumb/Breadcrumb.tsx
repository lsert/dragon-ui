import React, { Component, cloneElement, ReactElement } from 'react';
import classnames from 'classnames';
import { PropsType } from './PropsType';
import BreadcrumbItem from './BreadcrumbItem';

class Breadcrumb extends Component<PropsType, any> {
  static defaultProps = {
    prefixCls: 'ui-breadcrumb',
    separator: '/',
  };

  static Item = BreadcrumbItem;

  render() {
    const {
      className, separator, children, style,
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
      <div className={cls} style={style}>
        {items}
      </div>
    );
  }
}

export default Breadcrumb;
