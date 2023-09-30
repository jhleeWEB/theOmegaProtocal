import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import {
  Player,
  resetChainPlayer,
  updatePlayerButtonStatus,
} from '../../redux/slices/playerSlice';

const Container = styled.div`
  display: flex;
  position: absolute;
  left: 440px;
`;

const Marks = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button<{ isClicked?: boolean; color: string }>`
  min-height: 50px;
  min-width: 50px;
  margin: 2px;
  background: rgba(255, 255, 255, 0.16);
  background-color: ${(props) => props.isClicked && props.color};
  border-radius: 10px;
  box-shadow: 0 0px 5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.3px);
  -webkit-backdrop-filter: blur(6.3px);
  border: 1px solid rgba(255, 255, 255, 0.47);
  &:hover {
    border: 2px solid rgb(255, 238, 153);
    box-shadow: 0 0px 30px rgb(255, 238, 153);
  }
  pointer-events: ${(props) => (props.isClicked ? 'none' : 'all')};
`;

const MarkContainer = styled.div`
  display: flex;
`;

type MarkProps = {
  index: number;
  player: Player;
};

type TButton = 'chain' | 'number';

const Mark = ({ index, player }: MarkProps) => {
  const dispatch = useDispatch();
  const chainIconSrc = `theProtocalOmega/macroIcons/${
    player.isNumbered || player.isChained ? 'disable' : 'chain'
  }Marker.png`;
  const numberIconSrc = `theProtocalOmega/macroIcons/${
    player.isNumbered || player.isChained ? 'disable' : 'number'
  }Marker.png`;
  const isButtonDisabled = player.isNumbered || player.isChained;
  const onClickHandler = (clickBtnType: TButton, index: number) => {
    dispatch(
      updatePlayerButtonStatus({
        index: index,
        isChained: clickBtnType === 'chain',
        isNumbered: clickBtnType === 'number',
      }),
    );
  };

  return (
    <MarkContainer>
      <Button
        onClick={() => onClickHandler('chain', index)}
        isClicked={player.isChained}
        color="purple"
        disabled={isButtonDisabled}
      >
        <img width="30px" src={chainIconSrc} />
      </Button>
      <Button
        onClick={() => onClickHandler('number', index)}
        isClicked={player.isNumbered}
        color="lightyellow"
        disabled={isButtonDisabled}
      >
        <img width="30px" src={numberIconSrc} />
      </Button>
    </MarkContainer>
  );
};

const ResetMark = ({ resetHandler }) => {
  const resetIconSrc = `theProtocalOmega/macroIcons/resetMarker.png`;
  return (
    <MarkContainer>
      <Button onClick={resetHandler} isClicked={false} color="blue">
        <img width="30px" src={resetIconSrc} />
      </Button>
    </MarkContainer>
  );
};

const Macros = () => {
  const dispatch = useDispatch();
  const { member } = useSelector((state: RootState) => state.party);

  const buttonResetHandler = () => {
    dispatch(resetChainPlayer());
  };

  return (
    <Container>
      <Marks>
        {member &&
          member.map((player, i) => {
            return (
              <Mark
                key={`macro_${i}_${player.name}`}
                index={i}
                player={player}
              />
            );
          })}
        <ResetMark resetHandler={buttonResetHandler} />
      </Marks>
    </Container>
  );
};

export default Macros;
