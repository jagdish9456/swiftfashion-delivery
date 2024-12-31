import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { AIChat } from '../screens/AIChat';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('AIChat Screen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByTestId } = render(<AIChat />);
    expect(getByPlaceholderText('Ask me anything about our products...')).toBeTruthy();
    expect(getByTestId('send-button')).toBeTruthy();
  });

  it('handles user input', () => {
    const { getByPlaceholderText } = render(<AIChat />);
    const input = getByPlaceholderText('Ask me anything about our products...');
    fireEvent.changeText(input, 'test message');
    expect(input.props.value).toBe('test message');
  });

  it('disables send button when input is empty', () => {
    const { getByTestId } = render(<AIChat />);
    const sendButton = getByTestId('send-button');
    expect(sendButton.props.disabled).toBeTruthy();
  });
});