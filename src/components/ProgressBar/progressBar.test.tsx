import { render, fireEvent } from '@testing-library/react';
import ProgressBar from './ProgressBar';

describe('ProgressBar', () => {
  const defaultProps = {
    max: 100,
    value: 50,
    step: 1,
    onChange: jest.fn(),
    readOnly: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Базовый рендеринг', () => {
    it('Рендерится ползунок с заданными параметрами', () => {
      const { container } = render(<ProgressBar {...defaultProps} />);
      const input = container.querySelector('input[type="range"]');

      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
      expect(input).toHaveAttribute('value', '50');
      expect(input).toHaveAttribute('step', '1');
    });
  });

  describe('Взаимодействие с пользователем', () => {
    it('Вызывает onChange при изменении значения ползунка', () => {
      const onChange = jest.fn();
      const { container } = render(
        <ProgressBar {...defaultProps} onChange={onChange} />,
      );
      const input = container.querySelector('input[type="range"]');

      fireEvent.change(input!, { target: { value: 75 } });

      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(expect.any(Object));
    });
  });
  describe('Различные значения пропсов', () => {
    it('Корректное отображение разных значений max', () => {
      const { container, rerender } = render(
        <ProgressBar {...defaultProps} max={200} />,
      );
      const input = container.querySelector('input[type="range"]');

      expect(input).toHaveAttribute('max', '200');

      rerender(<ProgressBar {...defaultProps} max={500} />);
      expect(input).toHaveAttribute('max', '500');
    });

    it('Корректное отображение разных значений value', () => {
      const { container, rerender } = render(
        <ProgressBar {...defaultProps} value={25} />,
      );
      const input = container.querySelector('input[type="range"]');

      expect(input).toHaveAttribute('value', '25');

      rerender(<ProgressBar {...defaultProps} value={80} />);
      expect(input).toHaveAttribute('value', '80');
    });

    it('Корректное отображение разных значений step', () => {
      const { container, rerender } = render(
        <ProgressBar {...defaultProps} step={5} />,
      );
      const input = container.querySelector('input[type="range"]');

      expect(input).toHaveAttribute('step', '5');

      rerender(<ProgressBar {...defaultProps} step={10} />);
      expect(input).toHaveAttribute('step', '10');
    });
  });

  describe('Граничные значения', () => {
    it('Обработка минимального значения value = 0', () => {
      const { container } = render(<ProgressBar {...defaultProps} value={0} />);
      const input = container.querySelector('input[type="range"]');

      expect(input).toHaveAttribute('value', '0');
    });

    it('Обработка максимального значения value = max', () => {
      const { container } = render(
        <ProgressBar {...defaultProps} value={100} />,
      );
      const input = container.querySelector('input[type="range"]');

      expect(input).toHaveAttribute('value', '100');
    });
  });
});
