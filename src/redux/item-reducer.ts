import { STATUS_CODES } from "../helpers/constants";

interface IItemData {
  id?: number;
  title: string;
  comments?: string;
  status?: string;
}

export const ACTION_TYPES = {
  ADD_ITEM: "ADD_ITEM",
  CHANGE_STATUS: "CHANGE_STATUS",
};

const initialState = {
  itemList: [
    {
      id: 1,
      title: "Item 1",
      comments: "Comments",
      status: STATUS_CODES.PENDING,
    },
    {
      id: 2,
      title: "Item 2",
      comments: "Comments",
      status: STATUS_CODES.COMPLETED,
    },
  ],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ITEM:
      return { ...state, itemList: action.payload };
    case ACTION_TYPES.CHANGE_STATUS:
      return { ...state, itemList: action.payload };
    default:
      return state;
  }
};

export const addItem = (item: IItemData) => (dispatch: any, getState: any) => {
  const { itemList } = getState().itemState;
  item.id = itemList.length + 1;
  itemList.push(item);
  dispatch({
    type: ACTION_TYPES.ADD_ITEM,
    payload: itemList,
  });
};

export const changeStatus = (item: IItemData) => (
  dispatch: any,
  getState: any
) => {
  const { itemList } = getState().itemState;
  const modifiedItem = itemList.find(
    (eachItem: IItemData) => eachItem.id === item.id
  );
  modifiedItem.status =
    item.status === STATUS_CODES.PENDING
      ? STATUS_CODES.COMPLETED
      : STATUS_CODES.PENDING;
  dispatch({
    type: ACTION_TYPES.CHANGE_STATUS,
    payload: itemList,
  });
};
