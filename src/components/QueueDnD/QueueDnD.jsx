import React, { useEffect, useState } from "react";
// Styles
import { DragWrap, PlayerItem, Wrapper } from "./QueueDnD.styles";


import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { DragIcon } from "../Icons/Icons";
import { useSelector } from "react-redux";
import { selectLiveDraft, setQueuePlayer } from "../../app/features/liveDraft/liveDraftSlice";
import { useDispatch } from "react-redux";


const Item = ({ index, item, dragItemStyle = {}, children }) => (
  <Draggable index={index} draggableId={item.id}>
    {(provided, snapshot) => (
      <DragWrap
        ref={provided.innerRef}
        {...provided.draggableProps}
        // {...provided.dragHandleProps}
        style={{
          // default item style
          // padding: "11px 20px",
          // default drag style
          ...provided.draggableProps.style,
          // customized drag style
          ...(snapshot.isDragging ? dragItemStyle : {}),
        }}
      >
        {children(item, index, provided.dragHandleProps)}
      </DragWrap>
    )}
  </Draggable>
);

const List = ({ list, onDragEnd, dragListStyle = {}, ...props }) => (
  <DragDropContext onDragEnd={onDragEnd} className="miban">
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            ...(snapshot.isDraggingOver ? dragListStyle : {}),
          }}
        >
          {list.map((item, index) => (
            <Item key={item.id} index={index} item={item} {...props} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const QueueDnD = ({ queuePlayers = [], playerQueueHeight, queueHeight }) => {
  // const [list, setList] = useState(queuePlayers);
  const { queuePlayersId } = useSelector(selectLiveDraft);
  const dispatch = useDispatch();
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    const list = reorder(queuePlayers, source.index, destination.index);
    dispatch(setQueuePlayer({ players: list, playersId: queuePlayersId }));
  };
  const handleRemove = (index) => {
    debugger;
    const playerFilter = queuePlayers.filter(
      (player) => player.index !== index
    );
    const playerIdFilter = queuePlayersId.filter(
      (indexPlayer) => indexPlayer !== index
    );
    dispatch(
      setQueuePlayer({ players: playerFilter, playersId: playerIdFilter })
    );
  };
  useEffect(()=> {
    if(queueHeight.current) {
      playerQueueHeight(queueHeight);
    }
  },[queuePlayers])

  return (
    <Wrapper>
      <div className="queue-head">
        <h2>Player queue</h2>
      </div>
      <List
        list={queuePlayers}
        onDragEnd={handleDragEnd}
        dragItemStyle={{
          background: "#004fa39d",
          borderRadius: "8px",
        }}
        dragListStyle={
          {
            // background: "lightblue",
            // borderRadius: "16px",
            // minHeight:"300px"
          }
        }
      >
        {(item, index, dragHandleProps) => (
          <PlayerItem {...dragHandleProps}>
            <div className="player-info">
              <button onClick={() => handleRemove(item.index)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_2009_6397)">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13H11H7V11H11H13H17V13Z"
                      fill="#004EA3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_2009_6397">
                      <rect width={24} height={24} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <p>
                {index}. {item.name}
              </p>
            </div>
            <div>
              <DragIcon />
            </div>
          </PlayerItem>
        )}
      </List>
    </Wrapper>
  );
};

export default QueueDnD;
