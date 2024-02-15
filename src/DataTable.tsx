import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogBody,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  useArrowNavigationGroup,
  useFocusableGroup,
  Button,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import {
  useDeletePostMutation,
  useGetPostsQuery,
  useLazyGetPostByIdQuery,
  useUpdatePostMutation,
} from "./services";
import { useTableStyles } from "./hooks/styledHooks/useStyles";
import { DeleteRegular, EditRegular } from "@fluentui/react-icons";
import { modalOpenClose } from "./store/slices/user/userCheck";
import { Items, Values } from "./types/Types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import AddPost from "./AddPost";

const columns = [
  { columnKey: "title", label: "Title" },
  { columnKey: "author", label: "Author" },
  { columnKey: "edit/delete", label: "Edit / Delete" },
];

const values: Values = {
  title: "",
  author: "",
};

export const DataTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const classes = useTableStyles();
  const focusableGroupAttr = useFocusableGroup();

  const dispatch = useDispatch();
  const [value, setValue] = useState<Values>(values);
  const { data: items } = useGetPostsQuery("");
  const [triggerPostById, {}] = useLazyGetPostByIdQuery();
  const [updatePost, {}] = useUpdatePostMutation();
  const [editPost, setEditedPost] = useState<Values | Items | null>(null);

  const [deletePost] = useDeletePostMutation();

  const handleEdit = async (item: Items) => {
    dispatch(modalOpenClose());
    try {
      const response = await triggerPostById({ id: item.id }).unwrap();
      setEditedPost(response);
      setValue(response);
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  return (
    <div className={classes.root}>
      <AddPost
        value={value}
        setValue={setValue}
        editPost={editPost}
        setEditedPost={setEditedPost}
        updatePost={updatePost}
      />
      <Table
        {...keyboardNavAttr}
        role="grid"
        aria-label="Table with grid keyboard navigation"
      >
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
            <TableHeaderCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map(
            (item: { id: number | string; title: string; author: string }) => (
              <TableRow key={item.id}>
                <TableCell tabIndex={0} role="gridcell">
                  <TableCellLayout>{item.title}</TableCellLayout>
                </TableCell>
                <TableCell tabIndex={0} role="gridcell">
                  <TableCellLayout>{item.author}</TableCellLayout>
                </TableCell>
                <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                  <TableCellLayout>
                    <>
                      <Button
                        icon={<EditRegular />}
                        aria-label="Edit"
                        onClick={() => {
                          handleEdit(item);
                        }}
                      />
                      <Button
                        icon={<DeleteRegular />}
                        aria-label="Delete"
                        {...restoreFocusTargetAttribute}
                        onClick={() => {
                          setOpen(true);
                        }}
                      />

                      <Dialog
                        open={open}
                        onOpenChange={(_, data) => {
                          setOpen(data.open);
                        }}
                      >
                        <DialogSurface>
                          <DialogBody>
                            <DialogTitle>Delete post</DialogTitle>
                            <DialogContent>
                              Are you sure to delete this post ?
                            </DialogContent>

                            <DialogActions>
                              <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Close</Button>
                              </DialogTrigger>
                              <Button
                                appearance="primary"
                                onClick={() => {
                                  deletePost(item.id);
                                  setOpen(false);
                                }}
                              >
                                Delete post
                              </Button>
                            </DialogActions>
                          </DialogBody>
                        </DialogSurface>
                      </Dialog>
                    </>
                  </TableCellLayout>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};
