import { useEffect, useState } from 'react';
import Subfolder from './Folder';
import styled from 'styled-components';

const Folder = props => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const [className, setClassName] = useState('');
  const { level } = props;

  function toggleFolder(event) {
    if (event.target.className === className) setIsOpen(!isOpen);
  }

  useEffect(() => {
    (function () {
      setClassName(`${props.folder.name.split(' ').join('-').toLowerCase()}${level}`);
    })();
  }, [props.folder.name, level]);

  return (
    <Container
      isOpen={isOpen}
      level={props.level}
    >
      <h1
        onClick={toggleFolder}
        className={className}
      >
        {props.folder ? props.folder.name : null}
      </h1>

      {isOpen && props.folder && props.folder.children
        ? props.folder.children.map(c => {
          return (
            <Subfolder
              folder={c}
              level={level + 1}
            />
          );
        })
        : null}
    </Container>

  )
}

export default Folder;

const Container = styled.div`
  padding-left: 8px;
  > h1 {
    color: ${props => props.isOpen ? 'beige' : 'green'};
  }
`;