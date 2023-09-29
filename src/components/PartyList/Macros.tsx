import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../redux/store';
import { resetPlayer } from '../../redux/slices/playerSlice';

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
  status: ButtonStatus[];
  setStatus?: any;
};

type TButton = 'chain' | 'number';

const Mark = ({ index, status, setStatus }: MarkProps) => {
  const chainIconSrc = `/macroIcons/${
    status[index].number || status[index].chain ? 'disable' : 'chain'
  }Marker.png`;
  const numberIconSrc = `/macroIcons/${
    status[index].number || status[index].chain ? 'disable' : 'number'
  }Marker.png`;

  const onClickHandler = (clickBtnType: TButton, index?: number) => {
    const newStatus = status.map((n, i) => {
      const temp = { ...n };
      if (i === index) {
        temp[clickBtnType] = !n[clickBtnType];
      } else {
        temp[clickBtnType] = n[clickBtnType];
      }
      return temp;
    });

    if (clickBtnType === 'chain' && index) {
      newStatus[index].chainNum = newStatus.filter((n) => n.chain).length;
    }
    setStatus(newStatus);
  };

  return (
    <MarkContainer>
      <Button
        onClick={() => onClickHandler('chain', index)}
        isClicked={status[index].chain}
        color="purple"
      >
        <img width="30px" src={chainIconSrc} />
      </Button>
      <Button
        onClick={() => onClickHandler('number', index)}
        isClicked={status[index].number}
        color="lightyellow"
      >
        <img width="30px" src={numberIconSrc} />
      </Button>
    </MarkContainer>
  );
};

const ResetMark = ({ resetHandler }) => {
  const resetIconSrc = `/macroIcons/resetMarker.png`;
  return (
    <MarkContainer>
      <Button onClick={resetHandler} isClicked={false} color="blue">
        <img width="30px" src={resetIconSrc} />
      </Button>
    </MarkContainer>
  );
};

interface ButtonStatus {
  chainNum: number;
  chain: boolean;
  number: boolean;
}
const initialButtonStatus = [
  { chainNum: 0, chain: false, number: false },
  { chainNum: 0, chain: false, number: false },
  { chainNum: 0, chain: false, number: false },
  { chainNum: 0, chain: false, number: false },
  { chainNum: 0, chain: false, number: false },
  { chainNum: 0, chain: false, number: false },
  { chainNum: 0, chain: false, number: false },
  { chainNum: 0, chain: false, number: false },
];

const Macros = () => {
  const dispatch = useDispatch();
  const { member } = useSelector((state: RootState) => state.party);
  const [buttonStatus, setButtonStatus] = useState(initialButtonStatus);

  const resetHandler = () => {
    setButtonStatus(initialButtonStatus);
  };

  useEffect(() => {
    const temp = member.map((n, i) => ({
      ...n,
      isChained: buttonStatus[i].chain,
      chainNumber: buttonStatus[i].chainNum,
    }));
    dispatch(resetPlayer({ players: temp }));
  }, [buttonStatus]);

  return (
    <Container>
      <Marks>
        {buttonStatus &&
          buttonStatus.map((status, i) => {
            return (
              <Mark
                key={`macro_${i}_${status.chain}`}
                index={i}
                status={buttonStatus}
                setStatus={setButtonStatus}
              />
            );
          })}
        <ResetMark resetHandler={resetHandler} />
      </Marks>
    </Container>
  );
};

export default Macros;
