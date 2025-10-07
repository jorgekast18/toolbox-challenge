import React from 'react';
import { render } from '@testing-library/react-native';
import Carousel from '../Carousel';

const mockData = [
  {
    id: '1',
    title: 'Primer item',
    imageUrl: 'https://placeimg.com/640/480/any',
    videoUrl: 'https://example.com/video1.mp4',
  },
  {
    id: '2',
    title: 'Segundo item',
    imageUrl: 'https://placeimg.com/640/480/any',
    videoUrl: null,
  },
];

describe('Carousel Component', () => {
  it('Render title', () => {
    const { getByText } = render(
      <Carousel title="Carrusel de prueba" items={mockData} type="poster" />
    );
    expect(getByText('Carrusel de prueba')).toBeTruthy();
  });

  it('Render item', () => {
    const { getByText } = render(
      <Carousel title="Carrusel de prueba" items={mockData} />
    );
    expect(getByText('Primer item')).toBeTruthy();
    expect(getByText('Segundo item')).toBeTruthy();
  });

  it('Show available video or not', () => {
    const { getAllByText } = render(
      <Carousel title="Carrusel de vídeo" items={mockData} />
    );
    expect(getAllByText(/Ver Video/).length).toBe(1);
    expect(getAllByText(/Video no disponible/).length).toBe(1);
  });
});
