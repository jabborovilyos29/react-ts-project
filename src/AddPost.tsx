import { ChangeEvent, FormEvent, ReactNode } from "react";
import { useAddNewPostMutation } from "./services";
import { Post, Values } from "./types/Types";
import { Button, Input, Label, Text, useId } from "@fluentui/react-components";
import { useAddPostStyle } from "./hooks/styledHooks/useStyles";

const values: Omit<Post, "id"> = {
  title: "",
  author: "",
};

export default function AddPost({
  value,
  setValue,
  editPost,
  setEditedPost,
  updatePost,
}: any): ReactNode {
  const [addPost] = useAddNewPostMutation();
  const classes = useAddPostStyle();
  const largeId = useId("input-large");

  const handleChage = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue((prev: Post | Values): Post | Values => {
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
    setEditedPost(null);
  };

  return (
    <>
      <div className={classes.root}>
        <Text size={500} font="numeric" className={classes.title}>
          {(editPost && "Edit post") || "Add post"}
        </Text>
        <form
          autoComplete="off"
          className={classes.form}
          onSubmit={(evt: FormEvent<HTMLFormElement>) => {
            handleSubmit(evt);
          }}
        >
          <div>
            <Label size="large" htmlFor={largeId}>
              Title
            </Label>
            <Input
              id={largeId}
              name="title"
              value={value.title}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                handleChage(evt);
              }}
              required
              size="large"
            />
          </div>

          <div>
            <Label size="large" htmlFor={largeId}>
              Author
            </Label>
            <Input
              id={largeId}
              name="author"
              value={value.author}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                handleChage(evt);
              }}
              required
              size="large"
            />
          </div>
          <Button type="submit" className={classes.button}>
            {(editPost && "Edit post") || "Add post"}
          </Button>
        </form>
      </div>
    </>
  );
}
