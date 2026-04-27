import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);

    vi.useFakeTimers(); // controla setTimeout
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('deve iniciar com lista vazia', () => {
    expect(service.toasts()).toEqual([]);
  });

  it('deve adicionar um toast de sucesso', () => {
    service.success('Sucesso!');

    const toasts = service.toasts();

    expect(toasts.length).toBe(1);
    expect(toasts[0].message).toBe('Sucesso!');
    expect(toasts[0].type).toBe('success');
  });

  it('deve adicionar um toast de erro', () => {
    service.error('Erro!');

    const toast = service.toasts()[0];

    expect(toast.type).toBe('error');
    expect(toast.message).toBe('Erro!');
  });

  it('deve adicionar um toast de warning', () => {
    service.warning('warning!');

    const toast = service.toasts()[0];

    expect(toast.type).toBe('warning');
    expect(toast.message).toBe('warning!');
  });

  it('deve adicionar um toast de info', () => {
    service.info('info!');

    const toast = service.toasts()[0];

    expect(toast.type).toBe('info');
    expect(toast.message).toBe('info!');
  });

  it('deve remover um toast manualmente', () => {
    service.success('Remover');

    const id = service.toasts()[0].id;

    service.remove(id);

    expect(service.toasts().length).toBe(0);
  });

  it('deve remover automaticamente após duration', () => {
    service.success('Auto remove', 1000);

    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(1000);

    expect(service.toasts().length).toBe(0);
  });

  it('deve manter múltiplos toasts e remover apenas um', () => {
    service.success('Toast 1');
    service.error('Toast 2');

    const [t1, t2] = service.toasts();

    service.remove(t1.id);

    const remaining = service.toasts();

    expect(remaining.length).toBe(1);
    expect(remaining[0].id).toBe(t2.id);
  });

  it('deve usar duration padrão (3500ms)', () => {
    service.success('Default duration');

    vi.advanceTimersByTime(3499);
    expect(service.toasts().length).toBe(1);

    vi.advanceTimersByTime(1);
    expect(service.toasts().length).toBe(0);
  });
});
