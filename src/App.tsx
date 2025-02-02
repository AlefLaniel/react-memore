import React, { useEffect } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import InfoItem from "./components/InfoItem";
import Button from "./components/Button";
import RestartIcon from "./svgs/restart.svg";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import GridItem from "./components/GridItem";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

const App = () => {
  const [playing, setPlaying] = React.useState(false);
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [moveCount, setMoveCount] = React.useState(0);
  const [showCount, setShowCount] = React.useState(0);
  const [gridItems, setGridItems] = React.useState<GridItemType[]>([]);

  useEffect(() => {
    resetAndCreateGrid();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed((time) => time + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (showCount === 2) {
      const opened = gridItems.filter((i) => i.shown && !i.permanentShown);

      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          const tmpGrid = [...gridItems];
         for (const i in tmpGrid) {
          if (tmpGrid[i].shown) {
            tmpGrid[i].permanentShown = true;
            tmpGrid[i].shown = false;
            
            
          }
         }
         setGridItems(tmpGrid);
          setShowCount(0);
        } else{
          setTimeout(() => {
            const tmpGrid = [...gridItems];
          for (const i in tmpGrid) {
           if (tmpGrid[i].shown) {
             tmpGrid[i].shown = false;
             
           }
          }
          setGridItems(tmpGrid);
          setShowCount(0);
          }, 1000);
        }

        setMoveCount(moveCount => moveCount + 1);
      }
    }
  }, [gridItems, showCount]);

  useEffect(() => {
    if (moveCount > 0 && gridItems.every((i) => i.permanentShown)) {
      setPlaying(false);
      
    }
  }, [gridItems, moveCount]);

  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);
    // passo 2 - criar os itens do jogo e começar o jogo
    // 2.1 - criar um grid vazio
    const tmpGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++)
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    // 2.2 - criar os itens do jogo
      for (let w = 0; w < 2; w++) {
        for (let i = 0; i < items.length; i++) {
          // eslint-disable-next-line prefer-const
          let pos = -1;
          while (pos < 0 || tmpGrid[pos].item !== null) {
            pos = Math.floor(Math.random() * (items.length * 2));
          }
          tmpGrid[pos].item = i;
        }
        
      }
    // 2.3 - embaralhar os itens do jogo
    setGridItems(tmpGrid);
    // passo 3 - começar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      const tmpGrid = [...gridItems];

      if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
        
      }

      setGridItems(tmpGrid)
    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLlink href="/">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLlink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={moveCount.toString()} />
        </C.InfoArea>

        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
            key={index}
            item={item}
            onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
