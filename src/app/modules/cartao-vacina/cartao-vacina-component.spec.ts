import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoVacinaComponent } from './cartao-vacina-component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MOCK_CARTAO } from '../../mocks/cartaoVacinaResponseMock';
import { Router } from '@angular/router';
import { Store } from '../../shared/utils/util.store';
import { VacinaService } from '../../service/vacina.service';
import { MOCK_CARTAO_LOGIN } from '../../mocks/loginResponse';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { MOCK_CARTAO_ATUALIZAR } from '../../mocks/mockAtualizarVacina';
import { MOCK_CARTAO_DELETAR } from '../../mocks/mockDeletarVacina';
import { MOCK_CARTAO_ADICIONAR } from '../../mocks/mockAdicionarVacina';

describe('CartaoVacinaComponent', () => {
  let component: CartaoVacinaComponent;
  let fixture: ComponentFixture<CartaoVacinaComponent>;
  let storeMock: any;
  let vacinaService: any;
  let routerMock: any;

  beforeEach(async () => {
    let vacinaResponse = MOCK_CARTAO;
    storeMock = {
      set: jest.fn(),
      value: {
        vacinaResponse: vacinaResponse,
      },
    };

    vacinaService = {
      adicionarVacina: jest.fn(),
      atualizarVacina: jest.fn(),
      deletarVacina: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CartaoVacinaComponent, HttpClientTestingModule],
      providers: [
        {
          provide: Router,
          useValue: routerMock,
        },
        {
          provide: Store,
          useValue: storeMock,
        },

        {
          provide: VacinaService,
          useValue: vacinaService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoVacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve validar variavel possuiVacina para ser true quando cliente possuir vacina cadastrada', () => {
    component.ngOnInit();
    expect(component.possuiVacina).toBeTruthy();
  });

  it('Deve validar variavel possuiVacina para ser false quando cliente não possuir vacina cadastrada', () => {
    //Nessa caso já está usando o mock do beforeEach
    component.ngOnInit();

    //Valida se variavel realmente é true
    expect(component.possuiVacina).toBeTruthy();
  });

  it('Deve validar variavel possuiVacina para ser false quando cliente não possuir vacina cadastrada', () => {
    //Mock sem nenhuma vacina para variavel ser false
    storeMock.value.vacinaResponse = MOCK_CARTAO_LOGIN;
    component.ngOnInit();

    //Valida se variavel realmente é false
    expect(component.possuiVacina).toBeFalsy();

    //Valida se carregou o usuario correto
    expect(component.usuario).toEqual(MOCK_CARTAO_LOGIN.pessoa);
  });

  it('Deve validar modal adicionar ', () => {
    // Abre o modal de adicionar vacina
    component.abrirModalAdicionar('add');

    // Verifica se o tipo de modal está correto
    expect(component.tipoModal).toBe('add');
  });

  it('Deve fechar modal ', () => {
    // Fecha o modal
    component.fecharModal();

    // Verifica se o tipo de modal foi resetado
    expect(component.tipoModal).toBe(null);
  });

  it('Deve alterar flag para true quando clicar em editar ', () => {
    // Aciona o método de edição
    component.editarModal();

    // Verifica se a flag editandoVacina foi atualizada
    expect(component.editandoVacina).toBe(true);
  });

  it('Deve abrir modal editar ', () => {
    // Abre o modal de edição passando uma vacina mockada
    component.abrirModalEditar('info', MOCK_CARTAO.vacinas![0]);

    // Verifica se a vacina selecionada foi preenchida corretamente
    expect(component.vacinaSelecionada).toEqual({
      id: 'v1',
      nome: 'Febre Amarela',
      data: '2025-01-10',
      dose: '1ª Dose',
      fabricante: 'AstraZeneca',
    });

    // Confirma se a vacina foi salva no store
    expect(storeMock.set).toHaveBeenCalledWith('vacinaSelecionada', {
      id: 'v1',
      nome: 'Febre Amarela',
      data: '2025-01-10',
      dose: '1ª Dose',
      fabricante: 'AstraZeneca',
    });

    // Verifica se o modal está no modo info
    expect(component.tipoModal).toBe('info');
  });

  it('Deve atualizar a vacina selecionada ', () => {
    // Define a vacina que será atualizada
    component.vacinaSelecionada = MOCK_CARTAO_ATUALIZAR.vacinas![0];

    // Mock do formulário válido
    const formMock = {
      valid: true,
      value: {
        nome: 'Febre Amarela',
        data: '2025-01-10',
        dose: '1ª Dose',
        fabricante: 'AstraZeneca',
      },
    } as unknown as NgForm;

    // Mock do retorno do serviço de atualização
    vacinaService.atualizarVacina.mockReturnValue(of(MOCK_CARTAO_ATUALIZAR));

    // Executa a atualização
    component.atualizarVacina(formMock);

    // Verifica se o cartão de vacinas foi atualizado
    expect(component.cartaoVacina).toEqual(MOCK_CARTAO_ATUALIZAR);

    // Confere se o service foi chamado corretamente
    expect(vacinaService.atualizarVacina).toHaveBeenCalledWith('v1', formMock.value, '12345678900');
  });

  it('Deve excluir a vacina selecionada ', () => {
    // Define a vacina a ser excluída
    component.vacinaSelecionada = MOCK_CARTAO_ATUALIZAR.vacinas![0];

    // Mock do retorno do serviço de exclusão
    vacinaService.deletarVacina.mockReturnValue(of(MOCK_CARTAO_DELETAR));

    // Executa a exclusão
    component.excluirVacina();

    // Verifica se o cartão de vacinas foi atualizado após exclusão
    expect(component.cartaoVacina).toEqual(MOCK_CARTAO_DELETAR);

    // Confere se o service foi chamado com os dados corretos
    expect(vacinaService.deletarVacina).toHaveBeenCalledWith(
      {
        id: 'v1',
        nome: 'Febre Amarela',
        data: '2025-01-10',
        dose: '1ª Dose',
        fabricante: 'AstraZeneca',
      },
      '12345678900'
    );

    // Verifica se restou apenas 1 vacina no cartão
    expect(component.cartaoVacina.vacinas).toHaveLength(1);
  });

  it('Deve adicionar uma vacina', () => {
    // Mock do formulário válido
    const formMock = {
      valid: true,
      value: {
        nome: 'Febre Amarela',
        data: '2025-01-10',
        dose: '1ª Dose',
        fabricante: 'AstraZeneca',
      },
    } as unknown as NgForm;

    // Mock do retorno do serviço de adicionar
    vacinaService.adicionarVacina.mockReturnValue(of(MOCK_CARTAO_ADICIONAR));

    // Executa a adição
    component.adicionarVacina(formMock);

    // Verifica se o cartão de vacinas foi atualizado após inclusão
    expect(component.cartaoVacina).toEqual(MOCK_CARTAO_ADICIONAR);

    // Confere se o service foi chamado com os dados corretos
    expect(vacinaService.adicionarVacina).toHaveBeenCalledWith(
      {
        nome: 'Febre Amarela',
        data: '2025-01-10',
        dose: '1ª Dose',
        fabricante: 'AstraZeneca',
      },
      '12345678900'
    );

    // Verifica se agora há 3 vacinas no cartão
    expect(component.cartaoVacina.vacinas).toHaveLength(3);
  });
});
