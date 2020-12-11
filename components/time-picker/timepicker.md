# TimePicker时间选择器
123

## 基本用法
时间选择工具

```jsx

import  { TimePicker } from 'zarm-web';

ReactDOM.render(
    <TimePicker
      isDisabled={false}
      isRadius
      style={{ width: 160 }}
    />, mountNode);
```

## API

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| radius    | 是否圆角   | boolean |   -  |    false   |
| value   | 值 | string |   -   |    -   |
| defaultValue  | string | - |   -   |    -   |
| size  | 尺寸 | - |   -   |    -   |
| style  | 样式覆盖 | - |   -   |    -   |
| placeholder  | 占位内容 | string |   -   |    -   |
| isDisabled  | 是否禁用    | boolean   | true, false   | false   |

