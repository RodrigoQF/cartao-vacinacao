import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login-component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { VacinaService } from '../../service/vacina.service';
import { Store } from '../../shared/utils/util.store';
import { ClienteService } from '../../service/cliente.service';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { MOCK_CARTAO_LOGIN } from '../../mocks/loginResponse';
import { MOCK_CARTAO } from '../../mocks/cartaoVacinaResponseMock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let clienteServiceMock: any;
  let storeMock: any;
  let routerMock: any;

  beforeEach(async () => {
    storeMock = {
      set: jest.fn(),
      value: {},
    };

    clienteServiceMock = {
      cadastroCliente: jest.fn(),
      loginCliente: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [LoginComponent, HttpClientTestingModule],
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
          provide: ClienteService,
          useValue: clienteServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve validar o botao possuiCadastro()', () => {
    // Executa o método que valida se o cliente já possui cadastro
    component.possuiCadastro();

    // Verifica se a flag clienteCadastrado foi setada como true
    expect(component.clienteCadastrado).toBeTruthy();
  });

  it('Deve cadastrar um novo cliente ', () => {
    // Mock do retorno do service de cadastro de cliente
    clienteServiceMock.cadastroCliente.mockReturnValue(of(MOCK_CARTAO_LOGIN));

    // Mock do formulário válido com os dados do cliente
    const formMock = {
      valid: true,
      value: {
        cpf: '44499917845',
        nome: 'Rodrigo Queiroz de Francischi',
        idade: '23',
        sexo: 'Masculino',
      },
    } as unknown as NgForm;

    // Executa o cadastro de cliente
    component.cadastrar(formMock);

    // Confere se o service de cadastro foi chamado com os dados corretos
    expect(clienteServiceMock.cadastroCliente).toHaveBeenCalledWith({
      cpf: '44499917845',
      nome: 'Rodrigo Queiroz de Francischi',
      idade: '23',
      sexo: 'Masculino',
    });

    // Verifica se após cadastro houve navegação para cartao-vacina
    expect(routerMock.navigate).toHaveBeenCalledWith(['cartao-vacina']);
  });

  it('Deve realizar login de cliente já existente ', () => {
    // Mock do retorno do service de login de cliente
    clienteServiceMock.loginCliente.mockReturnValue(of(MOCK_CARTAO));

    // Mock do formulário válido com o CPF do cliente
    const formMock = {
      valid: true,
      value: {
        cpf: '44499917845',
      },
    } as unknown as NgForm;

    // Executa o login do cliente
    component.entrar(formMock);

    // Confere se o service de login foi chamado com o CPF informado
    expect(clienteServiceMock.loginCliente).toHaveBeenCalledWith('44499917845');

    // Verifica se após login houve navegação para cartao-vacina
    expect(routerMock.navigate).toHaveBeenCalledWith(['cartao-vacina']);
  });
});
