import TextField from "@mui/material/TextField";

type Props = {
  name: string;
  type: string;
  label: string;
};
const CustomizedInputField = (props: Props) => {
  return (
    <TextField
      margin= "normal"
      InputLabelProps={{ style: { color: "white" } }}
      InputProps={{ style: { color: "white", borderRadius: 10, fontSize: 20, } }}
      className={props.name}
      label={props.label}
      type={props.type}
    />
  );
};

export default CustomizedInputField;
