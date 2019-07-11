import React, { Component } from 'react';
import Modal from '../modal';
import Button from '../button';
import Icon from '../icon';
import AlertProps from './PropsType';
import zhCn from '../locale/lang/zh-cn';

interface PropsTypeIF extends AlertProps {
  locale: typeof zhCn.Alert;
}

class Alert extends Component<PropsTypeIF> {
  static defaultProps = {
    prefixCls: 'ui-alert',
    theme: 'primary',
    width: 270,
    hideIcon: false,
    closable: true,
    local: zhCn.Alert,
    // closeText: '关闭',
    onClose: () => { },
  };

  render() {
    const {
      theme, message, closable, closeText, onClose, width,
      className, visible, prefixCls, hideIcon, locale,
    } = this.props;

    let iconType = 'info-round';
    switch (theme) {
      case 'warning':
        iconType = 'warning-round';
        break;
      case 'success':
        iconType = 'right-round';
        break;
      case 'danger':
        iconType = 'wrong-round';
        break;
      default:
        break;
    }
    return (
      <Modal
        width={width}
        className={className}
        visible={visible}
      >
        <Modal.Body>
          <div className={prefixCls}>
            {!hideIcon && <Icon type={iconType} theme={theme} />}
            <span>{message}</span>
          </div>
        </Modal.Body>
        {
          closable && (
            <Modal.Footer>
              <Button onClick={onClose}>{closeText || locale.close}</Button>
            </Modal.Footer>
          )
        }
      </Modal>
    );
  }
}

export default Alert;
