export const initialState = {
  isLoadingOrder: false,
  isLoadingUser: false,
  isLoadingRiders: false,
  orders: [],
  user: {},
  riders: [],
  error: "",

  activePage: 1,
  totalPages: 1,

  newOrder: null,
  newOrderLoading: false,
  newOrderError: "",
  newOrderSuccess: false,

  senderAddressLoading: false,
  senderAddressError: "",
  recipientAddressLoading: false,
  recipientAddressError: "",

  globalStep: null,

  assignOrderLoading: false,
  assignOrderError: false,

  cancelOrderLoading: false,
  acceptOrderLoading: false,
  rejectOrderLoading: false,
  completeOrderLoading: false,
  confirmOrderLoading: false,
  orderError: "",

  setPriceError: false,
  setPriceLoading: false
};
