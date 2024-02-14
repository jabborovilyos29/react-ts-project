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
  Spinner,
} from "@fluentui/react-components";
import { useCardStyles } from "./hooks/styledHooks/useStyles";
const values: Values = {
  title: "",
  author: "",
};
import { tokens } from "@fluentui/react-components";
import { useDispatch } from "react-redux";
import { modalOpenClose } from "./store/slices/user/userCheck";

export default function Posts() {
  const styles = useCardStyles();
  const dispatch = useDispatch();
  const [triggerLoader, setTriggerLoader] = useState(false);
  const [value, setValue] = useState<Values>(values);
  const { data, error, isLoading, isFetching } = useGetPostsQuery("");
  const [
    triggerSearchTitle,
    {
      data: resultSearch,
      isLoading: searchLoading,
      isFetching: triggerFetching,
    },
  ] = useLazyGetPostsQuery();
  const [triggerPostById, {}] = useLazyGetPostByIdQuery();
  const [updatePost, {}] = useUpdatePostMutation();
  const [editPost, setEditedPost] = useState<Values | Items | null>(null);

  const [deletePost] = useDeletePostMutation();

  const handleEdit = async (item: Items) => {
    dispatch(modalOpenClose());
    try {
      setTriggerLoader(true);
      const response = await triggerPostById({ id: item.id }).unwrap();
      setEditedPost(response);
      setValue(response);
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setTriggerLoader(false);
    }
  };

  return (
    <div style={{ minHeight: "86.6vh", padding: "40px" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "450px",
          height: "100px",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Search triggerSearchTitle={triggerSearchTitle} />
        <AddPost
          value={value}
          setValue={setValue}
          editPost={editPost}
          setEditedPost={setEditedPost}
          updatePost={updatePost}
        />
      </div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ||
        searchLoading ||
        triggerLoader ||
        isFetching ||
        triggerFetching ? (
        <Spinner
          size="huge"
          color={tokens.colorNeutralBackgroundInverted}
          className={styles.root}
        />
      ) : data ? (
        <>
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
