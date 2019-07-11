import React from 'react';
import ReactDOM from 'react-dom';
import Alert from './Alert';
import AlertProps from './PropsType';

const div = document.createElement('div');
let visible = false;

class AlertExtension extends Alert {
  static defalut(option: MergeProps<typeof Alert, AlertProps>) {
    document.body.appendChild(div);
    const defalutValue: Required<Pick<typeof option, 'width' | 'message' | 'closeText' | 'hideIcon' | 'theme' | 'closable' | 'onClose'>> = {
      width: 270,
      message: 'hello world',
      closeText: '关闭',
      hideIcon: false,
      theme: 'default',
      closable: true,
      onClose: () => { },
    };

    const object = option ? { ...defalutValue, ...option } : { ...defalutValue };

    return new Promise((resolve) => {
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
            resolve(true);
          }}
          closable={object.closable}
          theme={object.theme}
          locale={{
            close: 'close',
          }}
        />,
        div,
      );
    });
  }

  static show(props: MergeProps<typeof Alert, AlertProps>) {
    visible = true;
    this.defalut(props);
  }

  static hide() {
    visible = false;
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  }
}

export default AlertExtension;
