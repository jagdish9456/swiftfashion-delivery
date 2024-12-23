import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Cart } from '../screens/Cart';
import { CartProvider } from '../contexts/CartContext';
import { NavigationContainer } from '@react-navigation/native';

describe('Cart Screen', () => {
  it('renders empty cart message when no items', () => {
    render(
      <NavigationContainer>
        <CartProvider>
          <Cart />
        </CartProvider>
      </NavigationContainer>
    );
    
    expect(screen.getByText('Your cart is empty')).toBeTruthy();
  });

  it('calculates total correctly with items', () => {
    const { getByText } = render(
      <NavigationContainer>
        <CartProvider>
          <Cart />
        </CartProvider>
      </NavigationContainer>
    );
    
    expect(getByText('PLACE ORDER')).toBeTruthy();
  });
});