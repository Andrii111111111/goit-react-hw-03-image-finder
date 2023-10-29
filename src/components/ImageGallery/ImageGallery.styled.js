import styled from 'styled-components';

export const ImageGallery = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 50px;
`;

export const ImageGalleryItem = styled.li`
  max-width: 300px;
  max-height: 200px;
  display: inherit;
`;
