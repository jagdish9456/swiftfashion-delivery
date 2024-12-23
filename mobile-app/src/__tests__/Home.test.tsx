import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Home } from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';

describe('Home Screen', () => {
  it('renders all main sections', () => {
    render(
      <NavigationContainer>
        <Home />
      </NavigationContainer>
    );
    
    expect(screen.getByTestId('deals-section')).toBeTruthy();
    expect(screen.getByTestId('grid-categories')).toBeTruthy();
    expect(screen.getByTestId('category-section')).toBeTruthy();
    expect(screen.getByTestId('top-products')).toBeTruthy();
  });
});