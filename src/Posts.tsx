import { useState } from "react";
import AddPost from "./AddPost";
import {
  useDeletePostMutation,
  useLazyGetPostByIdQuery,
  useUpdatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
} from "./services";
import Search from "./Search";
import { Values } from "./Types";
import { Items } from "./Types";
import { DefaultButton } from "@fluentui/react";
import { makeStyles, shorthands, slot } from "@fluentui/react-components";

const values: Values = {
  title: "",
  author: "",
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: "0 auto",
    width: "100%",
    maxWidth: "1220px",
    height: "100vh",
  },
  article: {
    width: "300px",
    height: "100px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  buttonGroup: {
    display: "flex",
    width: "200px",
    justifyContent: "space-between",
  },
});

export default function Posts() {
  const classes = useStyles();
  const [value, setValue] = useState<Values>(values);
  const { data, error } = useGetPostsQuery("/posts");
  const [triggerSearchTitle, { data: resultSearch, isLoading }] =
    useLazyGetPostsQuery();
  const [triggerPostById, {}] = useLazyGetPostByIdQuery();
  const [updatePost, {}] = useUpdatePostMutation();
  const [editPost, setEditedPost] = useState<Values | Items | null>(null);

  const [deletePost] = useDeletePostMutation();

  const handleEdit = async (item: Items) => {
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
        <h1 style={{ position: "absolute", zIndex: 999 }}>Loading...</h1>
      ) : data ? (
        <>
          <Search triggerSearchTitle={triggerSearchTitle} />
          <AddPost
            value={value}
            setValue={setValue}
            editPost={editPost}
            setEditedPost={setEditedPost}
            updatePost={updatePost}
          />
          <div className={classes.root}>
            {resultSearch?.map(
              (item: {
                id: number | string;
                title: string;
                author: string;
              }) => {
                return (
                  <article key={item.id} className={classes.article}>
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                      {item.author}
                    </p>
                    <div className={classes.buttonGroup}>
                      <DefaultButton
                        onClick={() => {
                          handleEdit(item);
                        }}
                      >
                        Edit
                      </DefaultButton>
                      <DefaultButton
                        onClick={() => {
                          deletePost(item.id);
                        }}
                      >
                        delete
                      </DefaultButton>
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
