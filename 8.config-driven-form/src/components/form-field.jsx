import { CheckBox, DatePicker, RadioButton, Slider, TextField } from "./form-elements";

const componentMapping = {
  TEXT_FIELD: TextField,
  CHECKBOX: CheckBox,
  RADIO_BUTTON: RadioButton,
  DATE_PICKER: DatePicker,
  SLIDER: Slider,
}

const FormField = ({field, value, onChange}) => {
  const Component = componentMapping[field.component];
  
  if (Component) {
    return (
      <>
        <Component {...field} onChange={value => onChange(field.name, value)} />
        {field?.error && <p style={{color: 'red'}}>{field.error}</p>}
      </>
    )
  }

  return null;
}

export default FormField