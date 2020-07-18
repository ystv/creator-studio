import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { Typography, Button, Table, Space, Tag } from "antd";
import { DragDropContext, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Axios from "axios";
const { Title } = Typography;

const Playlist = () => {
  return <Title>YSTV Rewind 2019</Title>;
};

const Draggy = () => {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps}
    const style = { ...restProps.style, cursor: 'move'};
    let dragingIndex = -1;
    if (isOver) {
        if (restProps.index > dragingIndex)
    }
}

export default Playlist;
