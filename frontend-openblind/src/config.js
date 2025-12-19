/**
 * Configuración de Dependencias (Dependency Injection)
 * Instancia todos los servicios, repositorios y casos de uso
 */

// Infraestructura
import { ApiClient } from './infrastructure/api/ApiClient.js';
import { LugarRepository } from './infrastructure/api/LugarRepository.js';
import { ContactoRepository } from './infrastructure/api/ContactoRepository.js';
import { WebSpeechService } from './infrastructure/speech/WebSpeechService.js';

// Casos de Uso - Lugares
import { CrearLugarUseCase } from './domain/useCases/lugares/CrearLugarUseCase.js';
import { ListarLugaresUseCase } from './domain/useCases/lugares/ListarLugaresUseCase.js';
import { ActualizarLugarUseCase } from './domain/useCases/lugares/ActualizarLugarUseCase.js';
import { EliminarLugarUseCase } from './domain/useCases/lugares/EliminarLugarUseCase.js';
import { NavegarALugarUseCase } from './domain/useCases/lugares/NavegarALugarUseCase.js';

// Casos de Uso - Contactos
import { CrearContactoUseCase } from './domain/useCases/contactos/CrearContactoUseCase.js';
import { ListarContactosUseCase } from './domain/useCases/contactos/ListarContactosUseCase.js';
import { ActualizarContactoUseCase } from './domain/useCases/contactos/ActualizarContactoUseCase.js';
import { EliminarContactoUseCase } from './domain/useCases/contactos/EliminarContactoUseCase.js';
import { LlamarContactoUseCase } from './domain/useCases/contactos/LlamarContactoUseCase.js';

// Servicios de Aplicación
import { VoiceCommandService } from './application/services/VoiceCommandService.js';

// Configuración
export const API_URL = window.location.hostname === 'localhost'
  ? 'http://localhost:8888'
  : `http://${window.location.hostname}:8888`;

export const ID_CLIENTE = 1;

// ==================== INSTANCIAS ====================

// 1. Cliente API
export const apiClient = new ApiClient(API_URL);

// 2. Repositorios
export const lugarRepository = new LugarRepository(apiClient);
export const contactoRepository = new ContactoRepository(apiClient);

// 3. Servicio de Voz
export const speechService = new WebSpeechService();

// 4. Casos de Uso - Lugares
export const lugarUseCases = {
  crear: new CrearLugarUseCase(lugarRepository),
  listar: new ListarLugaresUseCase(lugarRepository),
  actualizar: new ActualizarLugarUseCase(lugarRepository),
  eliminar: new EliminarLugarUseCase(lugarRepository),
  navegar: new NavegarALugarUseCase(lugarRepository, speechService)
};

// 5. Casos de Uso - Contactos
export const contactoUseCases = {
  crear: new CrearContactoUseCase(contactoRepository),
  listar: new ListarContactosUseCase(contactoRepository),
  actualizar: new ActualizarContactoUseCase(contactoRepository),
  eliminar: new EliminarContactoUseCase(contactoRepository),
  llamar: new LlamarContactoUseCase(contactoRepository, speechService)
};

// 6. Servicio de Comandos de Voz
export const voiceCommandService = new VoiceCommandService({
  speechService,
  crearLugarUseCase: lugarUseCases.crear,
  listarLugaresUseCase: lugarUseCases.listar,
  navegarALugarUseCase: lugarUseCases.navegar,
  crearContactoUseCase: contactoUseCases.crear,
  listarContactosUseCase: contactoUseCases.listar,
  llamarContactoUseCase: contactoUseCases.llamar,
  idCliente: ID_CLIENTE
});
