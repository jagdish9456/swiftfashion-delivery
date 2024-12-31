import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Categories } from './Categories';

// Mock navigation
const mockNavigate = jest.fn();
const navigation = { navigate: mockNavigate };

describe('Categories Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<Categories navigation={navigation} />);
    expect(getByTestId('categories-screen')).toBeTruthy();
  });

  it('displays the header with correct title', () => {
    const { getByTestId } = render(<Categories navigation={navigation} />);
    expect(getByTestId('categories-header')).toBeTruthy();
    expect(getByTestId('header-title').props.children).toBe('Categories');
  });

  it('shows men and women tabs', () => {
    const { getByTestId } = render(<Categories navigation={navigation} />);
    expect(getByTestId('men-tab')).toBeTruthy();
    expect(getByTestId('women-tab')).toBeTruthy();
  });

  it('switches active tab when clicked', () => {
    const { getByTestId } = render(<Categories navigation={navigation} />);
    const womenTab = getByTestId('women-tab');
    fireEvent.press(womenTab);
    expect(womenTab.props.style).toContainEqual(
      expect.objectContaining({ backgroundColor: '#9b87f5' })
    );
  });

  it('displays categories list', () => {
    const { getByTestId } = render(<Categories navigation={navigation} />);
    expect(getByTestId('categories-list')).toBeTruthy();
  });
});