import { ChangeEvent, FormEvent, ReactElement, ReactNode } from "react";
import { useAddNewPostMutation } from "./services";
import { Post, Values } from "./types/Types";
import { Button, Input, Label, Text, useId } from "@fluentui/react-components";
import { useAddPostStyle } from "./hooks/styledHooks/useStyles";
import { ControllingOpenAndClose } from "./modal/Modal";
import { useDispatch } from "react-redux";
import { modalOpenClose } from "./store/slices/user/userCheck";

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
}: any): ReactNode | ReactElement {
  const [addPost] = useAddNewPostMutation();
  const dispatch = useDispatch();
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
    dispatch(modalOpenClose());
    setEditedPost(null);
  };

  const handleClose = () => {
    dispatch(modalOpenClose());
    setValue(values);
    setEditedPost(null);
  };

  return (
    <>
      <div className={classes.root}>
        <ControllingOpenAndClose>
          <>
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
              <Button
                className={classes.button}
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </Button>
            </form>
          </>
        </ControllingOpenAndClose>
      </div>
    </>
  );
}
