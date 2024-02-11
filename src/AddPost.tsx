import { ChangeEvent, FormEvent, ReactNode } from "react";
import { useAddNewPostMutation } from "./services";
import { Post, Values } from "./types/Types";
import { Button, makeStyles, shorthands } from "@fluentui/react-components";

const values: Omit<Post, "id"> = {
  title: "",
  author: "",
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    width: "100%",
    maxWidth: "1220px",
    ...shorthands.flex("1 1 0%"),
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "48px",
    paddingBottom: "48px",
  },
  title: {
    marginTop: "40px",
    textAlign: "center",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "bold",
    letterSpacing: "-0.025em",
    color: "gray",
  },

  label: {
    display: "block",
    fontSize: " 14px",
    lineHeight: " 20px",
    fontWeight: "500",
    color: "gray",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default function AddPost({
  value,
  setValue,
  editPost,
  setEditedPost,
  updatePost,
}: any): ReactNode {
  const [addPost] = useAddNewPostMutation();
  const classes = useStyles();

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
        <div>
          <h2 className={classes.title}>
            {(editPost && "Edit post") || "Add post"}
          </h2>
        </div>

        <div style={{ marginTop: 10 }}>
          <form
            onSubmit={(evt: FormEvent<HTMLFormElement>) => {
              handleSubmit(evt);
            }}
          >
            <div>
              <div className={classes.container}>
                <label htmlFor="title" className={classes.label}>
                  Title
                </label>
              </div>
              <div style={{ marginTop: 2 }}>
                <input
                  id="title"
                  name="title"
                  value={value.title}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    handleChage(evt);
                  }}
                  required
                  className="inputAddPost"
                />
              </div>
            </div>

            <div>
              <div className={classes.container}>
                <label htmlFor="password" className={classes.label}>
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
                  className="inputAddPost"
                />
              </div>
            </div>
            <div className="mt-2"></div>
            <div>
              <Button type="submit" style={{ marginTop: 20 }}>
                {(editPost && "Edit post") || "Add post"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
