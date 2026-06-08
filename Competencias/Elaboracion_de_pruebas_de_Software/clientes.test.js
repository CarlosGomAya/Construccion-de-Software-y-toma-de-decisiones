//Avance9
// Pruebas - Clientes
// Módulo: controllers/clientes.controller.js  |  models/clientes.model.js

jest.mock('../models/historial.model', () => ({
    RegistrarAccion: jest.fn()
}));

jest.mock('../config/supabase', () => ({
    from: jest.fn()
}));

const supabase   = require('../config/supabase');
const controller = require('../controllers/clientes.controller');

beforeEach(() => jest.clearAllMocks());
beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

// ─── Helper ───────────────────────────────────────────────────────────────────
function crearResMock() {
    return {
        json:     jest.fn(),
        redirect: jest.fn(),
        render:   jest.fn(),
        status:   jest.fn().mockReturnThis()
    };
}

// ─── CP-1: ValidarDocumento sin idDocumento ─────────────────────────────
test('CP-1 ValidarDocumento: sin idDocumento retorna 400 con exito false', async () => {
    const req = { body: { estado: 'Validado' }, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.ValidarDocumento(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: false }));
});

// ─── CP-2: ValidarDocumento sin estado ──────────────────────────────────
test('CP-2 ValidarDocumento: sin estado retorna 400 con exito false', async () => {
    const req = { body: { idDocumento: '1' }, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.ValidarDocumento(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: false }));
});

// ─── CP-3: ValidarDocumento con estado inválido → 400 ─────────────────────────
test('CP-3 ValidarDocumento: estado invalido retorna 400', async () => {
    const req = { body: { idDocumento: '1', estado: 'Aprobado' }, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.ValidarDocumento(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: false }));
});

// ─── CP-4: Rechazar documento sin motivo → 400 ────────────────────────────────
test('CP-4 ValidarDocumento: rechazo sin motivo retorna 400', async () => {
    const req = { body: { idDocumento: '1', estado: 'Rechazado', motivo: '' }, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.ValidarDocumento(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: false }));
});

// ─── CP-5: Validar documento exitosamente ─────────────────────────────────────
test('CP-5 ValidarDocumento: validacion exitosa retorna exito true', async () => {
    const updateMock = { error: null };
    supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue(updateMock)
        })
    });

    const req = { body: { idDocumento: '5', estado: 'Validado' }, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.ValidarDocumento(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: true }));
});

// ─── CP-6: Rechazar documento con motivo válido → éxito ───────────────────────
test('CP-6 ValidarDocumento: rechazo con motivo retorna exito true', async () => {
    const updateMock = { error: null };
    supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue(updateMock)
        })
    });

    const req = { body: { idDocumento: '7', estado: 'Rechazado', motivo: 'Documento ilegible' }, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.ValidarDocumento(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: true }));
});

// ─── CP-7: GuardarExpediente sin body → 400 ───────────────────────────────────
test('CP-7 GuardarExpediente: sin body retorna 400 con exito false', async () => {
    const req = { body: {}, files: {}, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.GuardarExpediente(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: false }));
});

// ─── CP-8: ImportarCSV sin archivo → 400 ─────────────────────────────────────
test('CP-8 ImportarCSV: sin archivo CSV retorna 400 con exito false', async () => {
    const req = { files: null, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.ImportarCSV(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: false }));
});

// ─── CP-9: ImportarCSV con CSV vacío → 400 ────────────────────────────────────
test('CP-9 ImportarCSV: CSV sin filas de datos retorna 400', async () => {
    const req = {
        files: { csv: { data: Buffer.from('nombre,rfc\n') } },
        ip: '127.0.0.1'
    };
    const res = crearResMock();

    await controller.ImportarCSV(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: false }));
});

// ─── CP-10: ApiListaClientes retorna array de clientes ────────────────────────
test('CP-10 ApiListaClientes: retorna lista de clientes en formato correcto', async () => {
    const fakeClientes = [
        { idcliente: 1, nombrerazonsocial: 'Juan Garcia', rfc: 'GALJ850312AB1', tipocliente: 'Fisica', nivelriesgo: 'Bajo', espep: false, estatusdocumentos: 'Validado' }
    ];
    supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({ data: fakeClientes, error: null })
        })
    });

    const req = {};
    const res = crearResMock();

    await controller.ApiListaClientes(req, res);

    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ clientes: expect.any(Array) })
    );
});

// ─── CP-11: EditarCliente sin idCliente → 400 ─────────────────────────────────
test('CP-11 EditarCliente: sin idCliente retorna 400', async () => {
    const req = { body: { nombre: 'Sin ID' }, ip: '127.0.0.1' };
    const res = crearResMock();

    await controller.EditarCliente(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: false }));
});
