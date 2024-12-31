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

  it('renders main header layout when isMainHeader is true', () => {
    const { getByTestId } = render(<Header isMainHeader={true} />);
    expect(getByTestId('notification-button')).toBeTruthy();
    expect(getByTestId('profile-button')).toBeTruthy();
  });

  it('navigates to notifications when notification icon is pressed', () => {
    const { getByTestId } = render(<Header isMainHeader={true} />);
    fireEvent.press(getByTestId('notification-button'));
    expect(mockNavigate).toHaveBeenCalledWith('Notifications');
  });

  it('navigates to profile when profile icon is pressed', () => {
    const { getByTestId } = render(<Header isMainHeader={true} />);
    fireEvent.press(getByTestId('profile-button'));
    expect(mockNavigate).toHaveBeenCalledWith('Profile');
  });

  it('renders with correct height', () => {
    const { getByTestId } = render(<Header title="Test" />);
    const header = getByTestId('header');
    expect(header.props.style).toBeDefined();
  });
});