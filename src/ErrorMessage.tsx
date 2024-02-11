import { UseInput } from "./types/Types";

export default function ErrorMessage({ props }: { props: UseInput }) {
  console.log(props.maxLengthErr.message);
  console.log(props.minLengthErr.message);


  return (
    (props.isDirty && props.isEmpty.value && (
      <p style={{ color: "red", marginBottom: "1px" }}>
        {props.isEmpty.message}
      </p>
    )) ||
    (props.isDirty && props.maxLengthErr.value && (
      <p style={{ color: "red", marginBottom: "1px" }}>
        {props.maxLengthErr.message}
      </p>
    )) ||
    (props.isDirty && props.minLengthErr.value && (
      <p style={{ color: "red", marginBottom: "1px" }}>
        {props.minLengthErr.message}
      </p>
    ))
  );
}
