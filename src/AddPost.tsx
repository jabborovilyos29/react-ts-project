import { ChangeEvent, FormEvent, ReactNode } from "react";
import { useAddNewPostMutation } from "./services";

interface Post {
  id: string;
  title: string;
  author: string;
}

const values: Omit<Post, "id"> = {
  title: "",
  author: "",
};

export default function AddPost({
  value,
  setValue,
  editPost,
  updatePost,
}: any): ReactNode {
  const [addPost] = useAddNewPostMutation();

  const handleChage = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue((prev: Post): Post => {
      return { ...prev, [evt.target.name]: evt.target.value };
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (editPost !== null) {
      const newData: Post = {
        ...value,
        id: editPost?.id,
      };

      updatePost({ data: { ...newData }, id: newData.id });
    } else {
      const newData: Post = {
        ...value,
        id: `${Math.random()}`,
      };
      addPost(newData);
    }
    setValue(values);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {(editPost && "Edit post") || "Add post"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={(evt: FormEvent<HTMLFormElement>) => {
              handleSubmit(evt);
            }}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Title
              </label>
              <div className="mt-2">
                <input
                  id="title"
                  name="title"
                  value={value.title}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    handleChage(evt);
                  }}
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
                  Author
                </label>
                <div className="text-sm"></div>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  name="author"
                  value={value.author}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    handleChage(evt);
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-2"></div>
            <div>
              <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                {(editPost && "Edit post") || "Add post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
