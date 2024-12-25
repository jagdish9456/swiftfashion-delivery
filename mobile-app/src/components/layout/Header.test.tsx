import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Header } from './Header';

// Mock navigation
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn(); // Mock console.log for debugging
  });

  it('renders without crashing', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId('header')).toBeTruthy();
  });

  it('displays title when provided', () => {
    const { getByTestId } = render(<Header title="Test Title" />);
    expect(getByTestId('header-title').props.children).toBe('Test Title');
  });

  it('shows back button when showBack is true', () => {
    const { getByTestId } = render(<Header showBack={true} />);
    expect(getByTestId('header-back-button')).toBeTruthy();
  });

  it('hides back button when showBack is false', () => {
    const { queryByTestId } = render(<Header showBack={false} />);
    expect(queryByTestId('header-back-button')).toBeNull();
  });

  it('calls navigation.goBack when back button is pressed', () => {
    const { getByTestId } = render(<Header showBack={true} />);
    fireEvent.press(getByTestId('header-back-button'));
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders with correct height', () => {
    const { getByTestId } = render(<Header title="Test" />);
    const header = getByTestId('header');
    expect(header.props.style).toBeDefined();
  });
});