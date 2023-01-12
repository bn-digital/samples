import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";

const Login = () => {
  const methods = useForm();

  const [email, setEmail] = useState("");

  const onError = (errors: unknown) => {
    console.log("errors:", errors);
  };
  const onSubmit = (data: FieldValues) => {
    data.email && setEmail(data.email);
  };
  useEffect(() => {
    email &&
      fetch(`http://localhost:1337/api/passwordless/send-link`, {
        body: JSON.stringify({ email }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((result) => {
          // TODO: Handle errors

          return result.json().then(console.log);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [email]);
  return (
    <FormProvider {...methods}>
      <form name={"login"} onSubmit={methods.handleSubmit(onSubmit, onError)}>
        <input type="email" {...methods.register("email")} />
        <input type="submit" value="Login" />
      </form>
    </FormProvider>
  );
};

export default Login;
