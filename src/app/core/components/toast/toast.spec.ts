import { TestBed } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { ToastService } from '../../services';
import { Toast } from './toast';

describe('<Toast />', () => {
  const sut = async () => {
    const utils = await render(Toast);

    const toastService = TestBed.inject(ToastService);

    return {
      ...utils,
      toastService,
    };
  };

  it('deve renderizar o container', async () => {
    await sut();
    const container = screen.getByTestId('toast');
    expect(container).toBeInTheDocument();
  });

  it('deve renderizar um toast de sucesso', async () => {
    const { toastService } = await sut();
    toastService.success('Sucesso!');
    const message = await screen.findByText('Sucesso!');
    expect(message).toBeInTheDocument();
  });

  it('deve aplicar classe correta para success', async () => {
    const { toastService } = await sut();
    toastService.success('OK');
    const alert = await screen.findByText('OK');
    expect(alert.parentElement).toHaveClass('alert-success');
  });

  it('deve remover toast ao clicar', async () => {
    const { toastService } = await sut();
    toastService.success('Remover');
    const message = await screen.findByText('Remover');
    fireEvent.click(message);
    expect(screen.queryByText('Remover')).not.toBeInTheDocument();
  });
});
