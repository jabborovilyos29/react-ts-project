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
import { Values } from "./types/Types";
import { Items } from "./types/Types";
import {
  Body1,
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
} from "@fluentui/react-components";
import { useCardStyles } from "./hooks/styledHooks/useStyles";

const values: Values = {
  title: "",
  author: "",
};

export default function Posts() {
  const styles = useCardStyles();
  const [value, setValue] = useState<Values>(values);
  const { data, error, isLoading } = useGetPostsQuery("/posts");
  const [triggerSearchTitle, { data: resultSearch }] = useLazyGetPostsQuery();
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
          <div className={styles.root}>
            {resultSearch?.map(
              (item: {
                id: number | string;
                title: string;
                author: string;
              }) => {
                return (
                  <Card key={item.id} className={styles.card}>
                    <CardHeader
                      header={<Body1>{item.title}</Body1>}
                      description={<Caption1>{item.author}</Caption1>}
                    />
                    <CardFooter>
                      <Button
                        onClick={() => {
                          handleEdit(item);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => {
                          deletePost(item.id);
                        }}
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                );
              },
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
