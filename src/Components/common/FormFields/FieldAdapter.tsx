import * as React from 'react'
import FormField from 'grommet/components/FormField'

const fieldAdapter = InputField => ({
  input: { value, onChange, onFocus, onBlur },
  meta: { error, touched },
  label,
  extra = {},
  output,
  type,
  useCustomChangeHandler,
}) => {
  const nativeChangeHandler = event => onChange(event.target.value)
  const customChangeHandler = val => onChange(output ? output(val) : val)

  const changeHandlerKey = type === 'text' ? 'onDOMChange' : 'onChange'

  const changeHandler = {
    [changeHandlerKey]: useCustomChangeHandler
      ? customChangeHandler
      : nativeChangeHandler,
  }

  return (
    <FormField label={label} error={touched ? error : null}>
      <InputField
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        {...changeHandler}
        {...extra}
      />
    </FormField>
  )
}

export default fieldAdapter
