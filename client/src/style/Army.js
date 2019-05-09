import styled from 'styled-components';

export default styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(9, 1fr);
    //max-width: 810px;
    max-width: 720px;
    max-height: 640px;
    //max-height: 720px;
    min-width: 200px;
`;
