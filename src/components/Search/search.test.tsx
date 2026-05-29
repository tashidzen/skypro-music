import { render, screen } from '@testing-library/react';
import Search from './Search';
import ReduxProvider from '@/store/ReduxProvider';
import userEvent from '@testing-library/user-event';

describe('базовый рендеринг', () => {
  it('Корректный рендер строки поиска', () => {
    const search = render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>,
    );
    expect(search).toMatchSnapshot();
  });
  it('Обновляет значение при вводе текста', async () => {
    const user = userEvent.setup();
    render(
      <ReduxProvider>
        <Search />
      </ReduxProvider>,
    );

    const input = screen.getByPlaceholderText('Поиск') as HTMLInputElement;
    await user.type(input, 'Rock');

    expect(input.value).toBe('Rock');
  });
});
