/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu } from "antd";
// import { routes } from '../router/routes';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const SiderMenu = () => {
  // return (
  //   <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
  //     {routes.map((props, index) => {
  //       return <ItemMenu key={index} data={props} />;
  //     })}
  //   </Menu>
  // );

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1">
        <UserOutlined />
        <span>Mi perfil</span>
        <Link to="/login" />
      </Menu.Item>
      <Menu.Item key="2" icon={<VideoCameraOutlined />}>
        <span>Mis Servicios</span>
        <Link to="/register" />
      </Menu.Item>
      <Menu.Item key="3" icon={<UploadOutlined />}>
        <span>Cargar Documentos</span>
        {/* <Link to='/app/inventory' /> */}
      </Menu.Item>
    </Menu>
  );
};
