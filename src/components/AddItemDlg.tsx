import React from "react";
import "react-responsive-modal/styles.css";
import styles from "../styles/note.module.css";
import { STATUS_CODES, LABELS } from "../helpers/constants";
import Modal from "react-responsive-modal";

interface IAddItemDlgProps {
  open: boolean;
  onClose: () => void;
  itemCount: number;
  handleSave: (itemData: any) => void;
}

interface IAddItemDlgState {
  title: string;
  comments: string;
}

class AddItemDlg extends React.Component<IAddItemDlgProps, IAddItemDlgState> {
  constructor(props: IAddItemDlgProps) {
    super(props);

    this.state = {
      title: "",
      comments: "",
    };
  }

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({ [name]: value } as any);
  };

  handleSave = () => {
    const { itemCount } = this.props;
    const { title, comments } = this.state;
    const itemData = {
      title: title ? title : `Item ${itemCount + 1}`,
      comments,
      status: STATUS_CODES.PENDING,
    };
    this.props.handleSave(itemData);
    this.props.onClose();
  };

  render() {
    const { title, comments } = this.state;
    const { open, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose}>
        <div className={styles.addItemDlgDiv}>
          <p>Enter item Details</p>
          <div className={styles.inputDiv}>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Item Name"
              value={title}
              onChange={this.handleChange}
            />
          </div>
          <div className={styles.inputDiv}>
            <textarea
              placeholder="Comments"
              name="Comments"
              onChange={this.handleChange}
              // Some issue with TypeScript
              // rows="4"
              // cols="50"
              value={comments}
            />
          </div>
          <div style={{ width: "100%" }}>
            <div style={{ float: "right" }}>
              <button
                type="button"
                className="btn btn-light"
                onClick={onClose}
                style={{ marginRight: "10px" }}
              >
                {LABELS.CANCEL}
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={this.handleSave}
              >
                {LABELS.SAVE}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddItemDlg;
