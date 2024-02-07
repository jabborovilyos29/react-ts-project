import { useState } from "react";
import AddPost from "./AddPost";
import {
  useGetPostsQuery,
  useDeletePostMutation,
  useLazyGetPostByIdQuery,
  useUpdatePostMutation,
} from "./services";
import Search from "./Search";

interface Values {
  title: string;
  author: string;
}

interface Items {
  id: any;
  title: string;
  author: string;
}

const values: Values = {
  title: "",
  author: "",
};

export default function Posts() {
  const [editPost, setEditedPost] = useState(null);
  const [value, setValue] = useState<Values>(values);
  const { data, isLoading, error } = useGetPostsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [searchResult, setSearchResult] = useState<[Items] | null>(null);

  const [triggerPostById, {}] = useLazyGetPostByIdQuery();

  const [updatePost, {}] = useUpdatePostMutation();

  const [deletePost] = useDeletePostMutation();

  const handleEdit = async (item: any) => {
    try {
      const response = await triggerPostById({ id: item.id }).unwrap();
      setEditedPost(response);
      setValue(response);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <Search setSearchResult={setSearchResult} />
          <AddPost
            value={value}
            setValue={setValue}
            editPost={editPost}
            updatePost={updatePost}
          />
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {(searchResult !== null &&
              searchResult?.map(
                (item: { id: number; title: string; author: string }) => {
                  return (
                    <article
                      key={item.id}
                      className="flex max-w-xl flex-col items-start justify-between ml-10"
                    >
                      <div className="flex items-center gap-x-4 text-xs"></div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <a href={item.title}>
                            <span className="absolute inset-0" />
                            {item.title}
                          </a>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {item.author}
                        </p>
                      </div>
                      <div className="flex m-1 justify-between w-1/2">
                        <button
                          onClick={() => {
                            handleEdit(item);
                          }}
                          className="flex ml justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deletePost(item.id);
                          }}
                          className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          delete
                        </button>
                      </div>
                    </article>
                  );
                },
              )) ||
              data?.map(
                (item: { id: number; title: string; author: string }) => {
                  return (
                    <article
                      key={item.id}
                      className="flex max-w-xl flex-col items-start justify-between ml-10"
                    >
                      <div className="flex items-center gap-x-4 text-xs"></div>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <a href={item.title}>
                            <span className="absolute inset-0" />
                            {item.title}
                          </a>
                        </h3>
                        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                          {item.author}
                        </p>
                      </div>
                      <div className="flex m-1 justify-between w-1/2">
                        <button
                          onClick={() => {
                            handleEdit(item);
                          }}
                          className="flex ml justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            deletePost(item.id);
                          }}
                          className="flex  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          delete
                        </button>
                      </div>
                    </article>
                  );
                },
              )}
          </div>
        </>
      ) : null}
    </div>
  );
}
