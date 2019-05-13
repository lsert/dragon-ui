import React from 'react';
import Alert from './Alert';
import ReactDOM from 'react-dom';

let div = document.createElement('div');
let visible = false;

class AlertExtension extends Alert {
  static defalut(option: Alert['props']) {
    document.body.appendChild(div);
    let defalutValue: Alert['props'] = {
      width: 270,
      message: '',
      closeText: '关闭',
      hideIcon: false,
      theme: 'primary',
      closable: true,
      onClose: () => { },
    };
    let object: Alert['props'];
    if (option) {
      object = Object.assign(defalutValue, option);
    } else {
      object = Object.assign({}, defalutValue);
    }
    ReactDOM.render(
      <Alert
        width={object.width}
        visible={visible}
        message={object.message}
        closeText={object.closeText}
        hideIcon={object.hideIcon}
        onClose={() => {
          object.onClose();
          AlertExtension.hide();
        }}
        closable={object.closable}
        theme={object.theme}
        locale={{
          close: 'close',
        }}
      />,
      div,
    );
  }
  static show(object: Alert['props']) {
    visible = true;
    this.defalut(object);
  }
  static hide() {
    visible = false;
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }
}

export default AlertExtension;
