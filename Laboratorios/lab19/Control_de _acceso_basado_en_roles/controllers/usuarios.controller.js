const model = require("../models/usuarios.model.js")

module.exports.render_login = async(req,res) =>{
    const usuarioLogueado = 
        model.login("user","pass");
    res.render("usuarios/login",{
        user:usuarioLogueado
    });
}

exports.do_login = async (req, res) => {
    try {
        const usuario = await model.User.findByUsername(req.body.username);
        if (!usuario) {
            return res.redirect('/usuarios/login');
        }

        const doMatch = await bcrypt.compare(req.body.password, usuario.password);
        if (!doMatch) {
            return res.redirect('/usuarios/login');
        }

        // ──── NUEVO: cargar permisos del usuario ────
        const permisos = await model.User.getPermisos(usuario.username);

        req.session.username   = usuario.username;
        req.session.isLoggedIn = true;
        req.session.permisos   = permisos; // array de strings
        console.log('Permisos del usuario:', permisos);

        res.redirect('/usuarios/logged');

    } catch (e) {
        console.error(e);
        res.redirect('/usuarios/login');
    }
};