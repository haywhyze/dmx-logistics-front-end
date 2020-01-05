import React from "react";
import { Grid, Header } from "semantic-ui-react";
import _ from "lodash";
import Axios from "axios";
import baseUrl from "../../api/baseUrl";
import OrderInfo from "./OrderInfo";
import ChangePrice from "./ChangePrice";
import PaymentInfo from "./PaymentInfo";
import AssignRider from "./AssignRider";
import { formatToNaira } from "./RenderOrder";
import DeliveryInfo from "./DeliveryInfo";
import ButtonGroup from "./ButtonGroup";
import OrderActionsConfirm from "./OrderActionsConfirm";

let errorMess, priceError;
const token = localStorage.getItem("dmx_logistics_token");
class OrderDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rider: "",
      price: "",
      isSubmittingPrice: false,
      isSubmittingConfirm: false,
      isSubmittingComplete: false,
      isSubmittingCancel: false,
      isSubmittingAccept: false,
      isSubmittingReject: false,
      isSubmitting: false,
      openConfirm: false,
      openCancel: false,
      openComplete: false,
      openAccept: false,
      openReject: false
    };
  }

  showConfirm = () => this.setState({ openConfirm: true });
  closeConfirm = () => this.setState({ openConfirm: false });

  showCancel = () => this.setState({ openCancel: true });
  closeCancel = () => this.setState({ openCancel: false });

  showComplete = () => this.setState({ openComplete: true });
  closeComplete = () => this.setState({ openComplete: false });

  showAccept = () => this.setState({ openAccept: true });
  closeAccept = () => this.setState({ openAccept: false });

  showReject = () => this.setState({ openReject: true });
  closeReject = () => this.setState({ openReject: false });

  handleCancel = () => {
    this.setState({
      isSubmittingCancel: true,
      openCancel: false
    });

    Axios({
      url: `${baseUrl}/api/v1/orders/${this.props.order.id}/cancel`,
      method: "patch",
      headers: { "auth-token": token },
      data: {
        status: "cancelled"
      }
    })
      .then(response => {
        this.setState({
          isSubmittingCancel: false
        });
        window.location.reload();
      })
      .catch(error => console.log(error.response));
  };

  handleConfirm = () => {
    this.setState({
      isSubmittingConfirm: true,
      openConfirm: false
    });

    Axios({
      url: `${baseUrl}/api/v1/orders/${this.props.order.id}/confirm`,
      method: "patch",
      headers: { "auth-token": token },
      data: {
        status: "confirmed"
      }
    })
      .then(response => {
        this.setState({
          isSubmittingConfirm: false
        });
        window.location.reload();
      })
      .catch(error => console.log(error.response));
  };

  handleComplete = () => {
    this.setState({
      isSubmittingComplete: true,
      openComplete: false
    });

    Axios({
      url: `${baseUrl}/api/v1/orders/${this.props.order.id}/complete`,
      method: "patch",
      headers: { "auth-token": token },
      data: {
        status: "delivered"
      }
    })
      .then(response => {
        this.setState({
          isSubmittingComplete: true
        });
        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  handleAccept = () => {
    this.setState({
      isSubmittingAccept: true,
      openAccept: false
    });

    Axios({
      url: `${baseUrl}/api/v1/orders/${this.props.order.id}/accept`,
      method: "patch",
      headers: { "auth-token": token },
      data: {
        status: "in transit"
      }
    })
      .then(response => {
        this.setState({
          isSubmittingAccept: true
        });
        window.location.reload();
      })
      .catch(error => console.log(error));
  };

  handleReject = () => {
    this.setState({
      isSubmittingReject: true,
      openReject: false
    });

    Axios({
      url: `${baseUrl}/api/v1/orders/${this.props.order.id}/reject`,
      method: "patch",
      headers: { "auth-token": token },
      data: {
        riderId: null
      }
    })
      .then(response => {
        this.setState({
          isSubmittingReject: true
        });
        window.location.href = "/all";
      })
      .catch(error => console.log(error.response.data));
  };

  handleChange = (e, { value }) => {
    this.setState({
      rider: value
    });
  };

  handlePriceChange = (e, { value }) => {
    this.setState({
      price: value
    });
  };

  handlePriceSubmit = () => {
    this.setState({
      isSubmittingPrice: true
    });

    Axios({
      url: `${baseUrl}/api/v1/orders/${this.props.order.id}/price`,
      method: "patch",
      headers: { "auth-token": token },
      data: {
        price: this.state.price
      }
    })
      .then(response => {
        this.setState({
          isSubmittingPrice: false
        });
        window.location.reload();
      })
      .catch(error => {
        if (error.response && error.response.data)
          priceError = error.response.data.error;
        this.setState({
          isSubmittingPrice: false
        });
      });
  };

  handleSubmit = () => {
    this.setState({
      isSubmitting: true
    });

    Axios({
      url: `${baseUrl}/api/v1/orders/${this.props.order.id}/assign`,
      method: "patch",
      headers: { "auth-token": token },
      data: {
        riderId: this.state.rider
      }
    })
      .then(response => {
        this.setState({
          isSubmitting: false
        });
        // alert(JSON.stringify(response.data.data))
        window.location.reload();
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error === "No values provided for riderId"
        )
          errorMess = "No rider selected";
        this.setState({
          isSubmitting: false
        });
      });
  };

  render() {
    const {
      openCancel,
      openComplete,
      openConfirm,
      openAccept,
      openReject,
      isSubmittingCancel,
      isSubmittingComplete,
      isSubmittingConfirm,
      isSubmittingAccept,
      isSubmittingReject
    } = this.state;

    const riderOptions = _.map(this.props.riders, rider => ({
      key: rider.id,
      text: `${rider.firstName} ${rider.lastName}`,
      value: rider.id
    }));

    return (
      <>
        {this.props.order && (
          <div
            className="main"
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              marginTop: "1em"
            }}
          >
            <Header
              as="h3"
              dividing
              content="Order Details"
              subheader={this.props.order.id}
            />
            <Grid stackable columns={3}>
              <OrderInfo
                itemDescription={this.props.order.itemDescription}
                status={this.props.order.status}
                createdAt={this.props.order.createdAt}
              />

              <ChangePrice
                userRole={this.props.user.userRole}
                status={this.props.order.status}
                handlePriceChange={this.handlePriceChange}
                handlePriceSubmit={this.handlePriceSubmit}
                isSubmittingPrice={this.state.isSubmittingPrice}
                priceError={priceError}
              />

              <PaymentInfo
                paymentStatus={this.props.order.paymentStatus}
                price={formatToNaira(Number(this.props.order.price))}
              />

              <AssignRider
                riderOptions={riderOptions}
                errorMess={errorMess}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                isSubmitting={this.isSubmitting}
                userRole={this.props.user.userRole}
                status={this.props.order.status}
                rider={this.props.order.rider}
              />

              <DeliveryInfo
                senderName={this.props.order.senderName}
                senderPhone={this.props.order.senderPhone}
                senderAddress={this.props.order.senderAddress}
                recipientName={this.props.order.recipientName}
                recipientPhone={this.props.order.recipientPhone}
                recipientAddress={this.props.order.recipientAddress}
              />

              <ButtonGroup
                isSubmittingCancel={isSubmittingCancel}
                isSubmittingReject={isSubmittingReject}
                isSubmittingConfirm={isSubmittingConfirm}
                isSubmittingAccept={isSubmittingAccept}
                isSubmittingComplete={isSubmittingComplete}
                showCancel={this.showCancel}
                showAccept={this.showAccept}
                showComplete={this.showComplete}
                showReject={this.showReject}
                showConfirm={this.showConfirm}
                order={this.props.order}
                user={this.props.user}
              />
            </Grid>
          </div>
        )}
        <OrderActionsConfirm
          openConfirm={openConfirm}
          closeConfirm={this.closeConfirm}
          handleConfirm={this.handleConfirm}
          openComplete={openComplete}
          closeComplete={this.closeComplete}
          handleComplete={this.handleComplete}
          openCancel={openCancel}
          closeCancel={this.closeCancel}
          handleCancel={this.handleCancel}
          openAccept={openAccept}
          closeAccept={this.closeAccept}
          handleAccept={this.handleAccept}
          openReject={openReject}
          closeReject={this.closeReject}
          handleReject={this.handleReject}
        />
      </>
    );
  }
}
export default OrderDetails;
