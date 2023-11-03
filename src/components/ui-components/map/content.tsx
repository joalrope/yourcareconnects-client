import { InfoCircleOutlined } from "@ant-design/icons";

export const content = [
  <img
    key={1}
    src="./images/geo-permission.png"
    width="94%"
    style={{ margin: "24px 0px" }}
  />,
  <p key={2}>
    <b>Please follow these steps to reset geolocation permission</b>
  </p>,
  <p key={4}>
    <b>1.-</b> To do this, click the <InfoCircleOutlined /> button on the left
    side of the address bar to open the permissions modal window.
  </p>,
  <p key={5}>
    <b>2.-</b> Then in the permissions modal window, click on button reset
    permissions and close the permissions modal window, to this click on the X
    on top right.
  </p>,
  <p key={6}>
    <b>3.-</b> When you close the permissions modal window, a bar appears with a
    reload button, click on it.
  </p>,
  <p key={7}>
    <b>4.-</b> Then again the browser will tell you that you want to know your
    location, click on the allow button.
  </p>,
];
