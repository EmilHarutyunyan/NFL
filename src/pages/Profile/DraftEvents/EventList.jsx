import React, { useMemo, useState } from "react";
import { usePagination, useTable } from "react-table";
import { ActionWrap, MyEventWrap } from "./DraftEvents.styles";
import eyeIcon from "../../../assets/img/eyeIcon.png";
import penIcon from "../../../assets/img/penIcon.png";
import delIcon from "../../../assets/img/delete.png";
import { useDispatch } from "react-redux";


const EventList = ({handlePage}) => {
  const [data, setData] = useState([
    {
      event_id: "DSADA48797",
      name_event: "Tgsfsg",
      date: "12 May 2023",
      id:"123123123123213"
    },
  ]);
  const dispatch = useDispatch()
  const columns = useMemo(
    () => [
      {
        Header: "Event ID",
        accessor: "event_id",
      },
      {
        Header: "Name Event",
        accessor: "name_event",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: (props) => {
          const {
            row: { original: item },
          } = props;

          return (
            <ActionWrap>
              <div>
                <img
                  src={penIcon}
                  alt={"edit"}
                  onClick={() => 
                    handlePage({ page: "edit", id: item.id })}
                />
              </div>
              <div>
                <img src={delIcon} alt={"delete"} />
              </div>
              <div onClick={() => handlePage({ page: "view", id: item.id })}>
                <img src={eyeIcon} alt={"view"} />
              </div>
            </ActionWrap>
          );
        },
      },
    ],
    [data]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    gotoPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  return (
    <MyEventWrap>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        {data.length ? (
          <>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </>
        ) : (
          <tbody>
            <tr>
              <td colspan="6" style={{ textAlign: "center" }}>
                No data found
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </MyEventWrap>
  );
};

export default EventList;
