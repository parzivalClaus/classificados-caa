import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { trim, size } from 'lodash';

const PhoneInput = ({ className, ...props }) => {
  const [mask, setMask] = useState('(99) 99999-9999');

  return (
    <InputMask
      {...props}
      mask={mask}
      onBlur={(e) => {
        if (size(trim(e.target.value, '_')) === 14) {
          setMask('(99) 9999-9999');
        }
      }}
      onFocus={(e) => {
        if (size(trim(e.target.value, '_')) === 14) {
          setMask('(99) 99999-9999');
        }
      }}
    >
      {(inputProps) => <input {...inputProps} type="tel" />}
    </InputMask>
  );
};

export default PhoneInput;
