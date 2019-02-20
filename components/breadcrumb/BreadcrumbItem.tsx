import React, { Component, HTMLAttributes } from 'react';
import classnames from 'classnames';
import { ItemPropsType } from './PropsType';

interface PropsIF extends ItemPropsType, HTMLAttributes<HTMLDivElement> { }

class BreadcrumbItem extends Component<PropsIF, {}> {
  static defaultProps = {
    separator: '/',
  };

  render() {
    const { className, href, separator, children, ...others } = this.props;

    const cls = classnames({
      [className!]: !!className,
    });

    const text =
      'href' in this.props ? (
        <a className="ui-breadcrumb-link" href={href}>
          {children}
        </a>
      ) : (
          <span className="ui-breadcrumb-link">{children}</span>
        );

    return (
      <span className={cls} {...others}>
        {text}
        <span className="ui-breadcrumb-separator">{separator}</span>
      </span>
    );
  }
}

export default BreadcrumbItem;
