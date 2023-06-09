import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 4rem;
  padding-bottom: 4rem;
  background-color: #e44337;
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: whitesmoke;
  font-size: 6rem;
  font-weight: 600;
`;

export const RecordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: whitesmoke;
`;

export const Button = styled(motion.div)`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 8rem;
  max-width: 8rem;
  min-height: 8rem;
  border-radius: 8rem; /* rounded-2xl is typically around 1rem */
  background-color: #b1362c;
  color: whitesmoke;
  font-size: 4rem;
  padding: 2rem; /* p-2 is typically around 0.5rem */
`;

export const RecordBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-left: 2rem;
  margin-right: 2rem;
  margin-top: 8rem;
  max-width: 8rem;
  color: whitesmoke;
  font-size: 2rem;
  font-weight: 550;
  padding: 2rem; /* p-2 is typically around 0.5rem */
`;

export const Span = styled.span`
  color: gray;
`;
