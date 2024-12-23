import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ProductList } from '../components/categories/ProductList';

const mockProducts = [
  {
    id: '1',
    name: 'Test Product',
    price: 99.99,
    image: 'https://example.com/image.jpg',
    description: 'Test description',
    brand: 'Test Brand'
  }
];

describe('ProductList Component', () => {
  it('renders correctly with products', () => {
    const { getByText } = render(
      <ProductList products={mockProducts} isLoading={false} />
    );
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
  });

  it('shows loading state', () => {
    const { getByText } = render(
      <ProductList products={[]} isLoading={true} />
    );
    expect(getByText('Loading...')).toBeTruthy();
  });

  it('handles empty products array', () => {
    const { queryByTestId } = render(
      <ProductList products={[]} isLoading={false} />
    );
    expect(queryByTestId('product-card')).toBeNull();
  });
});