import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: whitesmoke;
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 6rem;
`;

interface HeadProps {
  title: string;
}

function Head({ title }: HeadProps) {
  return <Wrapper>{title}</Wrapper>;
}

export default Head;
