import {Search} from 'styled-icons/material'
import {Spinner} from 'styled-icons/fa-solid/Spinner'

import { keyframes } from 'styled-components';
import styled from '../../styled-components';

const spin = keyframes`
  100% {
    -webkit-transform: rotate(360deg); 
    transform:rotate(360deg);
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const SearchIcon = styled(Search)`
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;
  top: 10px;
`;

export const SpinnerImpl = styled(Spinner)`
  animation: ${spin} 1.2s linear infinite; 
  position: absolute;
  width: 20px;
  height: 20px;
  left: 10px;
  top: 10px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  border-radius: ${props => props.theme.standardBorderRadius};
  border: 1px solid ${props => props.theme.borderColor};
  color:  ${props => props.theme.textColor};
  padding: 10px 10px 10px 35px;
  height: ${props => props.theme.inputHeight};
  font-size: 20px;
  line-height: 20px;
  outline: 0;
  box-shadow: 0 8px 6px -6px ${props => props.theme.boxShadowColor};
  width: 100%;

  :focus {
    border-color: ${props => props.theme.primaryColor};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const OuterWrapper = styled.div`
  font-family: ${props => props.theme.fontFamily};
  width: 100%;
  position: relative;
`;

export const ResultsWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: ${props => props.theme.inputHeight};
  left: 0;
  background-color: ${props => props.theme.wrapperColor};
  box-shadow: 0 8px 6px -6px ${props => props.theme.boxShadowColor};

  border-bottom-left-radius: ${props => props.theme.standardBorderRadius};
  border-bottom-right-radius: ${props => props.theme.standardBorderRadius};
`;

export const ResultsHeading = styled.div`
  text-transform: uppercase;
  color: ${props => props.theme.textColor};
  font-size: 16px;
  font-weight: bold;
  line-height: 16px;
  padding: 10px;
`;

export const User = styled.div`
  height: 40px;
  line-height: 40px;
  padding: 5px 10px;
  border: 1px solid ${props => props.theme.borderColor};
  border-top: 0;
  background-color: ${props => props.theme.invertedTextColor};
  display: flex;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.primaryColor};
    color: ${props => props.theme.invertedTextColor};
  }

  :last-child {
    border-bottom-left-radius: ${props => props.theme.standardBorderRadius};
    border-bottom-right-radius: ${props => props.theme.standardBorderRadius};
  }
`;

export const SelectedUser = styled(User)`
  background-color: ${props => props.theme.selectedItemColor};
  color: ${props => props.theme.invertedTextColor};

  :hover {
    background-color: ${props => props.theme.selectedItemColor};
  }
`;

export const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  display: inline-block;
  margin-right: 10px;
`;
