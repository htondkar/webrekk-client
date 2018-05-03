import Button from 'grommet/components/Button'
import DateTime from 'grommet/components/DateTime'
import Footer from 'grommet/components/Footer'
import Form from 'grommet/components/Form'
import Select from 'grommet/components/Select'
import TextInput from 'grommet/components/TextInput'
import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required, date } from 'redux-form-validators'

import fieldAdapter from '../../../common/FormFields/FieldAdapter'
import './customer-form.sass'

const handleSelectOutput = selectedOption =>
  selectedOption ? selectedOption.option.value : undefined

const CustomerCreateUpdateForm = ({ handleSubmit, editMode, onRemove }) => (
  <Form onSubmit={handleSubmit} className="customer-form">
    <Field
      name="firstName"
      useCustomChangeHandler={false}
      type="text"
      component={fieldAdapter(TextInput)}
      label="First Name"
      validate={[required()]}
    />

    <Field
      name="lastName"
      type="text"
      useCustomChangeHandler={false}
      component={fieldAdapter(TextInput)}
      label="Last Name"
      validate={[required()]}
    />

    <Field
      name="gender"
      component={fieldAdapter(Select)}
      type="select"
      label="Gender"
      validate={[required()]}
      useCustomChangeHandler={true}
      output={handleSelectOutput}
      extra={{
        options: [{ value: 'm', label: 'Male' }, { value: 'w', label: 'Female' }],
      }}
    />

    <Field
      name="birthday"
      type="date"
      useCustomChangeHandler={true}
      component={fieldAdapter(DateTime)}
      label="Birthday"
      validate={[required(), date({ format: 'yyyy-mm-dd' })]}
      extra={{ format: 'YYYY-MM-DD' }}
    />

    <Footer pad={{ vertical: 'medium' }}>
      <Button label={editMode ? 'Save' : 'Create'} type="submit" />
      {editMode && (
        <Button
          label="Delete"
          secondary={true}
          plain={true}
          type="button"
          onClick={onRemove}
        />
      )}
    </Footer>
  </Form>
)

export default reduxForm({ form: 'customerCreateUpdateForm' })(CustomerCreateUpdateForm)
