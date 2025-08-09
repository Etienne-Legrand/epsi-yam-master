import { useEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SocketContext } from "../../../contexts/socket.context";
import GridItem from "./grid-item.component";

const Grid = () => {
  const socket = useContext(SocketContext);

  const [displayGrid, setDisplayGrid] = useState(false);
  const [canSelectCells, setCanSelectCells] = useState([]);
  const [grid, setGrid] = useState([]);

  const handleSelectCell = (cellId, rowIndex, cellIndex) => {
    if (canSelectCells) {
      socket.emit("game.grid.selected", { cellId, rowIndex, cellIndex });
    }
  };

  useEffect(() => {
    socket.on("game.grid.view-state", (data) => {
      setDisplayGrid(data["displayGrid"]);
      setCanSelectCells(data["canSelectCells"]);
      setGrid(data["grid"]);
    });
  }, [socket]);

  return (
    <View style={styles.gridContainer}>
      {displayGrid &&
        grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, cellIndex) => {
              const isSelectable = cell.canBeChecked && !cell.owner;

              return (
                <GridItem
                  key={cell.id}
                  cell={cell}
                  isSelectable={isSelectable}
                  onPress={() => {
                    handleSelectCell(cell.id, rowIndex, cellIndex);
                  }}
                />
              );
            })}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
});

export default Grid;
