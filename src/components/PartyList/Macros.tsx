import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-left: 150px;
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
  status: boolean[];
  markType: 'markings' | 'reset';
  resetHandler?: () => void;
  setStatus?: any;
};

const Mark = ({
  index,
  status,
  markType,
  resetHandler,
  setStatus,
}: MarkProps) => {
  const chainIconSrc = `/macroIcons/${
    status[index] ? 'disable' : 'chain'
  }Marker.png`;
  const numberIconSrc = `/macroIcons/${
    status[index] ? 'disable' : 'number'
  }Marker.png`;
  const resetIconSrc = `/macroIcons/resetMarker.png`;

  const onClickHandler = () => {
    if (setStatus !== undefined) {
      const newStatus = status.map((n, i) => (i === index ? !n : n));
      setStatus(newStatus);
    }
  };

  return (
    <MarkContainer>
      {markType === 'markings' ? (
        <>
          <Button
            onClick={onClickHandler}
            isClicked={status[index]}
            color="lightcoral"
          >
            <img width="30px" src={chainIconSrc} />
          </Button>
          <Button
            onClick={onClickHandler}
            isClicked={status[index]}
            color="lightyellow"
          >
            <img width="30px" src={numberIconSrc} />
          </Button>
        </>
      ) : (
        <>
          <Button onClick={resetHandler} isClicked={false} color="blue">
            <img width="30px" src={resetIconSrc} />
          </Button>
        </>
      )}
    </MarkContainer>
  );
};

const initialButtonStatus = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

const Macros = () => {
  const [buttonStatus, setButtonStatus] = useState(initialButtonStatus);

  const resetHandler = () => {
    setButtonStatus(initialButtonStatus);
  };

  useEffect(() => {}, [buttonStatus]);

  return (
    <Container>
      <Marks>
        {buttonStatus &&
          buttonStatus.map((status, i) => {
            return (
              <Mark
                index={i}
                markType="markings"
                status={buttonStatus}
                setStatus={setButtonStatus}
              />
            );
          })}
        <Mark
          index={0}
          status={[]}
          markType="reset"
          resetHandler={resetHandler}
        />
      </Marks>
    </Container>
  );
};

export default Macros;
