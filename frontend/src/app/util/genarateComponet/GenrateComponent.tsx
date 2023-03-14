import { TextField } from "@mui/material";

interface GenrateComponentProps {
  htmlInputType: string;
  name: string;
  label: string;
  value: any;
  onChange: () => void;
}

export function GenrateComponent({ htmlInputType, name, label, value, onChange }: GenrateComponentProps) {
  switch (htmlInputType) {
    case "number":
      return <TextField type={"number"} fullWidth key={name} name={name} label={label} value={value?.name} onChange={onChange} />;
    case "email":
      return <TextField type={"email"} fullWidth key={name} name={name} label={label} value={value?.name} onChange={onChange} />;
    case "password":
      return <TextField type={"password"} fullWidth key={name} name={name} label={label} value={value?.name} onChange={onChange} />;
    case "time":
      return (
        <TextField
          InputLabelProps={{ shrink: true, required: true }}
          type={"time"}
          fullWidth
          key={name}
          name={name}
          label={label}
          value={value?.name}
          onChange={onChange}
        />
      );
    case "date":
      return (
        <TextField
          InputLabelProps={{ shrink: true, required: true }}
          type={"date"}
          fullWidth
          key={name}
          name={name}
          label={label}
          value={value?.name}
          onChange={onChange}
        />
      );
    case "image":
      return (
        <TextField
          type="image"
          InputLabelProps={{ shrink: true, required: true }}
          fullWidth
          key={name}
          name={name}
          label={label}
          value={value?.[name]}
          onChange={onChange}
        />
      );
    case "file":
      return (
        <TextField
          type="file"
          InputLabelProps={{ shrink: true, required: true }}
          fullWidth
          key={name}
          name={name}
          label={label}
          value={value?.[name]}
          onChange={onChange}
        />
      );

      return <TextField type="url" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
    case "search":
      return <TextField type="search" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
    case "datetime-local":
      return <TextField type="datetime-local" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
    case "month":
      return <TextField type="month" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
    case "week":
      return <TextField type="week" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
    case "textarea":
      return <TextField type="textarea" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
    case "select":
      return <TextField type="select" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
    case "select-multiple":
      return <TextField type="select-multiple" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
    default:
      return <TextField type="text" fullWidth key={name} name={name} label={label} value={value?.[name]} onChange={onChange} />;
  }
}
