//Avance 9 
// SVA LAW
// Pruebas del modulo alertas
// Módulo para tests models/alertas.model.js    controllers/alertas.controller.js

jest.mock('../config/supabase', () => ({
    from: jest.fn()
}));

const supabase    = require('../config/supabase');
const modelAlertas = require('../models/alertas.model');
const controller   = require('../controllers/alertas.controller');

beforeEach(() => jest.clearAllMocks());

// ─── Helper ───────────────────────────────────────────────────────────────────
function crearResMock() {
    return {
        json:     jest.fn(),
        redirect: jest.fn(),
        render:   jest.fn(),
        status:   jest.fn().mockReturnThis()
    };
}

// ─── CP-1: ObtenerAlertas retorna lista ───────────────────────────────────────
test('CP-1 ObtenerAlertas: retorna exito true con array de alertas', async () => {
    const fakeAlertas = [
        { idalerta: 1, nivel: 'Alto', estatus: 'Pendiente', idcliente: 3 }
    ];
    supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({ data: fakeAlertas, error: null })
        })
    });

    const resultado = await modelAlertas.ObtenerAlertas();

    expect(resultado.exito).toBe(true);
    expect(resultado.alertas).toHaveLength(1);
});

// ─── CP-2: ObtenerAlertas con error de Supabase → exito false ─────────────────
test('CP-2 ObtenerAlertas: error de Supabase retorna exito false', async () => {
    supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({ data: null, error: { message: 'DB error' } })
        })
    });

    const resultado = await modelAlertas.ObtenerAlertas();

    expect(resultado.exito).toBe(false);
    expect(resultado.alertas).toEqual([]);
});

// ─── CP-3: ResolverAlerta exitosa ─────────────────────────────────────────────
test('CP-3 ResolverAlerta: actualiza a Resuelta con exito true', async () => {
    supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({ error: null })
        })
    });

    const resultado = await modelAlertas.ResolverAlerta(1, { resolucion: 'Revisada y cerrada' });

    expect(resultado.exito).toBe(true);
});

// ─── CP-4: ResolverAlerta con error de BD → exito false ───────────────────────
test('CP-4 ResolverAlerta: error de BD retorna exito false', async () => {
    supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({ error: { message: 'Update failed' } })
        })
    });

    const resultado = await modelAlertas.ResolverAlerta(99, { resolucion: '' });

    expect(resultado.exito).toBe(false);
});

// ─── CP-5: CambiarEstatus exitoso ─────────────────────────────────────────────
test('CP-5 CambiarEstatus: cambia estatus correctamente con exito true', async () => {
    supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({ error: null })
        })
    });

    const resultado = await modelAlertas.CambiarEstatus(2, 'En revision');

    expect(resultado.exito).toBe(true);
});

// ─── CP-6: CambiarEstatus con error de BD ─────────────────────────────────────
test('CP-6 CambiarEstatus: error de BD retorna exito false', async () => {
    supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({ error: { message: 'Connection lost' } })
        })
    });

    const resultado = await modelAlertas.CambiarEstatus(2, 'En revision');

    expect(resultado.exito).toBe(false);
});

// ─── CP-7: ObtenerAlertaPorId exitosa ─────────────────────────────────────────
test('CP-7 ObtenerAlertaPorId: retorna alerta correcta con exito true', async () => {
    const fakeAlerta = { idalerta: 5, nivel: 'Medio', estatus: 'Pendiente' };
    supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({ data: fakeAlerta, error: null })
            })
        })
    });

    const resultado = await modelAlertas.ObtenerAlertaPorId(5);

    expect(resultado.exito).toBe(true);
    expect(resultado.alerta.nivel).toBe('Medio');
});

// ─── CP-8: ObtenerAlertaPorId con ID inexistente → exito false ────────────────
test('CP-8 ObtenerAlertaPorId: ID inexistente retorna exito false', async () => {
    supabase.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
                single: jest.fn().mockResolvedValue({ data: null, error: { message: 'Not found' } })
            })
        })
    });

    const resultado = await modelAlertas.ObtenerAlertaPorId(9999);

    expect(resultado.exito).toBe(false);
});

// ─── CP-9: ApiResolverAlerta sin idAlerta → 400 ───────────────────────────────
test('CP-9 ApiResolverAlerta: sin idAlerta retorna 400', async () => {
    const req = { body: { resolucion: 'Sin ID' } };
    const res = crearResMock();

    await controller.ApiResolverAlerta(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ msg: expect.any(String) }));
});

// ─── CP-10: ApiCambiarEstatus exitoso ─────────────────────────────────────────
test('CP-10 ApiCambiarEstatus: cambia estatus y retorna exito true', async () => {
    supabase.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({ error: null })
        })
    });

    const req = { body: { idAlerta: 3, estatus: 'En revision' } };
    const res = crearResMock();

    await controller.ApiCambiarEstatus(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ exito: true }));
});

// ─── CP-11: GenerarAlertaSiAplica - monto alto dispara alerta nivel Alto ───────
test('CP-11 GenerarAlertaSiAplica: monto >= 1500000 genera alerta nivel Alto', async () => {
    // Sin reglas activas → usa regla base por defecto
    supabase.from.mockImplementation((tabla) => {
        if (tabla === 'regla') {
            return {
                select: jest.fn().mockReturnValue({
                    eq: jest.fn().mockResolvedValue({ data: [], error: null })
                })
            };
        }
        if (tabla === 'alerta') {
            return {
                insert: jest.fn().mockResolvedValue({ error: null })
            };
        }
    });

    const operacion = { idoperacion: 10, idcliente: 2, monto: 2000000 };
    await expect(modelAlertas.GenerarAlertaSiAplica(operacion)).resolves.not.toThrow();
});

// ─── CP-12: GenerarAlertaSiAplica - monto bajo no dispara alerta ──────────────
test('CP-12 GenerarAlertaSiAplica: monto < 600000 no genera alerta', async () => {
    const insertMock = jest.fn().mockResolvedValue({ error: null });
    supabase.from.mockImplementation((tabla) => {
        if (tabla === 'regla') {
            return {
                select: jest.fn().mockReturnValue({
                    eq: jest.fn().mockResolvedValue({ data: [], error: null })
                })
            };
        }
        if (tabla === 'alerta') {
            return { insert: insertMock };
        }
    });

    const operacion = { idoperacion: 11, idcliente: 2, monto: 50000 };
    await modelAlertas.GenerarAlertaSiAplica(operacion);

    expect(insertMock).not.toHaveBeenCalled();
});
