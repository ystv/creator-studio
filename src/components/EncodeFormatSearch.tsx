import React, { useState } from "react";
import { AutoComplete } from "antd";
import Axios from "axios";
import IEncodeFormat from "../types/EncodeProfile";

interface option {
  value: string;
  data: IEncodeFormat;
}

interface Props {
  onSelect: (item: IEncodeFormat) => void;
}

const SearchEncodeFormats: React.FC<Props> = ({ onSelect }) => {
  const [formats, setFormats] = useState<option[] | undefined>(undefined);
  useState(() => {
    Axios.request<IEncodeFormat[]>({
      url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/encodes/profiles`,
      withCredentials: true,
    }).then((response) => {
      let options = Array<option>();
      response.data.forEach((item) => {
        options.push({ value: item.name, data: item });
      });
      setFormats(options);
    });
  });
  return (
    <AutoComplete
      style={{ width: 200 }}
      options={formats}
      filterOption={(inputValue, option) =>
        option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onSelect={(value, option) => {
        onSelect(option.data);
      }}
    />
  );
};

export default SearchEncodeFormats;
