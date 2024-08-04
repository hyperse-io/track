---
sidebar_position: 4
---

# TypeScript

This package is written in **TypeScript**. So you don't need to create your own types. Here an example if you use **TypeScript**.

**Nota bene**: Props are defined within the `MuiColorInputProps` interface.

```tsx
import React from 'react';
import {
  MuiColorInput,
  MuiColorInputValue,
  MuiColorInputColors,
  MuiColorInputFormat,
} from 'mui-color-input';

const MyComponent = () => {
  const [value, setValue] = React.useState<MuiColorInputValue>('#ffffff');

  const handleChange = (newValue: string, colors: MuiColorInputColors) => {
    setValue(newValue);
  };

  const format: MuiColorInputFormat = 'hex';

  return (
    <MuiColorInput value={value} onChange={handleChange} format={format} />
  );
};
```
