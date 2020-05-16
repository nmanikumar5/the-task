import React from "react";
import styles from "../styles/note.module.css";
import { STATUS_LABELS_MAP, STATUS_CODES } from "../helpers/constants";

interface IItemData {
  id?: number;
  title: string;
  comments?: string;
  status?: string;
}

interface INoteProps {
  item: IItemData;
  changeStatus: (itemData: IItemData) => void;
}

class Note extends React.Component<INoteProps> {
  render() {
    const {
      item: { title, status },
      changeStatus,
    } = this.props;
    return (
      <div
        className={`col-md-4 ${
          status === STATUS_CODES.PENDING
            ? styles.notePending
            : styles.noteSuccess
        }`}
      >
        <strong>{title}</strong>
        <p onClick={(item) => changeStatus(this.props.item)}>
          {STATUS_LABELS_MAP[status as string]}
        </p>
      </div>
    );
  }
}

export default Note;
