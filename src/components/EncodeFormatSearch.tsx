import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import { SelectProps } from "antd/es/select";
import Axios from "axios";
import IEncodeFormat from "../types/EncodeProfile";

const SearchEncodeFormats: React.FC = () => {
  const [formats, setFormats] = useState<IEncodeFormat[] | undefined>(
    undefined
  );
  useState(() => {
    Axios.request<IEncodeFormat[]>({
      url: `${process.env.REACT_APP_API_BASEURL}/v1/internal/creator/encodes/profiles`,
      withCredentials: true,
    }).then((response) => {
      setFormats(response.data);
    });
  });

  const searchResult = (query: string) => {
    console.log(query);
    console.log(formats);
    return formats?.map((item, idx) => {
      const category = `${query}${idx}`;
      return {
        value: category,
        label: (
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>
              {item.name}
              <a>{category}</a>
            </span>
          </div>
        ),
      };
    });
  };
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  return (
    <AutoComplete
      onSearch={(value) => {
        setOptions(value ? searchResult(value) : []);
      }}
    >
      <Input.Search size="large" placeholder="Enter format name" />
    </AutoComplete>
  );
};

export default SearchEncodeFormats;
