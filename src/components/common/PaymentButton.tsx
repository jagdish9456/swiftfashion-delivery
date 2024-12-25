import React from 'react';
import { Button } from "@/components/ui/button";

interface PaymentButtonProps {
  amount: number;
  disabled?: boolean;
  onClick?: () => void;
}

export const PaymentButton = ({ amount, disabled, onClick }: PaymentButtonProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-primary-500 text-white py-4 rounded-lg font-medium hover:bg-primary-600 transition-colors"
    >
      {disabled ? (
        "No items selected"
      ) : (
        `PLACE ORDER • $${amount.toFixed(2)}`
      )}
    </Button>
  );
};