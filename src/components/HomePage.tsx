import React from "react";
import { userService } from "../services";
import { compose } from "redux";
import { connect } from "react-redux";
import Note from "./Note";
import { addItem, changeStatus } from "../redux/item-reducer";
import AddItemDlg from "./AddItemDlg";
import { LABELS } from "../helpers/constants";

interface IItemData {
  id?: number;
  title: string;
  comments?: string;
  status?: string;
}

interface IHomePageProps {
  itemList: any;
  history?: any;
  addItem: (itemData: IItemData) => void;
  changeStatus: (itemData: IItemData) => void;
}

interface IHomePageState {
  user: any;
  users: any;
  openAddItemDlg: boolean;
  itemList: any;
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
  constructor(props: IHomePageProps) {
    super(props);
    this.state = {
      user: {},
      users: [],
      openAddItemDlg: false,
      itemList: props.itemList,
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem("user") as any),
      users: { loading: true },
    });
    userService
      .getAll()
      .then((users: IHomePageState) => this.setState({ users }));
  }

  handleLogout = () => {
    userService.logout();
    this.props.history.push("/");
  };

  openAddItemDlg = (openAddItemDlg: boolean) => {
    this.setState({
      openAddItemDlg,
    });
  };

  componentDidUpdate(prevProps: IHomePageProps) {
    if (this.props.itemList !== prevProps.itemList) {
      this.setState({
        itemList: this.props.itemList,
      });
    }
  }

  changeStatus = (itemData: IItemData) => {
    this.props.changeStatus(itemData);
    this.openAddItemDlg(false);
  };

  render() {
    const { openAddItemDlg, itemList } = this.state;
    const { addItem } = this.props;
    return (
      <>
        <div className="container" style={{ height: "400px" }}>
          {itemList.length &&
            itemList.map((item: IItemData, index: number) => (
              <Note key={index} item={item} changeStatus={this.changeStatus} />
            ))}
        </div>
        <p style={{ textAlign: "center" }}>
          <button
            className="btn btn-success"
            onClick={() => this.openAddItemDlg(true)}
          >
            {LABELS.ADD_ITEM}
          </button>
        </p>
        {openAddItemDlg && (
          <AddItemDlg
            open={openAddItemDlg}
            onClose={() => this.openAddItemDlg(false)}
            handleSave={addItem}
            itemCount={itemList.length}
          />
        )}
        <p>
          <button className="btn btn-primary" onClick={this.handleLogout}>
            {LABELS.LOGOUT}
          </button>
        </p>
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { itemList } = state.itemState;
  return {
    itemList,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  addItem: (itemData: IItemData) => dispatch(addItem(itemData)),
  changeStatus: (item: IItemData) => dispatch(changeStatus(item)),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(HomePage);
