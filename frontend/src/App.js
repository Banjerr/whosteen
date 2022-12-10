import React, { useState, useEffect } from 'react';
import { Checkbox, CheckboxGroup, Heading, Stack, useCheckboxGroup } from '@chakra-ui/react';
import './App.css';
import AboutComponent from './components/About.tsx';
import TimelineComponent from './components/TimelineComponent.tsx';
import contentGatherer from './utilities/contentGatherer';
import postOrderer from './utilities/postOrderer';

const dataToFetch = {
  song: true,
  post: true,
  picture: true,
  video: true
};

function App() {
  const [error, showError] = useState(false);
  const [data, setData] = useState([]);
  const [checkedState, setCheckedState] = useState(
    [{prop: 'song', value: true},
    {prop: 'post', value: true},
    {prop: 'picture', value: true},
    {prop: 'video', value: true}]
  );
  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: Object.keys(dataToFetch),
  });
  const queryParams = new URLSearchParams(window.location.search)
  const shared_post = queryParams.get("shared-post");  

  const handleOnChange = async (checkboxData) => {
    let updatedCheckedState = [];

    checkedState.forEach((checked) => {
      checked.value = false;
      dataToFetch[checked.prop] = false;
      checkboxData.forEach((checkbox) => {
        if (checkbox === checked.prop) {
          checked.value = true;
          dataToFetch[checked.prop] = true;
        }
      });
      updatedCheckedState.push(checked);
    });

    let data = await contentGatherer(dataToFetch);
    setData(data);
    setCheckedState(updatedCheckedState);
  };
  
  function waitForElm(selector) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  useEffect(() =>  {
    async function fetchData() {
      try {
        let data = await contentGatherer(dataToFetch);
        setData(data);
      } catch (error) {
        console.error('error fetching data', error);
        showError(true);
      }
    }
    fetchData();

    async function scrollToStuff(shared_post) {
      console.log('scroll to', shared_post);
      const scrollToThis = await waitForElm(`.${shared_post}`);
      console.log('scrollToThis is ', scrollToThis);
      if (scrollToThis) {
        scrollToThis.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
      }
    }
    if (shared_post) {
      scrollToStuff(shared_post);
    }    
  }, [shared_post]);
  
  const orderedData = postOrderer(data);

  return (
    <div className="App">
      <header className="App-header">
        <Heading as='h2' size='4xl'>
          Justin Bryan Redden
        </Heading>
      </header>

      <div className='content-picker'>
        <ul>
          {
            error ?
              <p>Error... :(</p> :
              <CheckboxGroup onChange={handleOnChange} colorScheme='green' defaultValue={['song', 'post', 'picture', 'video']}>
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                {
                  Object.keys(dataToFetch).map((prop, i) =>
                    <li key={i + 1}>
                      <Checkbox {...getCheckboxProps({ value: prop })} value={prop} isChecked={checkedState[i].value}>{prop}</Checkbox>
                    </li>
                  )
                }
                </Stack>
              </CheckboxGroup>
          }
        </ul>
      </div>

      <AboutComponent />

      {orderedData && orderedData.length ? TimelineComponent(orderedData) : null}
    </div>
  );
}

export default App;
