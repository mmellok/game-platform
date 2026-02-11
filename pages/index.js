import React from 'react';
import PageDescription from "../components/baseComponents/head/pageDescription/PageDescription";
import defaultPage from "../constants/page-description";
import {useApplication} from "../redux/reducer/application";
import Container from "../components/container/Container";
import {components} from "../constants/components";

export default function Home() {
  const {state} = useApplication();
  
  return (
    <Container state={state}>
      {components[state]?.() ?? <></>}
    </Container>
  );
}

