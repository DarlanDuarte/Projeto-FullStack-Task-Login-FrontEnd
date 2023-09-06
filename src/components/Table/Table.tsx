import React, { useState } from "react";

interface ITable {
  id: number;
  tasks: string;
}

const Table: React.FC<ITable> = ({ id, tasks }) => {
  return (
    <tr>
      <th> {id} </th>
      <th> {tasks} </th>
      <th>Icone</th>
    </tr>
  );
};

export default Table;
