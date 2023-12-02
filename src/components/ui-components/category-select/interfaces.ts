import { FormInstance } from "antd";

interface Children {
  value: string | React.ReactNode;
  title: string | React.ReactNode;
  tagColor: string;
  children?: Children[];
}

export interface IItem {
  checkable?: boolean;
  children?: Children[];
  selectable?: boolean;
  icon?: React.ReactNode;
  tagColor?: string;
  title: string | React.ReactNode;
  value: string | React.ReactNode;
}

export interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: FormInstance<any>;
  formatted?: boolean;
  editable: boolean;
  sortable?: boolean;
  initValues?: string[];
}
