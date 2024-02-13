import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  useArrowNavigationGroup,
} from "@fluentui/react-components";
import { useGetPostsQuery } from "./services";

const columns = [
  { columnKey: "title", label: "Title" },
  { columnKey: "author", label: "Author" },
];

export const CellNavigation = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const { data: items } = useGetPostsQuery("");

  return (
    <div style={{ width: "100%", minHeight: "86.6vh" }}>
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
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};
