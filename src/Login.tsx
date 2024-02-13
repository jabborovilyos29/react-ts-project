import { FormEvent, useState } from "react";
import { useGetUserQuery } from "./services";
import { useDispatch } from "react-redux";
import { login } from "./store/slices/user/userCheck";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  password: string;
}

interface CustomElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  elements: CustomElements;
}

export default function Login() {
  const [errorHandling, setErrorHandling] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useGetUserQuery({
    refetchOnMountOrArgChange: true,
  });

  function handleSubmit(evt: FormEvent<CustomForm>) {
    evt.preventDefault();
    const target = evt.currentTarget.elements;

    const user: User = {
      name: target.name.value,
      password: target.password.value,
    };

    if (data.name === user.name && data.password === user.password) {
      dispatch(login(user));
      navigate("/");
    } else {
      setErrorHandling(true);
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(evt: FormEvent<CustomForm>) => handleSubmit(evt)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-2">
              <h1>{errorHandling && "Invalid username or password"}</h1>
            </div>
            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
