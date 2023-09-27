import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

const Marks = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button<{ isClicked?: boolean; color: string }>`
  min-height: 50px;
  min-width: 50px;
  &:hover {
    border: 1px solid black;
  }
  background-color: ${({ isClicked, color }) => (isClicked ? 'grey' : color)};
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
          ></Button>
          <Button
            onClick={onClickHandler}
            isClicked={status[index]}
            color="lightyellow"
          ></Button>
        </>
      ) : (
        <>
          <Button
            onClick={resetHandler}
            isClicked={false}
            color="blue"
          ></Button>
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
